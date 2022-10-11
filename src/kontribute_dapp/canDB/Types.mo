import Entity "mo:candb/Entity";

module {

    public type SingleStory = {
        groupName : Text; // the name of the grouped story eg. "Bonsai Warriors"
        title : Text;
        body : Text;
        likes : Int;
        views : Int;
    };

    public type ScanStoriesResult = {
        stories : [SingleStory];
        nextKey : ?Text;
    };

    public type ConsumableEntity = {
        pk : Entity.PK;
        sk : Entity.SK;
        attributes : [(Entity.AttributeKey, Entity.AttributeValue)];
    };

    public type VotingProposal = {
        storySortKey: Text;
        title : Text;
        body : Text;
        totalVotes : Int;
    };

    public type ScanProposalResult = {
        stories : [VotingProposal];
        nextKey : ?Text;
    };

};
