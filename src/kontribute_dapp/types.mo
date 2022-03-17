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
    }

}