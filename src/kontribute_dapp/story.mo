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
        summary : Text; // less than 110 characters
        story : Text; // long encodedURIcomponent string: less than 3000 characters
        address : ?Text; // nft anvil address
    };

    public type StoryBlob = {
        title : Blob;
        summary : Blob;
        story : Blob;
        address : Blob;
    };

    public type StoryRecord = {
        storyId : Nat;
        author : Principal;
        totalVotes : Nat;
        story : StoryBlob;
    };

    public type StoryReturn = {
        storyId : Nat;
        author : Principal;
        totalVotes : Nat;
        story : StoryText;
    };

    private var _stories : [var ?StoryRecord] = Array.init<?StoryRecord>(10000, null);
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

    // get a full single story
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

    // get all stories belonging to a particular user
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

    // delete a single story
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

    // get a certain amount of story Ids
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


    // admin can delete any story will need to be able to delete from user list too
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

    private func encodeStory(story : StoryText) : StoryBlob {
        return {
            title = Text.encodeUtf8(story.title);
            summary = Text.encodeUtf8(story.summary);
            story = Text.encodeUtf8(story.story);
            address = Text.encodeUtf8(unwrapAddress(story.address));
        }
    };

    private func decodeStory(story : StoryBlob) : StoryText {
        return {
            title = Option.unwrap(Text.decodeUtf8(story.title));
            summary = Option.unwrap(Text.decodeUtf8(story.summary));
            story = Option.unwrap(Text.decodeUtf8(story.story));
            address = Text.decodeUtf8(story.address);
        }
    };

    private func checkValidStory(caller: Principal, story: StoryText) : Bool {        
        assert (Principal.isAnonymous(caller) == false);
        assert (story.title.size() <= 50);
        assert (story.summary.size() <= 110);
        assert (story.story.size() <= 3000); // change to large amount in Prod
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

    public shared({caller}) func whoami() : async Principal {
        return caller
    };
}