// all of the available types
module {

    // user profile for voting
    public type Profile = {
        hasVoted: Bool;
        whichOption: Text; 
    };

    // for returning votes
    public type StoryVotes = {
        vote1: Nat;
        vote2: Nat;
        vote3: Nat;
        total: Nat;
        userOption : Profile;
    }
}