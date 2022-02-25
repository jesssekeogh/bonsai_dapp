module {

    // user profile for voting
    public type Profile = {
        hasVoted: Bool;
        whichOption: Text; 
    };

    // for creating stories
    public type Story = {
        title: Text;
        chapter: Text;
        body: Text;
    }

}