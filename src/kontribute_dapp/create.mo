import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Types "types";
import Iter "mo:base/Iter";
import List "mo:base/List";

actor Create {

    // The main contract used for the create functionality:

    // utility func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };
    
    // WORK IN PROGRESS STORY FUNCTIONALITY(testing options):

    var Writers : Trie.Trie<Principal, Types.Story> = Trie.empty();

    // create story (add logic to reject anon)
    public shared(msg) func create(callerId : Principal, story : Types.Story) : async Text {
        if(story.title == ""){
            return "Failed, one or more fields empty"
        }else if(story.genre == ""){
            return "Failed, one or more fields empty"
        }else if(story.body == ""){
            return "Failed, one or more fields empty"
        }else if(story.user_discord == ""){
            return "Failed, one or more fields empty"
        };
        
        let newStory : Types.Story = {
            title = story.title;
            genre = story.genre;
            body = story.body;
            user_discord = story.user_discord;
        };
        Writers := Trie.replace(
            Writers,
            key(callerId),
            Principal.equal,
            ?newStory,
        ).0;
        return "Story Created!"
    };

    // get the last n stories
    public func allStories(amount : Nat): async List.List<(Principal, Types.Story)>{
        // return all key and values:
        var my_list = Iter.toList(Trie.iter(Writers)); // maps all trie entries to List

        var new_list = List.nil<(Principal, Types.Story)>();

        new_list := List.take(my_list, amount); // a new list to return the newest n entries

        return new_list // unwrap list and return the records only
    };

}