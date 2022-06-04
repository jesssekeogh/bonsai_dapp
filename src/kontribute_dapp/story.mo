import Trie "mo:base/Trie";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Option "mo:base/Option";
import List "mo:base/List";

actor Story {

    var anon : Text = "2vxsx-fae";

    public type Story = {
        summary : Text; // less than 110 characters
        story : Text; // long encoded string: less than 3000 characters
        address: Text; // nft anvil address
    };

    public type StoryWithLikes = {
        story : Story;
        likes: Nat;
    };

    stable var userStories : Trie.Trie<Principal, StoryWithLikes> = Trie.empty();

    // upload a story
    public shared({caller}) func add(story : Story) : async StoryWithLikes { 
        assert (checkValidStory(caller, story));

        let newStory : StoryWithLikes = {
            story = {
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

        return newStory
    };

    // get a single story
    public query func get(userId : Text) : async StoryWithLikes {
        let user = Principal.fromText(userId);
        let result = Trie.find(userStories, key(user), Principal.equal);
        
        switch (result){
            case(null) {
                return nullHandle()
            };
            case (?result){
                return result;
            };
        };
    };

    // like a story
    public shared({caller}) func like(userId : Text) : async StoryWithLikes {
        let user = Principal.fromText(userId);
        let result = Trie.find(userStories, key(user), Principal.equal);

        switch (result){
            case(null){
                return nullHandle();
            };
            case (?result){
                // assert(checkHasLiked(caller, result.likes));
                let incrementStory : StoryWithLikes = {
                    story = result.story;
                    likes = result.likes + 1;
                };

                userStories := Trie.replace(
                    userStories,
                    key(caller),
                    Principal.equal,
                    ?incrementStory,
                ).0;
                return incrementStory;
            };
        };
    };


    // TODO: get recent stories

    // TODO: get most liked stories

    // private func checkHasLiked(caller: Principal, list: List.List<Principal>) : Bool {

    //     let found = List.find<Principal>(list, func (listId : Principal) : Bool {
    //         if(listId == caller) { true }
    //         else {false}
    //     });

    //     assert ( found == null);
    //     return true;
    // };

    private func checkValidStory(caller: Principal, story: Story) : Bool {
        assert (Principal.toText(caller) != anon);
        assert (Text.size(story.summary) <= 110);
        assert (Text.size(story.story) <= 3000);
        assert (Text.size(story.address) == 64);
        return true;
    };

    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };

    private func nullHandle() : StoryWithLikes {
        return { 
            story = {
            summary = "null";
            story = "null";
            address = "null";
            };
            likes = 0;
        }
    }

}