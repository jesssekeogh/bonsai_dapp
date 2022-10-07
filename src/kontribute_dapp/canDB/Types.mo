module {
    
    public type User = {
        prinicpal: Principal;
        name: Text;
        likedComments: [Nat]; // array of IDs to be checked
        likedStories: [Nat];
        votedProposals: [Nat];
    };

    public type GroupStory = {
        new: Bool;
        groupName: Text;
        stories: IndividualStory;
    };

    public type IndividualStory = {
        title: Text;
        body: Text;
        // totalLikes: Nat;
        // totalDislikes: Nat;
        // totalViews: Nat;
        // proposals: [Proposal];
        // comments: [Comment];
    };

    public type Proposal = {
        id: Nat;
        title: Text;
        body: Text;
        totalVotes: Nat;
    };

    public type Comment = {
        id: Nat;
        body: Text;
        totalLikes: Nat;
        totalDislikes: Nat;
    };

}