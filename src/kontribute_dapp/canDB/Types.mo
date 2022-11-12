import Entity "mo:candb/Entity";

module {

    public type SingleStory = {
        groupName : Text; // the name of the grouped story eg. "Bonsai Warriors"
        title : Text;
        body : Text;
        genre : Text;
        likes : Int;
        views : Int;
        author : Text;
        address : Text;
        time : Int;
        proposals : Int; // so we can determine how many proposals attached to the story
        responses : Int;
        monetized : Bool;
        monetizedAddress : Text;
    };

    public type AuthorDetails = {
        nftProfilePic : Text;
        pseudonym : Text;
        bio : Text;
    };

    public type ConsumableEntity = {
        pk : Entity.PK;
        sk : Entity.SK;
        attributes : [(Entity.AttributeKey, Entity.AttributeValue)];
    };

    public type VotingProposal = {
        proposalNumber : Int; // starts at 1
        title : Text;
        body : Text;
        votes : Int;
        open : Bool;
    };

    public type UserVotedProposal = {
        voted : Bool;
        proposal : Text;
    };

    public type ScanStoriesResult = {
        stories : [SingleStory];
        nextKey : ?Text;
    };

    public type ScanProposalResult = {
        proposals : [VotingProposal];
        nextKey : ?Text;
    };

    public type ScanStoriesQuickElement = {
        sortKey : Text;
        groupName : Text;
        genre : Text;
    };

    public type ScanStoriesQuickReturn = {
        stories : [ScanStoriesQuickElement];
        nextKey : ?Text;
    };

};
