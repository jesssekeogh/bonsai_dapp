import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Result "mo:base/Result";
import Types "types";

actor {

    // Bonsai Prologue Vote state and funcs:

    // the anonymous identity
    var anon : Text = "2vxsx-fae";

    // state (add stable)
    stable var uniqueUser : Trie.Trie<Principal, Types.Profile> = Trie.empty();
    stable var vote1 : Nat = 0;
    stable var vote2 : Nat = 0;
    stable var vote3 : Nat = 0;

    // vote options,check anon, get the value of principal (null if no vote)
    public shared(msg) func VoteOption1 () : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUser,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote1";
            };
            uniqueUser := Trie.replace(
                uniqueUser,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote1 += 1;
            return "user has voted successfully on vote1"
        };

        return "user has already voted";

    };

    public shared(msg) func VoteOption2 () : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUser,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote2";
            };
            uniqueUser := Trie.replace(
                uniqueUser,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote2 += 1;
            return "user has voted successfully on vote2"
        };

        return "user has already voted";

    };

    public shared(msg) func VoteOption3 () : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUser,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote3";
            };
            uniqueUser := Trie.replace(
                uniqueUser,
                key(callerId),
                Principal.equal,
                ?userchoice,
            ).0;
            vote3 += 1;
            return "user has voted successfully on vote3"
        };

        return "user has already voted";

    };

    // check if user has voted yet and on which option
    public shared(msg) func readVotes() : async Types.Profile {
        let callerId = msg.caller;

        let result = Trie.get(
            uniqueUser,
            key(callerId),
            Principal.equal
        );

        switch (result){
            case (null){
                let userchoice : Types.Profile = {
                hasVoted = false;
                whichOption = "novote"; 
                };
            return userchoice
            };
            case (?result){
                return result
            };
        };
    };

    // call the votes
    public query func getVote1() : async Nat {
        return vote1;
    };

    public query func getVote2() : async Nat {
        return vote2;
    };

    public query func getVote3() : async Nat {
        return vote3;
    };

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