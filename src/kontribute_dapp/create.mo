import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Types "types";

actor Create {

    // The main contract used for the create functionality:

    // utility func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };
    
    // WORK IN PROGRESS STORY FUNCTIONALITY(testing options):

    var Writers : Trie.Trie<Principal, Types.Story> = Trie.empty();

    // create story
    public shared(msg) func create(story : Types.Story) : async Text {
        if(story.title == ""){
            return "Failed, one or more fields empty"
        }else if(story.chapter == ""){
            return "Failed, one or more fields empty"
        }else if(story.body == ""){
            return "Failed, one or more fields empty"
        };

        let callerId = msg.caller;
        
        let newStory : Types.Story = {
            title = story.title;
            chapter = story.chapter;
            body = story.body;
        };
        Writers := Trie.replace(
            Writers,
            key(callerId),
            Principal.equal,
            ?newStory,
        ).0;
        return "Story Created!"
    };

    // return all user stories
    public func allStories(): async [Types.Story]{
        // return all key and values:
        // let my_array : [(Principal, Types.Story)] = Iter.toArray(Trie.iter(Writers));

        // return all values
        let result = Trie.toArray<Principal, Types.Story, Types.Story>(Writers, func (key, value): Types.Story{
            value;
        });

        // on the frontend loop through all the values and display in new section
    }
}