import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Result "mo:base/Result";
import Types "types";

actor Bonsai {
    
    // The main contract used for bonsai warriors votes, state and funcs:
    // Stories: Bonsai Warriors Prologue, PrologueII
    // Ratoko is the better toko

    // the anonymous identity
    var anon : Text = "2vxsx-fae";

    // vote tally
    let vote1 : Nat = 206;
    let vote2 : Nat = 103;
    let vote3 : Nat = 69;

    // PrologueII user state and vote tally
    stable var uniqueUserII : Trie.Trie<Principal, Types.Profile> = Trie.empty();
    stable var vote1II : Nat = 0;
    stable var vote2II : Nat = 0;
    stable var vote3II : Nat = 0;

    // vote options,check anon, get the value of principal (null if no vote)
    public shared(msg) func BonsaiOption1 (callerId : Principal) : async Text {

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserII, // changed for chapter
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote1";
            };
            uniqueUserII := Trie.replace(
                uniqueUserII,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote1II += 1;
            return "user has voted successfully on vote1"
        };

        return "user has already voted";

    };

    public shared(msg) func BonsaiOption2 (callerId : Principal) : async Text {

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserII,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote2";
            };
            uniqueUserII := Trie.replace(
                uniqueUserII,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote2II += 1;
            return "user has voted successfully on vote2"
        };

        return "user has already voted";

    };

    public shared(msg) func BonsaiOption3 (callerId : Principal) : async Text {

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserII,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote3";
            };
            uniqueUserII := Trie.replace(
                uniqueUserII,
                key(callerId),
                Principal.equal,
                ?userchoice,
            ).0;
            vote3II += 1;
            return "user has voted successfully on vote3"
        };

        return "user has already voted";

    };

    // check if user has voted yet and on which option for Prologue II
    public shared(msg) func readBonsaiVotesII(callerId : Principal) : async Types.Profile {

        let result = Trie.get(
            uniqueUserII,
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

    // call the votes for prologueII
    public query func getBonsaiVote1II() : async Nat {
        return vote1II;
    };

    public query func getBonsaiVote2II() : async Nat {
        return vote2II;
    };

    public query func getBonsaiVote3II() : async Nat {
        return vote3II;
    };

    public query func prologueIIGetAll() : async Nat {
        return vote1II + vote2II + vote3II
    };

    // call the votes for prologue
    public query func getBonsaiVote1() : async Nat {
        return vote1;
    };

    public query func getBonsaiVote2() : async Nat {
        return vote2;
    };

    public query func getBonsaiVote3() : async Nat {
        return vote3;
    };

    public query func prologueGetAll() : async Nat {
        return vote1 + vote2 + vote3
    };

    // utility func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };
    
}