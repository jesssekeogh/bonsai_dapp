import Entity "mo:candb/Entity";

module {

    public type SingleStory = {
        groupName : Text; // the name of the grouped story if applicable: helps use sort things correctly
        title : Text;
        body : Text;
        likes : Int;
        views : Int;
        // totalLikes: Nat;
        // totalDislikes: Nat;
        // totalViews: Nat;
        // proposals: [Proposal]; // diff service
        // comments: [Comment]; // diff service
    };

    public type ConsumableEntity = {
        pk : Entity.PK;
        sk : Entity.SK;
        attributes : [(Entity.AttributeKey, Entity.AttributeValue)];
    };

    public type Proposal = {
        id : Nat;
        title : Text;
        body : Text;
        totalVotes : Nat;
    };

    public type Comment = {
        id : Nat;
        body : Text;
        totalLikes : Nat;
        totalDislikes : Nat;
    };

};
