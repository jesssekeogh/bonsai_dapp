import Prim "mo:prim";
import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Nat32 "mo:base/Nat32";
import Text "mo:base/Text";

actor Story {

    var voteOffering = 5; // votes to claim
    var admin : [Text] = [ // let admin delete a story
        "hp6vg-7gvok-tqmc5-i5kro-x7xi4-og4dl-pwkcy-4vxq6-ct3es-i5grb-mqe", 
        "52ats-hshzn-sthp6-n5op4-jvruc-r73oq-tcbkr-fycb5-mnaka-oo2ad-3qe"
        ];

    public type StoryIdx = Nat32;

    public type StoryInput = {
        title : Text; // less than 50 characters
        summary : Text; // less than 110 characters
        story : Text; // long encodedURIcomponent string: less than 3000 characters
        address: Text; // nft anvil address
    };

    public type StorySave = {
        title : Blob;
        summary : Blob;
        story : Blob;
        address: Blob;
    };

    public type UniqueStory = {
        author: Principal;
        votes: Nat;
        story : StorySave;
    };

    stable var storyIdx : StoryIdx = 0;
    stable var userStories : Trie.Trie<StoryIdx, UniqueStory> = Trie.empty(); // story id and story details

    // upload a story
    public shared({caller}) func add(story : StoryInput) : async Result.Result<UniqueStory, ()> { 
        assert (checkValidStory(caller, story));

        storyIdx := storyIdx + 1;

        let newStory : UniqueStory = {
            storyId = storyIdx;
            author = caller;
            votes = 0;
            story = encodeStory(story)
            };

        userStories := Trie.replace(
            userStories,
            key(storyIdx),
            Nat32.equal,
            ?newStory,
        ).0;

        return #ok(newStory);
    };

    // get a single story
    public query func get(storyIdx : StoryIdx) : async Result.Result<UniqueStory, Text> {
        let result = Trie.find(userStories, key(storyIdx), Nat32.equal);
        
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
    // public shared query({caller}) func getMyVotes() : async Result.Result<KontributeVotes, Text> {
    //     let voteTokens = Trie.find(userVotes, key(caller), Principal.equal);

    //     switch(voteTokens){
    //         case(null){
    //             return #err("No votes found")
    //         };
    //         case(?voteTokens){
    //             return #ok(voteTokens);
    //         };
    //     };
    // };

    // TODO: get all stories to get recent ones and then most voted on (should return principal, summary and votes) iter to array?:

        // let result = Array.find<Text>(admin, func (x : Text) : Bool { // example usage of passing function into a mo:base tool
        //     Principal.fromText(x) == caller;
        // });

    // admin can delete a story
    // public shared({caller}) func delete(userId : Text): async Result.Result<StoryWithLikes, Text>{
    //     assert(adminContains(admin, caller));

    //     let user = Principal.fromText(userId);
    //     let story = Trie.find(userStories, key(user), Principal.equal);
    //     switch(story){
    //         case(null){return #err("Story not found")};
    //         case(?story){
    //             userStories := Trie.replace(
    //                 userStories,
    //                 key(user),
    //                 Principal.equal,
    //                 null,
    //             ).0;
    //             return #ok(story)
    //         };
    //     };
    // };

    // utility functions:
    private func encodeStory(story : StoryInput) : StorySave {
        return {
            title = Text.encodeUtf8(story.title);
            summary = Text.encodeUtf8(story.summary);
            story = Text.encodeUtf8(story.story);
            address = Text.encodeUtf8(story.address);
        }
    };

    private func checkValidStory(caller: Principal, story: StoryInput) : Bool {
        assert (Principal.isAnonymous(caller) == false);
        assert (story.summary.size() <= 110 and story.summary.size() >= 10);
        assert (story.story.size() <= 3000 and story.story.size() >= 10); // change to large amount in Prod
        assert (story.address.size() == 64);
        return true;
    };

    private func adminContains(admin : [Text], caller : Principal): Bool {
        var result : Bool = false;

        for (x in admin.vals()){
            if(Principal.fromText(x) == caller){
                result := true
            }
        };
        return result;
    };

    private func key(x : StoryIdx) : Trie.Key<StoryIdx> {
        return { hash = x; key = x }
    };

    public query func getMemorySize(): async Nat {
        Prim.rts_memory_size();
    };

    // public type StorySummary = {
    //     title: Text;
    //     summary : Text;
    //     likes: Nat;
    // };

    // public type KontributeVotes = {
    //     claimed: Bool;
    //     votes : Nat;
    // };

    // public shared({caller}) func claim() : async Result.Result<KontributeVotes, Text> {
    //     let voteTokens = Trie.find(userVotes, key(caller), Principal.equal);

    //     switch(voteTokens){
    //         case(null){
    //             let newVotes = {
    //                 claimed = true;
    //                 votes = voteOffering;
    //             };
    //             userVotes := Trie.replace(
    //                     userVotes,
    //                     key(caller),
    //                     Principal.equal,
    //                     ?newVotes,
    //                 ).0;
    //             return #ok(newVotes);
    //         };
    //         case(?voteTokens){
    //             return #err("Votes already claimed");
    //         }
    //     };
    // };

    // public shared({caller}) func like(userId : Text) : async Result.Result<Text, Text> {
    //     let user = Principal.fromText(userId);
    //     let story = Trie.find(userStories, key(user), Principal.equal);

    //     let callerVotes = Trie.find(userVotes, key(caller), Principal.equal);

    //     switch (callerVotes){
    //         case(null){return #err("No votes have been claimed")};
    //         case(?callerVotes){ // this means votes have been claimed
    //             switch(story){
    //                 case(null){return #err("Story not found")};
    //                 case(?story){
    //                     if(callerVotes.votes >= 1){
    //                         let incrementStory : StoryWithLikes = {
    //                             story = story.story;
    //                             likes = story.likes + 1;
    //                             };
    //                         userStories := Trie.replace(
    //                             userStories,
    //                             key(user),
    //                             Principal.equal,
    //                             ?incrementStory,
    //                         ).0;
    //                         let newVotes: KontributeVotes = {
    //                             claimed = true;
    //                             votes = callerVotes.votes - 1;
    //                             };
    //                         userVotes := Trie.replace(
    //                             userVotes,
    //                             key(caller),
    //                             Principal.equal,
    //                             ?newVotes,
    //                             ).0;
    //                         return #ok("Vote success!")
    //                     } else {return #err("No votes left")};
    //                 };
    //             };
    //         };
    //     };
    // };
}