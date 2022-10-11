import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Types "./Types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Array "mo:base/Array";

shared ({ caller = owner }) actor class StoryService({
    partitionKey : Text;
    scalingOptions : CanDB.ScalingOptions;
    owners : ?[Principal];
}) {

    stable let db = CanDB.init({
        pk = partitionKey;
        scalingOptions = scalingOptions;
    });

    public shared ({ caller }) func whoami() : async Principal {
        return caller;
    };

    public query func getPK() : async Text { db.pk };

    public query func skExists(sk : Text) : async Bool {
        CanDB.skExists(db, sk);
    };

    public shared ({ caller = caller }) func transferCycles() : async () {
        if (caller == owner) {
            return await CA.transferCycles(caller);
        };
    };

    public shared ({ caller }) func putStory(singleStory : Types.SingleStory) : async Text {
        assert (checkStory(singleStory) == true);

        let sortKey = "author#" # Principal.toText(caller) # "#groupedStory#" # singleStory.groupName # "#singleStory#" # singleStory.title;

        await CanDB.put(
            db,
            {
                sk = sortKey;
                attributes = [
                    ("groupName", #text(singleStory.groupName)),
                    ("title", #text(singleStory.title)),
                    ("body", #text(singleStory.body)),
                    ("likes", #int(0)),
                    ("views", #int(0)),
                ];
            },
        );

        return sortKey;
    };

    public shared ({ caller }) func likeStory(storySK : Text) : async Result.Result<?Types.ConsumableEntity, Text> {
        // candb get sk = caller # storyID, attribute, liked: true or false
        let sortKeyForLikes = "user#" # Principal.toText(caller) # storySK;

        // get a stories previous likes total
        let story = switch (CanDB.get(db, { sk = storySK })) {
            case null { null };
            case (?storyEntity) { unwrapStory(storyEntity) };
        };

        let likesResult = switch (story) {
            case null { null };
            case (?{ likes }) {
                ?({
                    likes;
                });
            };
        };

        let newLikes = Option.get(likesResult, { likes = 0 }).likes + 1;

        let updatedLikeAttribute = [("likes", #int(newLikes))];

        func updateAttributes(attributeMap : ?Entity.AttributeMap) : Entity.AttributeMap {
            switch (attributeMap) {
                case null {
                    Entity.createAttributeMapFromKVPairs(updatedLikeAttribute);
                };
                case (?map) {
                    Entity.updateAttributeMapWithKVPairs(map, updatedLikeAttribute);
                };
            };
        };

        // check if user has liked by searching the sk
        let likedStory = switch (CanDB.get(db, { sk = sortKeyForLikes })) {
            case null {

                // we update the story likes
                let updated = switch (
                    CanDB.update(
                        db,
                        {
                            pk = "StoryService";
                            sk = storySK;
                            updateAttributeMapFunction = updateAttributes;
                        },
                    ),
                ) {
                    case null { null };
                    case (?entity) {
                        ?{
                            pk = entity.pk;
                            sk = entity.sk;
                            attributes = Entity.extractKVPairsFromAttributeMap(entity.attributes);
                        };
                    };
                };

                // user has liked we store user like
                await CanDB.put(
                    db,
                    {
                        sk = sortKeyForLikes;
                        attributes = [("liked", #bool(true))];
                    },
                );

                return #ok(updated);
            };
            case (?userEntity) {
                return #err("User already liked");
            };
        };

    };

    public query func getStory(storySK : Text) : async ?Types.SingleStory {
        let story = switch (CanDB.get(db, { sk = storySK })) {
            case null { null };
            case (?userEntity) { unwrapStory(userEntity) };
        };

        switch (story) {
            case null { null };
            case (?{ groupName; title; body; likes; views }) {
                ?({
                    groupName;
                    title;
                    body;
                    likes;
                    views;
                });
            };
        };
    };

    public query func scanAllStories(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Types.ScanStoriesResult {

        let { entities; nextKey } = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = limit;
                ascending = ascending;
            },
        );

        {
            stories = unwrapValidStories(entities);
            nextKey = nextKey;
        }

    };

    private func checkStory(story : Types.SingleStory) : Bool {
        if (story.title == "" or story.body == "") {
            return false;
        };
        return true;
    };

    private func unwrapStory(entity : Entity.Entity) : ?Types.SingleStory {
        let { sk; attributes } = entity;

        let storyGroupNameValue = Entity.getAttributeMapValueForKey(attributes, "groupName");
        let storyTitleValue = Entity.getAttributeMapValueForKey(attributes, "title");
        let storyBodyValue = Entity.getAttributeMapValueForKey(attributes, "body");
        let storyLikesValue = Entity.getAttributeMapValueForKey(attributes, "likes");
        let storyViewsValue = Entity.getAttributeMapValueForKey(attributes, "views");

        switch (storyGroupNameValue, storyTitleValue, storyBodyValue, storyLikesValue, storyViewsValue) {
            case (
                ?(#text(groupName)),
                ?(#text(title)),
                ?(#text(body)),
                ?(#int(likes)),
                ?(#int(views)),
            ) { ?{ groupName; title; body; likes; views } };
            case _ {
                null;
            };
        };
    };

    private func unwrapValidStories(entities : [Entity.Entity]) : [Types.SingleStory] {
        Array.mapFilter<Entity.Entity, Types.SingleStory>(
            entities,
            func(e) {
                let { sk; attributes } = e;
                let storyGroupNameValue = Entity.getAttributeMapValueForKey(attributes, "groupName");
                let storyTitleValue = Entity.getAttributeMapValueForKey(attributes, "title");
                let storyBodyValue = Entity.getAttributeMapValueForKey(attributes, "body");
                let storyLikesValue = Entity.getAttributeMapValueForKey(attributes, "likes");
                let storyViewsValue = Entity.getAttributeMapValueForKey(attributes, "views");
                switch (storyGroupNameValue, storyTitleValue, storyBodyValue, storyLikesValue, storyViewsValue) {
                    case (
                        ?(#text(groupName)),
                        ?(#text(title)),
                        ?(#text(body)),
                        ?(#int(likes)),
                        ?(#int(views)),
                    ) { ?{ groupName; title; body; likes; views } };
                    case _ {
                        null;
                    };
                };
            },
        );
    };

};
