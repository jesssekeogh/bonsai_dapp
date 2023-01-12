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
import Time "mo:base/Time";
import List "mo:base/List";

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
        assert ("author_" # Principal.toText(caller) == partitionKey);
        assert (checkStory(singleStory) == true);

        let storySortKey = returnStorySortKey(Principal.toText(caller), singleStory.groupName, singleStory.title);

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
                    ("address", #text(singleStory.address)),
                    ("time", #int(Time.now())),
                    ("proposals", #int(singleStory.proposals)), // pass in the proposals array length/amount
                    ("responses", #int(singleStory.responses)),
                    ("monetized", #bool(singleStory.monetized)),
                    ("monetizedAddress", #text(singleStory.monetizedAddress)),
                ];
            },
        );

        /* if there is proposals(checked from story input -> passed from frontend) we add them,
        otherwise proposals is an empty object in an array of length 1 */

        if (singleStory.proposals > 1) {
            var proposalsAmount = 1;

            for (p in proposals.vals()) {
                await CanDB.put(
                    db,
                    {
                        sk = returnProposalSortKey(Nat.toText(proposalsAmount), storySortKey); // general proposal sort key so we can update specific proposals
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

        return "STORY SORT KEY: " # storySortKey;
    };

    /*
    Author details:
    */

    public shared ({ caller }) func putAuthorDetails(authorDetails : Types.AuthorDetails) : async Text {
        assert ("author_" # Principal.toText(caller) == partitionKey);
        assert (checkAuthorDetails(authorDetails) == true);

        await CanDB.put(
            db,
            {
                sk = returnAuthorDetailsSortKey(Principal.toText(caller));
                attributes = [
                    ("nftProfilePic", #text(authorDetails.nftProfilePic)), // passed into the voteOnProposal function
                    ("pseudonym", #text(authorDetails.pseudonym)),
                    ("bio", #text(authorDetails.bio)),
                ];
            },
        );

        return returnAuthorDetailsSortKey(Principal.toText(caller));
    };

    public query func getAuthorDetails(authorSK : Text) : async Result.Result<?Types.AuthorDetails, Text> {
        let details = switch (CanDB.get(db, { sk = authorSK })) {
            case null { return #err("No details found") };
            case (?authorEntity) { unwrapAuthorDetails(authorEntity) };
        };

        switch (details) {
            case null { #err("No details found") };
            case (?{ nftProfilePic; pseudonym; bio }) {
                #ok(?({ nftProfilePic; pseudonym; bio }));
            };
        };
    };

    /* 
    Story API:
    */

    public shared ({ caller }) func likeStory(storySK : Text) : async Result.Result<?Types.ConsumableEntity, Text> {
        let sortKeyForLikes = returnLikedSortKey(Principal.toText(caller), storySK);

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

    public shared query ({ caller }) func checkIfLiked(storySK : Text) : async Bool {
        if (Principal.isAnonymous(caller)) {
            return false;
        };

        let sortKeyForLikes = returnLikedSortKey(Principal.toText(caller), storySK);

        // check if user has liked by searching the sk
        let likedStory = switch (CanDB.get(db, { sk = sortKeyForLikes })) {
            case null {
                return false;
            };
            case (?likedEntity) {
                return true;
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
            case (?{ groupName; title; body; genre; likes; views; author; address; time; proposals; responses; monetized; monetizedAddress }) {
                ?({
                    groupName;
                    title;
                    body;
                    genre;
                    likes;
                    views;
                    author;
                    address;
                    time;
                    proposals;
                    responses;
                    monetized;
                    monetizedAddress;
                });
            };
        };
    };

    public func incrementView(storySK : Text) : async ?Types.ConsumableEntity {
        // get a stories previous views total
        let story = switch (CanDB.get(db, { sk = storySK })) {
            case null { null };
            case (?storyEntity) { unwrapStory(storyEntity) };
        };

        let viewsResult = switch (story) {
            case null { null };
            case (?{ views }) {
                ?({
                    views;
                });
            };
        };

        let newViews = Option.get(viewsResult, { views = 0 }).views + 1;

        let updatedViewAttribute = [("views", #int(newViews))];

        func updateAttributes(attributeMap : ?Entity.AttributeMap) : Entity.AttributeMap {
            switch (attributeMap) {
                case null {
                    Entity.createAttributeMapFromKVPairs(updatedViewAttribute);
                };
                case (?map) {
                    Entity.updateAttributeMapWithKVPairs(map, updatedViewAttribute);
                };
            };
        };

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
    };

    /* 
    Vote API:
    */

    // @deprecated:
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

    // return all proposals from a story in a single query
    public query func getProposals(storySK : Text) : async Result.Result<[?Types.VotingProposal], Text> {
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
        var newList = List.nil<?Types.VotingProposal>();
        var i = 1;

        label lo loop {
            if (i > unwrappedProposalAmount) {
                break lo;
            };

            let proposal = switch (CanDB.get(db, { sk = returnProposalSortKey(Nat.toText(i), storySK) })) {
                case null { return #err("proposal not found") };
                case (?proposalEntity) {
                    newList := List.push(unwrapProposal(proposalEntity), newList);
                };
            };

            i += 1;
        };

        return #ok(List.toArray(List.reverse(newList)));
    };

    public shared query ({ caller }) func checkIfVoted(storySK : Text) : async Bool {
        if (Principal.isAnonymous(caller)) {
            return false;
        };

        let sortKeyForVotes = returnVotedSortKey(Principal.toText(caller), storySK);

        let votedProposal = switch (CanDB.get(db, { sk = sortKeyForVotes })) {
            case null {
                return false;
            };
            case (?votedProposalEntity) {
                return true;
            };
        };

    };

    public shared ({ caller }) func voteOnProposal(proposalNumber : Text, storySK : Text) : async Result.Result<?Types.ConsumableEntity, Text> {
        assert (Principal.isAnonymous(caller) == false);
        let sortKeyForVotes = returnVotedSortKey(Principal.toText(caller), storySK); // stored to ensure 1 user gets 1 vote per story
        let sortKeyForProposal = returnProposalSortKey(proposalNumber, storySK); // general proposal sort key so we can update specific proposals

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
                        attributes = [
                            ("voted", #bool(true)),
                            ("proposal", #text(proposalNumber)),
                        ];
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
        assert ("author_" # Principal.toText(caller) == partitionKey);
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
                        sk = returnProposalSortKey(Nat.toText(i), storySK);
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

    // delete story function:
    public shared ({ caller }) func deleteStory(storySK : Text) : async ?Types.ConsumableEntity {
        assert ("author_" # Principal.toText(caller) == partitionKey);

        // find if there is poll
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

        if (unwrappedProposalAmount > 0) {
            var i = 1;
            label lo loop {
                if (i > unwrappedProposalAmount) {
                    break lo;
                };

                var del = switch (CanDB.remove(db, { sk = returnProposalSortKey(Nat.toText(i), storySK) })) {
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
        };

        let res = switch (CanDB.remove(db, { sk = storySK })) {
            case null { null };
            case (?entity) {
                ?{
                    pk = entity.pk;
                    sk = entity.sk;
                    attributes = Entity.extractKVPairsFromAttributeMap(entity.attributes);
                };
            };
        };

        return res;
    };

    /* 
    Scan API:
    */

    // return just a small amount of story data
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
                let { author; groupName; title; genre } = e;
                let sortKey = returnStorySortKey(author, groupName, title);

                ?{
                    sortKey;
                    groupName;
                    genre;
                };
            },
        );

        { stories = filtered; nextKey = nextKey };
    };

    // return all full stories
    public query func scanAllFullStories(skLowerBound : Text, skUpperBound : Text, limit : Nat, ascending : ?Bool) : async Types.ScanStoriesResult {
        let { entities; nextKey } = CanDB.scan(
            db,
            {
                skLowerBound = skLowerBound;
                skUpperBound = skUpperBound;
                limit = limit;
                ascending = ascending;
            },
        );

        { stories = unwrapValidStories(entities); nextKey = nextKey };
    };

    /* 
    Utility API:
    */

    private func returnStorySortKey(author : Text, groupName : Text, title : Text) : Text {
        return "author_" # author # "_story_" # groupName # "_chapter_" # title;
    };

    private func returnProposalSortKey(proposalNumber : Text, storySK : Text) : Text {
        return "proposal_" # proposalNumber # "_for_" # storySK;
    };

    private func returnVotedSortKey(user : Text, storySK : Text) : Text {
        return "voted_" # user # "_votedOn_" # storySK;
    };

    private func returnLikedSortKey(user : Text, storySK : Text) : Text {
        return "liked_" # user # "_likedOn_" # storySK;
    };

    private func returnAuthorDetailsSortKey(user : Text) : Text {
        return "AuthorDetailsFor_" # user;
    };

    private func checkStory(story : Types.SingleStory) : Bool {
        if (story.title == "" or story.body == "" or story.groupName == "") {
            return false;
        };
        return true;
    };

    private func checkAuthorDetails(authorDetails : Types.AuthorDetails) : Bool {
        if (authorDetails.pseudonym.size() > 15 or authorDetails.bio.size() > 160) {
            return false;
        };
        return true;
    };

    // unwrap a single author details
    private func unwrapAuthorDetails(entity : Entity.Entity) : ?Types.AuthorDetails {
        let { sk; attributes } = entity;

        let authorNftProfilePicValue = Entity.getAttributeMapValueForKey(attributes, "nftProfilePic");
        let authorPseudonymValue = Entity.getAttributeMapValueForKey(attributes, "pseudonym");
        let authorBioValue = Entity.getAttributeMapValueForKey(attributes, "bio");

        switch (authorNftProfilePicValue, authorPseudonymValue, authorBioValue) {
            case (
                ?(#text(nftProfilePic)),
                ?(#text(pseudonym)),
                ?(#text(bio)),
            ) { ?{ nftProfilePic; pseudonym; bio } };
            case _ {
                null;
            };
        };
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
        let storyAddressValue = Entity.getAttributeMapValueForKey(attributes, "address");
        let storyTimeValue = Entity.getAttributeMapValueForKey(attributes, "time");
        let storyProposalsValue = Entity.getAttributeMapValueForKey(attributes, "proposals");
        let storyResponsesValue = Entity.getAttributeMapValueForKey(attributes, "responses");
        let storyMonetizedValue = Entity.getAttributeMapValueForKey(attributes, "monetized");
        let storyMonetizedAddressValue = Entity.getAttributeMapValueForKey(attributes, "monetizedAddress");

        switch (storyGroupNameValue, storyTitleValue, storyBodyValue, storyGenreValue, storyLikesValue, storyViewsValue, storyAuthorValue, storyAddressValue, storyTimeValue, storyProposalsValue, storyResponsesValue, storyMonetizedValue, storyMonetizedAddressValue) {
            case (
                ?(#text(groupName)),
                ?(#text(title)),
                ?(#text(body)),
                ?(#text(genre)),
                ?(#int(likes)),
                ?(#int(views)),
                ?(#text(author)),
                ?(#text(address)),
                ?(#int(time)),
                ?(#int(proposals)),
                ?(#int(responses)),
                ?(#bool(monetized)),
                ?(#text(monetizedAddress)),
            ) {
                ?{
                    groupName;
                    title;
                    body;
                    genre;
                    likes;
                    views;
                    author;
                    address;
                    time;
                    proposals;
                    responses;
                    monetized;
                    monetizedAddress;
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
                let storyAddressValue = Entity.getAttributeMapValueForKey(attributes, "address");
                let storyTimeValue = Entity.getAttributeMapValueForKey(attributes, "time");
                let storyProposalsValue = Entity.getAttributeMapValueForKey(attributes, "proposals");
                let storyResponsesValue = Entity.getAttributeMapValueForKey(attributes, "responses");
                let storyMonetizedValue = Entity.getAttributeMapValueForKey(attributes, "monetized");
                let storyMonetizedAddressValue = Entity.getAttributeMapValueForKey(attributes, "monetizedAddress");

                switch (storyGroupNameValue, storyTitleValue, storyBodyValue, storyGenreValue, storyLikesValue, storyViewsValue, storyAuthorValue, storyAddressValue, storyTimeValue, storyProposalsValue, storyResponsesValue, storyMonetizedValue, storyMonetizedAddressValue) {
                    case (
                        ?(#text(groupName)),
                        ?(#text(title)),
                        ?(#text(body)),
                        ?(#text(genre)),
                        ?(#int(likes)),
                        ?(#int(views)),
                        ?(#text(author)),
                        ?(#text(address)),
                        ?(#int(time)),
                        ?(#int(proposals)),
                        ?(#int(responses)),
                        ?(#bool(monetized)),
                        ?(#text(monetizedAddress)),
                    ) {
                        ?{
                            groupName;
                            title;
                            body;
                            genre;
                            likes;
                            views;
                            author;
                            address;
                            time;
                            proposals;
                            responses;
                            monetized;
                            monetizedAddress;
                        };
                    };
                    case _ {
                        null;
                    };
                };
            },
        );
    };

    // Used to pass new scaling options to the db through an upgrade from the IndexCanister if desired
    system func postupgrade() {
        db.scalingOptions := scalingOptions;
    };

    // end
};
