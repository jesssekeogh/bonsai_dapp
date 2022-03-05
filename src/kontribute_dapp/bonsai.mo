import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Result "mo:base/Result";
import Types "types";

actor Bonsai {
    
    // The main contract used for bonsai warriors votes, state and funcs:
    // Stories: Bonsai Warriors Prologue, to-do add chapter 1

    // the anonymous identity
    var anon : Text = "2vxsx-fae";

    // state (add stable) (change upon story added)
    stable var uniqueUser : Trie.Trie<Principal, Types.Profile> = Trie.empty();

    // Prologue vote options
    stable var vote1 : Nat = 0;
    stable var vote2 : Nat = 0;
    stable var vote3 : Nat = 0;

    
    // vote options,check anon, get the value of principal (null if no vote)
    public shared(msg) func BonsaiOption1 (callerId : Principal) : async Text {

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

    public shared(msg) func BonsaiOption2 (callerId : Principal) : async Text {

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

    public shared(msg) func BonsaiOption3 (callerId : Principal) : async Text {

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
    public shared(msg) func readBonsaiVotes(callerId : Principal) : async Types.Profile {

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
    public query func getBonsaiVote1() : async Nat {
        return vote1;
    };

    public query func getBonsaiVote2() : async Nat {
        return vote2;
    };

    public query func getBonsaiVote3() : async Nat {
        return vote3;
    };

    // utility func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };
    
}