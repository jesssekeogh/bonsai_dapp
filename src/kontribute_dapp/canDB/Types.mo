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

    public type ConsumableEntity = {
        pk : Entity.PK;
        sk : Entity.SK;
        attributes : [(Entity.AttributeKey, Entity.AttributeValue)];
    };

    public type VotingProposal = {
        proposalNumber: Int; // starts at 1
        title : Text;
        body : Text;
        votes : Int;
        open : Bool;
    };

    public type ScanStoriesResult = {
        stories : [SingleStory];
        nextKey : ?Text;
    };
    
    public type ScanStoriesQuickElement = {
        sortKey: Text;
        groupName: Text;
    };

    public type ScanStoriesQuickReturn = {
        stories: [ScanStoriesQuickElement];
        nextKey: ?Text
    };

};
