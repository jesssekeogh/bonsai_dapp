import Array "mo:base/Array";
import Debug "mo:base/Debug";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Prim "mo:prim";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Text "mo:base/Text";
import Trie "mo:base/Trie";
import Option "mo:base/Option";

actor Story {

    var voteOffering = 5; // votes to claim
    var admin : [Text] = [ // let admin delete a story
        "hp6vg-7gvok-tqmc5-i5kro-x7xi4-og4dl-pwkcy-4vxq6-ct3es-i5grb-mqe", 
        "52ats-hshzn-sthp6-n5op4-jvruc-r73oq-tcbkr-fycb5-mnaka-oo2ad-3qe"
        ];

    public type StoryText = {
        title : Text; // less than 50 characters
        story : Text; // long encodedURIcomponent string: less than 3000 characters
        address : ?Text; // nft anvil address
    };

    // we store story text data as a blob as an optimisation
    public type StoryBlob = {
        title : Blob;
        story : Blob;
        address : Blob;
    };

    // A story record includes the required data for an individual story
    public type StoryRecord = {
        storyId : Nat;
        author : Principal;
        totalVotes : Nat;
        story : StoryBlob;
    };

    // The story return type is the same as story record type except with a decoded story
    public type StoryReturn = {
        storyId : Nat;
        author : Principal;
        totalVotes : Nat;
        story : StoryText;
    };

    /* We store stories in an Array - allowing for quick adding, lookups and deletion.
    Users have all their personal story IDs stored in a hashmap with key of principal and
    a value of a linked list for its linear growth */

    private stable var _stories : [var ?StoryRecord] = Array.init<?StoryRecord>(10000, null);
    private stable var _users : Trie.Trie<Principal, List.List<Nat>> = Trie.empty();

    /* upload a story: We iterate over the array finding the first null value and using this
    position as the story ID. We also add this ID to the user hashmap*/
    public shared({caller}) func add(story : StoryText) : async Result.Result<Text, Text> { 
        assert (checkValidStory(caller, story));

        var i = 0;

        for (x in _stories.vals()){
            if(x == null){
                let newStory : StoryRecord = {
                    storyId = i;
                    author = caller;
                    totalVotes = 0;
                    story = encodeStory(story)
                };
                _stories[i] := ?newStory;
                addId(caller, i);
                return #ok(Nat.toText(i));
            };
            i += 1;
        };

        return #err("No space left");
    };

    // get a full single story: quick array lookup of the ID
    public query func get(storyId: Nat) : async Result.Result<StoryReturn, Text> {
        let result = _stories[storyId];

        switch(result){
            case(null){return #err("Story not found")};
            case(?result){
                return #ok({
                    storyId =  result.storyId;
                    author = result.author;
                    totalVotes = result.totalVotes;
                    story = decodeStory(result.story);
                 });
            };
        };
    };

    /* get all stories belonging to a particular user returns the array of IDs tied to a particular user
    in the hashmap */
    public shared func getUserStories(caller : Text): async Result.Result<[Nat], Text>{
        let user = Principal.fromText(caller);
        assert (Principal.isAnonymous(user) == false);

        let result = Trie.find(_users, { key = user; hash = Principal.hash(user) }, Principal.equal);

        switch(result){
            case(null){return #err("No stories found for this user")};
            case(?result){
                return #ok(List.toArray(result))
            }
        }
    };

    // delete a single story: We remove the story ID from the hashmap
    public shared({caller}) func delete(storyId: Nat) : async Result.Result<Text, Text> {
        assert (Principal.isAnonymous(caller) == false);
        assert(userOwns(caller, storyId));

        let result = _stories[storyId];

        switch(result){
            case(null){return #err("Story not found")};
            case(?result){
                _stories[storyId] := null;
                removeId(caller, storyId);
                return #ok("Story ID: " # Nat.toText(storyId) # " deleted")
            }
        }
    };

    /* get a certain amount of story Ids: The array is reversed based on the assumption that the latest stories
    are those which have been added to the end of the array */
    public query func getStoryIds(amount : Nat) : async Result.Result<[Nat], Text> {
        var newList = List.nil<Nat>();

        let sS = _stories.size();
        let reversedStories = Array.tabulate(sS, func (n : Nat) : ?StoryRecord {
            _stories[sS - 1 - n]
        });

        label lo for(x in reversedStories.vals()){
            switch(x){
                case(null){};
                case(?x){
                    newList := List.push(x.storyId, newList);
                };
            };

            if(List.size(newList) >= amount){
                    break lo
            };

        };

       return #ok(List.toArray(List.reverse(newList)))

    };


    // admin can delete any story and delete from user list too
    public shared({caller}) func adminDelete(storyId : Nat): async Result.Result<Text, Text>{
        assert(adminContains(admin, caller));

        let result = _stories[storyId];

        switch(result){
            case(null){return #err("Story not found")};
            case(?result){
                _stories[storyId] := null;
                removeId(result.author, storyId);
                return #ok("Story ID: " # Nat.toText(storyId) # " deleted")
            };
        };
    };

    // utility functions:

    // Add the story ID to the linked list in the user hashmap
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

    // remove the story ID from the linked list in the user hashmap
    private func removeId(caller: Principal, storyId: Nat) : () {
        let result = Trie.find(_users, { key = caller; hash = Principal.hash(caller) }, Principal.equal);

        switch(result){
            case(null){return ()};
            case(?result){
                let newList = List.filter<Nat>(result, func (x : Nat) : Bool {
                    x != storyId
                });

                _users := Trie.replace(
                    _users,
                    { key = caller; hash = Principal.hash(caller) },
                    Principal.equal,
                    ?newList,
                ).0;

                return ()
            };
        };
    };

    // an assertion used before a user deletes their story
    private func userOwns(caller: Principal, storyId: Nat) : Bool {
        let result = Trie.find(_users, { key = caller; hash = Principal.hash(caller) }, Principal.equal);

        switch(result){
            case(null){return false};
            case(?result){
                return List.some(result, func (x : Nat) : Bool{
                    x == storyId
                })
            }
        }
    };

    // encode story text to a blob
    private func encodeStory(story : StoryText) : StoryBlob {
        return {
            title = Text.encodeUtf8(story.title);
            story = Text.encodeUtf8(story.story);
            address = Text.encodeUtf8(unwrapAddress(story.address));
        }
    };

    // decode story blob to a text
    private func decodeStory(story : StoryBlob) : StoryText {
        return {
            title = Option.unwrap(Text.decodeUtf8(story.title));
            story = Option.unwrap(Text.decodeUtf8(story.story));
            address = Text.decodeUtf8(story.address);
        }
    };

    // Check uploaded stories are not abusing storage and fit our requirements
    private func checkValidStory(caller: Principal, story: StoryText) : Bool {        
        assert (Principal.isAnonymous(caller) == false);
        assert (story.title.size() <= 50);
        assert (story.story.size() <= 10000);
        if(unwrapAddress(story.address).size() > 1){
            assert (unwrapAddress(story.address).size() == 64);
        };
        return true;
    };

    // an assertion used before an admin deletes a story
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

    public shared({caller}) func whoami() : async Principal {
        return caller
    };
}