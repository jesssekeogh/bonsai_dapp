import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Result "mo:base/Result";
import Option "mo:base/Option";

actor {

    // test whoami() function
    public shared (msg) func whoami() : async Principal {
        msg.caller
    };

    //MAIN CONTRACT:
    // the anonymous identity
    var anon : Text = "2vxsx-fae";

    // user profile
    public type Profile = {
        hasVoted: Bool;
        WhichOption: Text; 
    };

    // state (add stable)
    var uniqueUser : Trie.Trie<Principal, Profile> = Trie.empty();
    var vote1 : Nat = 0;
    var vote2 : Nat = 0;
    var vote3 : Nat = 0;

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
            let userchoice: Profile = {
                hasVoted = true;
                WhichOption = "vote1";
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
            let userchoice: Profile = {
                hasVoted = true;
                WhichOption = "vote2";
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
            let userchoice: Profile = {
                hasVoted = true;
                WhichOption = "vote3";
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
    public shared(msg) func readVotes() : async Profile {
        let callerId = msg.caller;

        let result = Trie.get(
            uniqueUser,
            key(callerId),
            Principal.equal
        );

        if(result == null) {
            let userchoice : Profile = {
                hasVoted = false;
                WhichOption = "novote"; 
                };
            return userchoice
        };
        return Option.unwrap(result)
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

}