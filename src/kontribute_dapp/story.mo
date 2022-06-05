import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Array "mo:base/Array";

actor Story {

    var anon : Text = "2vxsx-fae";
    var voteOffering = 5; // votes to claim
    var admin : [Text] = [ // let admin delete a story
        "hp6vg-7gvok-tqmc5-i5kro-x7xi4-og4dl-pwkcy-4vxq6-ct3es-i5grb-mqe", 
        "52ats-hshzn-sthp6-n5op4-jvruc-r73oq-tcbkr-fycb5-mnaka-oo2ad-3qe"
        ];

    public type Story = {
        title : Text; // less than 50 characters
        summary : Text; // less than 110 characters
        story : Text; // long encodedURIcomponent string: less than 3000 characters
        address: Text; // nft anvil address
    };

    public type StoryWithLikes = {
        story : Story;
        likes: Nat;
    };

    public type StorySummary = {
        title: Text;
        summary : Text;
        likes: Nat;
    };

    public type KontributeVotes = {
        claimed: Bool;
        votes : Nat;
    };

    stable var userVotes : Trie.Trie<Principal, KontributeVotes> = Trie.empty(); // every user gets 5 votes at the start
    stable var userStories : Trie.Trie<Principal, StoryWithLikes> = Trie.empty();

    // claim Kontribute votes
    public shared({caller}) func claim() : async Result.Result<KontributeVotes, Text> {
        let voteTokens = Trie.find(userVotes, key(caller), Principal.equal);

        switch(voteTokens){
            case(null){
                let newVotes = {
                    claimed = true;
                    votes = voteOffering;
                };
                userVotes := Trie.replace(
                        userVotes,
                        key(caller),
                        Principal.equal,
                        ?newVotes,
                    ).0;
                return #ok(newVotes);
            };
            case(?voteTokens){
                return #err("Votes already claimed");
            }
        };
    };

    // upload a story
    public shared({caller}) func add(story : Story) : async Result.Result<StoryWithLikes, ()> { 
        assert (checkValidStory(caller, story));

        let newStory : StoryWithLikes = {
            story = {
                    title = story.title;
                    summary = story.summary;
                    story = story.story;
                    address = story.address;
                };
                likes = 0;
            };

        userStories := Trie.replace(
            userStories,
            key(caller),
            Principal.equal,
            ?newStory,
        ).0;

        return #ok(newStory);
    };

    // vote on a story
    public shared({caller}) func like(userId : Text) : async Result.Result<Text, Text> {
        let user = Principal.fromText(userId);
        let story = Trie.find(userStories, key(user), Principal.equal);

        let callerVotes = Trie.find(userVotes, key(caller), Principal.equal);

        switch (callerVotes){
            case(null){return #err("No votes have been claimed")};
            case(?callerVotes){ // this means votes have been claimed
                switch(story){
                    case(null){return #err("Story not found")};
                    case(?story){
                        if(callerVotes.votes >= 1){
                            let incrementStory : StoryWithLikes = {
                                story = story.story;
                                likes = story.likes + 1;
                                };
                            userStories := Trie.replace(
                                userStories,
                                key(user),
                                Principal.equal,
                                ?incrementStory,
                            ).0;
                            let newVotes: KontributeVotes = {
                                claimed = true;
                                votes = callerVotes.votes - 1;
                                };
                            userVotes := Trie.replace(
                                userVotes,
                                key(caller),
                                Principal.equal,
                                ?newVotes,
                                ).0;
                            return #ok("Vote success!")
                        } else {return #err("No votes left")};
                    };
                };
            };
        };
    };

    // get a single story
    public query func get(userId : Text) : async Result.Result<StoryWithLikes, Text> {
        let user = Principal.fromText(userId);
        let result = Trie.find(userStories, key(user), Principal.equal);
        
        switch (result){
            case(null) {
                return #err("Story not found")
            };
            case (?result){
                return #ok(result);
            };
        };
    };

    // get amount of votes
    public shared query({caller}) func getMyVotes() : async Result.Result<KontributeVotes, Text> {
        let voteTokens = Trie.find(userVotes, key(caller), Principal.equal);

        switch(voteTokens){
            case(null){
                return #err("No votes found")
            };
            case(?voteTokens){
                return #ok(voteTokens);
            };
        };
    };

    // TODO: get all stories to get recent ones and then most voted on (should return principal, summary and votes):

    // admin can delete a story
    public shared({caller}) func delete(userId : Text): async Result.Result<StoryWithLikes, Text>{
        let result = Array.find<Text>(admin, func (x : Text) : Bool { // example usage of passing function into a mo:base tool
            Principal.fromText(x) == caller;
        });

        switch(result){
            case(null){return #err("Caller is not an admin")};
            case(?result){
                let user = Principal.fromText(userId);
                let story = Trie.find(userStories, key(user), Principal.equal);
                switch(story){
                    case(null){return #err("Story not found")};
                    case(?story){
                        userStories := Trie.replace(
                            userStories,
                            key(user),
                            Principal.equal,
                            null,
                        ).0;
                        return #ok(story)
                    };
                };
            };
        };
    };

    // utility functions:
    private func checkValidStory(caller: Principal, story: Story) : Bool {
        assert (Principal.toText(caller) != anon);
        assert (Text.size(story.summary) <= 110);
        assert (Text.size(story.story) <= 3000); // add a minimum
        assert (Text.size(story.address) == 64);
        return true;
    };

    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };

}