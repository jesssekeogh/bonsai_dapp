import Entity "mo:candb/Entity";

module {

    public type SingleStory = {
        groupName : Text; // the name of the grouped story eg. "Bonsai Warriors"
        title : Text;
        body : Text;
        likes : Int;
        views : Int;
        author: Text;
        proposals: Int; // so we can determine how many proposals attached to the story 
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
        title : Text;
        body : Text;
        votes : Int;
    };

    public type ScanProposalResult = {
        proposals : [VotingProposal];
        nextKey : ?Text;
    };

};
