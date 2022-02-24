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
    
}