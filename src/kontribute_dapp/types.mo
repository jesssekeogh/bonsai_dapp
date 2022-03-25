// all of the available types
module {

    // user profile for voting
    public type Profile = {
        hasVoted: Bool;
        whichOption: Text; 
    };

    // for creating stories
    public type Story = {
        title: Text;
        genre: Text;
        body: Text;
        user_discord: Text;
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