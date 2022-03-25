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

    // vote tally for prologue
    let vote1 : Nat = 206;
    let vote2 : Nat = 103;
    let vote3 : Nat = 69;

    // PrologueII user state and vote tally
    stable var uniqueUserII : Trie.Trie<Principal, Types.Profile> = Trie.empty();
    stable var vote1II : Nat = 0;
    stable var vote2II : Nat = 0;
    stable var vote3II : Nat = 0;

    // PrologueIII user state and vote tally
    stable var uniqueUserIII : Trie.Trie<Principal, Types.Profile> = Trie.empty();
    stable var vote1III : Nat = 0;
    stable var vote2III : Nat = 0;
    stable var vote3III : Nat = 0;

    // utility func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };

    // vote options,check anon, get the value of principal (null if no vote)
    public shared(msg) func BonsaiOption1 (callerId : Principal) : async Text {

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserIII, // changed for chapter
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote1";
            };
            uniqueUserIII := Trie.replace( // change for chapter
                uniqueUserIII,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote1III += 1; // change for chapter
            return "user has voted successfully on vote1"
        };

        return "user has already voted";

    };

    public shared(msg) func BonsaiOption2 (callerId : Principal) : async Text {

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserIII,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote2";
            };
            uniqueUserIII := Trie.replace(
                uniqueUserIII,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote2III += 1;
            return "user has voted successfully on vote2"
        };

        return "user has already voted";

    };

    public shared(msg) func BonsaiOption3 (callerId : Principal) : async Text {

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserIII,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote3";
            };
            uniqueUserIII := Trie.replace(
                uniqueUserIII,
                key(callerId),
                Principal.equal,
                ?userchoice,
            ).0;
            vote3III += 1;
            return "user has voted successfully on vote3"
        };

        return "user has already voted";

    };

    // query the vote results
    public query func getBonsaiVotes() : async Types.StoryVotes {
        let votes : Types.StoryVotes= {
            vote1 = vote1;
            vote2 = vote2;
            vote3 = vote3;
            total = vote1 + vote2 + vote3;
            userOption = {hasVoted = false; whichOption = "novote"}
        };
        return votes
    };

    // query results for Prologue II
    public query func getBonsaiVotesII(callerId : Principal) : async Types.StoryVotes {
        var option : Types.Profile = { hasVoted = false; whichOption = "novote"};

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
                option := userchoice
            };
            case (?result){
                option := result
            };
        };

        let votes : Types.StoryVotes= {
            vote1 = vote1II;
            vote2 = vote2II;
            vote3 = vote3II;
            total = vote1II + vote2II + vote3II;
            userOption = option
        };
        return votes
    };
    
    // query results for prologue III
    public query func getBonsaiVotesIII(callerId : Principal) : async Types.StoryVotes {
        var option : Types.Profile = { hasVoted = false; whichOption = "novote"};
        
        let result = Trie.get(
            uniqueUserIII,
            key(callerId),
            Principal.equal
        );

        switch (result){
            case (null){
                let userchoice : Types.Profile = {
                hasVoted = false;
                whichOption = "novote"; 
                };
                option := userchoice
            };
            case (?result){
                option := result
            };
        };
        let votes : Types.StoryVotes= {
            vote1 = vote1III;
            vote2 = vote2III;
            vote3 = vote3III;
            total = vote1III + vote2III + vote3III;
            userOption = option
        };
        return votes
    };
}