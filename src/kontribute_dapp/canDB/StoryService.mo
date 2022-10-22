import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Types "./Types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import Option "mo:base/Option";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Int "mo:base/Int";

shared ({ caller = owner }) actor class StoryService({
    partitionKey : Text;
    scalingOptions : CanDB.ScalingOptions;
    owners : ?[Principal];
}) {

    // each user gets their own story service canister
    let canisterParition = partitionKey;

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

    public shared ({ caller }) func putStory(singleStory : Types.SingleStory, proposals : [Types.VotingProposal]) : async Text {
        assert ("user#" # Principal.toText(caller) == partitionKey);
        assert (checkStory(singleStory) == true);

        let storySortKey = "author#" # Principal.toText(caller) # "#groupedStory#" # singleStory.groupName # "#singleStory#" # singleStory.title;

        await CanDB.put(
            db,
            {
                sk = storySortKey;
                attributes = [
                    ("groupName", #text(singleStory.groupName)),
                    ("title", #text(singleStory.title)),
                    ("body", #text(singleStory.body)),
                    ("genre", #text(singleStory.genre)),
                    ("likes", #int(0)),
                    ("views", #int(0)),
                    ("author", #text(Principal.toText(caller))),
                    ("proposals", #int(singleStory.proposals)), // pass in the proposals array length/amount
                ];
            },
        );

        /* if there is proposals(checked from story input -> passed from frontend) we add them,
        otherwise proposals is an empty object in an array of length 1 */
        var proposalSK = "";

        if (singleStory.proposals > 1) {
            var proposalsAmount = 1;

            for (p in proposals.vals()) {
                proposalSK := "proposal#" # Nat.toText(proposalsAmount) # "#for#" # storySortKey;

                await CanDB.put(
                    db,
                    {
                        sk = proposalSK; // general proposal sort key so we can update specific proposals
                        attributes = [
                            ("proposalNumber", #int(proposalsAmount)), // passed into the voteOnProposal function
                            ("title", #text(p.title)),
                            ("body", #text(p.body)),
                            ("votes", #int(0)),
                            ("open", #bool(true)),
                        ];
                    },
                );

                proposalsAmount += 1;
            };
        };

        return "STORY SORT KEY: " # storySortKey # " PROPOSAL SORT KEY: " # proposalSK;
    };

    /* 
    Story API:
    */

    public shared ({ caller }) func likeStory(storySK : Text) : async Result.Result<?Types.ConsumableEntity, Text> {
        let sortKeyForLikes = "liked#" # Principal.toText(caller) # "#likedOn#" # storySK;

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

                // User has not liked: we update the story likes
                let updated = switch (
                    CanDB.update(
                        db,
                        {
                            pk = canisterParition;
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
            case (?storyEntity) { unwrapStory(storyEntity) };
        };

        switch (story) {
            case null { null };
            case (?{ groupName; title; body; genre; likes; views; author; proposals }) {
                ?({
                    groupName;
                    title;
                    body;
                    genre;
                    likes;
                    views;
                    author;
                    proposals;
                });
            };
        };
    };

    /* 
    Vote API:
    */

    public query func getProposal(proposalSK : Text) : async Result.Result<?Types.VotingProposal, Text> {
        let proposal = switch (CanDB.get(db, { sk = proposalSK })) {
            case null { null };
            case (?proposalEntity) { unwrapProposal(proposalEntity) };
        };

        switch (proposal) {
            case null { #err("Proposal not found") };
            case (?{ title; body; votes; proposalNumber; open }) {
                #ok(?({ title; body; votes; proposalNumber; open }));
            };
        };
    };

    public shared ({ caller }) func voteOnProposal(proposalNumber : Text, storySK : Text) : async Result.Result<?Types.ConsumableEntity, Text> {
        let sortKeyForVotes = "voted#" # Principal.toText(caller) # "#votedOn#" # storySK; // stored to ensure 1 user gets 1 vote per story
        let sortKeyForProposal = "proposal#" # proposalNumber # "#for#" # storySK; // general proposal sort key so we can update specific proposals

        // get a votes previous likes
        let proposal = switch (CanDB.get(db, { sk = sortKeyForProposal })) {
            case null { null };
            case (?proposalEntity) { unwrapProposal(proposalEntity) };
        };

        let proposalResult = switch (proposal) {
            case null { null };
            case (?{ votes }) {
                ?({
                    votes;
                });
            };
        };

        let newVote = Option.get(proposalResult, { votes = 0 }).votes + 1;

        let updatedVoteAttribute = [("votes", #int(newVote))];

        func updateAttributes(attributeMap : ?Entity.AttributeMap) : Entity.AttributeMap {
            switch (attributeMap) {
                case null {
                    Entity.createAttributeMapFromKVPairs(updatedVoteAttribute);
                };
                case (?map) {
                    Entity.updateAttributeMapWithKVPairs(map, updatedVoteAttribute);
                };
            };
        };

        let votedProposal = switch (CanDB.get(db, { sk = sortKeyForVotes })) {
            case null {

                // User has not voted: we update the proposal votes
                let updated = switch (
                    CanDB.update(
                        db,
                        {
                            pk = canisterParition;
                            sk = sortKeyForProposal;
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

                // user has voted now, so we store the user vote
                await CanDB.put(
                    db,
                    {
                        sk = sortKeyForVotes;
                        attributes = [("voted", #bool(true))];
                    },
                );

                return #ok(updated);
            };
            case (?userEntity) {
                return #err("user has already voted");
            };
        };
    };

    public shared ({ caller }) func closeProposals(storySK : Text) : async Text {
        assert ("user#" # Principal.toText(caller) == partitionKey);
        // get proposal amount, loop through SKs and get each proposal and update the bool to false

        // get proposal amount from story
        let story = switch (CanDB.get(db, { sk = storySK })) {
            case null { null };
            case (?storyEntity) { unwrapStory(storyEntity) };
        };

        let proposalAmount = switch (story) {
            case null { null };
            case (?{ proposals }) {
                ?({
                    proposals;
                });
            };
        };

        let unwrappedProposalAmount = Option.get(proposalAmount, { proposals = 0 }).proposals;

        let updatedOpenAttribute = [("open", #bool(false))];

        func updateAttributes(attributeMap : ?Entity.AttributeMap) : Entity.AttributeMap {
            switch (attributeMap) {
                case null {
                    Entity.createAttributeMapFromKVPairs(updatedOpenAttribute);
                };
                case (?map) {
                    Entity.updateAttributeMapWithKVPairs(map, updatedOpenAttribute);
                };
            };
        };

        var i = 1;
        label lo loop {
            if (i > unwrappedProposalAmount) {
                break lo;
            };

            let updated = switch (
                CanDB.update(
                    db,
                    {
                        pk = canisterParition;
                        sk = "proposal#" # Nat.toText(i) # "#for#" # storySK;
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

            i += 1;
        };

        return Int.toText(unwrappedProposalAmount) # " Proposals closed";
    };

    /* 
    Scan API:
    */

    public query func scanAllStories(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Types.ScanStoriesQuickReturn {
        // the structure of our frontend means we only need to return groupname and sortkey from this query
        let { entities; nextKey } = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = limit;
                ascending = ascending;
            },
        );

        let filtered = Array.mapFilter<Types.SingleStory, Types.ScanStoriesQuickElement>(
            unwrapValidStories(entities),
            func(e) {
                let { author; groupName; title ; genre } = e;
                let sortKey = "author#" # author # "#groupedStory#" # groupName # "#singleStory#" # title;

                ?{
                    sortKey;
                    groupName;
                    genre;
                };
            },
        );

        { stories = filtered; nextKey = nextKey };
    };

    /* 
    Utility API:
    */

    private func checkStory(story : Types.SingleStory) : Bool {
        if (story.title == "" or story.body == "" or story.groupName == "") {
            return false;
        };
        return true;
    };

    // unwrap a single proposal
    private func unwrapProposal(entity : Entity.Entity) : ?Types.VotingProposal {
        let { sk; attributes } = entity;

        let proposalTitleValue = Entity.getAttributeMapValueForKey(attributes, "title");
        let proposalBodyValue = Entity.getAttributeMapValueForKey(attributes, "body");
        let proposalVotesValue = Entity.getAttributeMapValueForKey(attributes, "votes");
        let proposalNumberValue = Entity.getAttributeMapValueForKey(attributes, "proposalNumber");
        let proposalOpenValue = Entity.getAttributeMapValueForKey(attributes, "open");

        switch (proposalTitleValue, proposalBodyValue, proposalVotesValue, proposalNumberValue, proposalOpenValue) {
            case (
                ?(#text(title)),
                ?(#text(body)),
                ?(#int(votes)),
                ?(#int(proposalNumber)),
                ?(#bool(open)),
            ) { ?{ title; body; votes; proposalNumber; open } };
            case _ {
                null;
            };
        };
    };

    // unwrap a single story
    private func unwrapStory(entity : Entity.Entity) : ?Types.SingleStory {
        let { sk; attributes } = entity;

        let storyGroupNameValue = Entity.getAttributeMapValueForKey(attributes, "groupName");
        let storyTitleValue = Entity.getAttributeMapValueForKey(attributes, "title");
        let storyBodyValue = Entity.getAttributeMapValueForKey(attributes, "body");
        let storyGenreValue = Entity.getAttributeMapValueForKey(attributes, "genre");
        let storyLikesValue = Entity.getAttributeMapValueForKey(attributes, "likes");
        let storyViewsValue = Entity.getAttributeMapValueForKey(attributes, "views");
        let storyAuthorValue = Entity.getAttributeMapValueForKey(attributes, "author");
        let storyProposalsValue = Entity.getAttributeMapValueForKey(attributes, "proposals");

        switch (storyGroupNameValue, storyTitleValue, storyBodyValue, storyGenreValue, storyLikesValue, storyViewsValue, storyAuthorValue, storyProposalsValue) {
            case (
                ?(#text(groupName)),
                ?(#text(title)),
                ?(#text(body)),
                ?(#text(genre)),
                ?(#int(likes)),
                ?(#int(views)),
                ?(#text(author)),
                ?(#int(proposals)),
            ) {
                ?{
                    groupName;
                    title;
                    body;
                    genre;
                    likes;
                    views;
                    author;
                    proposals;
                };
            };
            case _ {
                null;
            };
        };
    };

    // unwrap stories from array returned from the scan method
    private func unwrapValidStories(entities : [Entity.Entity]) : [Types.SingleStory] {
        Array.mapFilter<Entity.Entity, Types.SingleStory>(
            entities,
            func(e) {
                let { sk; attributes } = e;
                let storyGroupNameValue = Entity.getAttributeMapValueForKey(attributes, "groupName");
                let storyTitleValue = Entity.getAttributeMapValueForKey(attributes, "title");
                let storyBodyValue = Entity.getAttributeMapValueForKey(attributes, "body");
                let storyGenreValue = Entity.getAttributeMapValueForKey(attributes, "genre");
                let storyLikesValue = Entity.getAttributeMapValueForKey(attributes, "likes");
                let storyViewsValue = Entity.getAttributeMapValueForKey(attributes, "views");
                let storyAuthorValue = Entity.getAttributeMapValueForKey(attributes, "author");
                let storyProposalsValue = Entity.getAttributeMapValueForKey(attributes, "proposals");

                switch (storyGroupNameValue, storyTitleValue, storyBodyValue, storyGenreValue, storyLikesValue, storyViewsValue, storyAuthorValue, storyProposalsValue) {
                    case (
                        ?(#text(groupName)),
                        ?(#text(title)),
                        ?(#text(body)),
                        ?(#text(genre)),
                        ?(#int(likes)),
                        ?(#int(views)),
                        ?(#text(author)),
                        ?(#int(proposals)),
                    ) {
                        ?{
                            groupName;
                            title;
                            body;
                            genre;
                            likes;
                            views;
                            author;
                            proposals;
                        };
                    };
                    case _ {
                        null;
                    };
                };
            },
        );
    };
    // end
};
