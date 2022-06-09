import Array "mo:base/Array";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Prim "mo:prim";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Trie "mo:base/Trie";

actor Story {

    var voteOffering = 5; // votes to claim
    var admin : [Text] = [ // let admin delete a story
        "hp6vg-7gvok-tqmc5-i5kro-x7xi4-og4dl-pwkcy-4vxq6-ct3es-i5grb-mqe", 
        "52ats-hshzn-sthp6-n5op4-jvruc-r73oq-tcbkr-fycb5-mnaka-oo2ad-3qe"
        ];

    public type StoryText = {
        title : Text; // less than 50 characters
        summary : Text; // less than 110 characters
        story : Text; // long encodedURIcomponent string: less than 3000 characters
        address: ?Text; // nft anvil address
    };

    public type StoryBlob = {
        title : Blob;
        summary : Blob;
        story : Blob;
        address: Blob;
    };

    public type StoryRecord = {
        storyId: Nat;
        author: Principal;
        totalVotes: Nat;
        story: StoryBlob;
    };

    private var _stories : [var ?StoryRecord] = Array.init<?StoryRecord>(3, null);
    private var _users : Trie.Trie<Principal, List.List<Nat>> = Trie.empty();

    // upload a story
    public shared({caller}) func add(story : StoryText) : async Result.Result<Text, Text> { 
        assert (checkValidStory(caller, story));

        var i = 0;

        for (x in _stories.vals()){
            if(x == null){
                let newStory : StoryRecord = {
                    storyId = i;
                    author = caller;
                    totalVotes = 0;
                    story = encodeStory(story) // make a decode function
                };
                _stories[i] := ?newStory;
                addId(caller, i);
                return #ok("Story added at position: " # Nat.toText(i));
            };
            i += 1;
        };

        return #err("No space left");
    };

    // get a single story
    public query func get(storyId: Nat) : async Result.Result<StoryRecord, Text> {
        let result = _stories[storyId];

        switch(result){
            case(null){return #err("Story not found")};
            case(?result){
                return #ok(result)
            }
        }
    };

    // get all stories belonging to a particular user
    public shared query({caller}) func getUserStories(): async Result.Result<[Nat], Text>{
        assert (Principal.isAnonymous(caller) == false);

        let result = Trie.find(_users, { key = caller; hash = Principal.hash(caller) }, Principal.equal);

        switch(result){
            case(null){return #err("No stories found for this user")};
            case(?result){
                return #ok(List.toArray(result))
            }
        }
    };

    // delete a single story
    public shared({caller}) func delete(storyId: Nat) : async Result.Result<StoryRecord, Text> {
        assert (Principal.isAnonymous(caller) == false);
        assert(userOwns(caller, storyId));

        let result = _stories[storyId];

        switch(result){
            case(null){return #err("Story not found")};
            case(?result){
                _stories[storyId] := null;
                return #ok(result)
            }
        }
    };

    // TODO: get all stories to get recent ones and then most voted on (should return principal, summary and votes) iter to array?:


    // admin can delete any story will need to be able to delete from user list too
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

    private func addId(caller: Principal, storyId: Nat) : () {
        let result = Trie.find(_users, { key = caller; hash = Principal.hash(caller) }, Principal.equal);

        switch (result) {
            case(null){ // new user
                var newList = List.nil<Nat>();
                newList := List.push(storyId, newList);

                _users := Trie.replace(
                    _users,
                    { key = caller; hash = Principal.hash(caller) },
                    Principal.equal,
                    ?newList,
                ).0;
            };
            case(?result){
                var newList = List.nil<Nat>();
                newList := List.push(storyId, result);
                
                _users := Trie.replace(
                    _users,
                    { key = caller; hash = Principal.hash(caller) },
                    Principal.equal,
                    ?newList,
                ).0;
            }
        };

    };

    // add a remove Id function

    private func userOwns(caller: Principal, storyId: Nat) : Bool {
        let result = Trie.find(_users, { key = caller; hash = Principal.hash(caller) }, Principal.equal);

        // let result = Array.find<Text>(admin, func (x : Text) : Bool { // example usage of passing function into a mo:base tool
        //     Principal.fromText(x) == caller;
        // });

        // switch(result){
        //     case(null){return false};
        //     case(?result){
        //     }
        return true
    };

    private func encodeStory(story : StoryText) : StoryBlob {
        return {
            title = Text.encodeUtf8(story.title);
            summary = Text.encodeUtf8(story.summary);
            story = Text.encodeUtf8(story.story);
            address = Text.encodeUtf8(unwrapAddress(story.address));
        }
    };

    private func checkValidStory(caller: Principal, story: StoryText) : Bool {        
        assert (Principal.isAnonymous(caller) == false);
        assert (story.summary.size() <= 110 and story.summary.size() >= 10);
        assert (story.story.size() <= 3000 and story.story.size() >= 10); // change to large amount in Prod
        if(unwrapAddress(story.address).size() > 1){
            assert (unwrapAddress(story.address).size() == 64);
        };
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

    private func unwrapAddress(address : ?Text) : Text {
        var addressUnwrapped = "";
        
        switch(address){
            case(null){addressUnwrapped := ""};
            case(?address){
                addressUnwrapped := address
            };
        };

        return addressUnwrapped;
    };

    public query func getMemorySize(): async Nat {
        Prim.rts_memory_size();
    };

    public query func getDebug() : async Any {
        Debug.print(debug_show(_stories));
    };

}