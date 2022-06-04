import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Result "mo:base/Result";

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

    // Chapter1 user state and vote tally
    stable var uniqueUserIV : Trie.Trie<Principal, Types.Profile> = Trie.empty();
    stable var vote1IV: Nat = 0;
    stable var vote2IV : Nat = 0;
    stable var vote3IV : Nat = 0;

    // utility func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };

    // vote options,check anon, get the value of principal (null if no vote)
    public shared(msg) func BonsaiOption1 () : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserIV, // changed for chapter
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote1";
            };
            uniqueUserIV := Trie.replace( // change for chapter
                uniqueUserIV,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote1IV += 1; // change for chapter
            return "user has voted successfully on vote1"
        };

        return "user has already voted";

    };

    public shared(msg) func BonsaiOption2 () : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserIV,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote2";
            };
            uniqueUserIV := Trie.replace(
                uniqueUserIV,
                key(callerId),
                Principal.equal,
                ?userchoice
            ).0;
            vote2IV += 1;
            return "user has voted successfully on vote2"
        };

        return "user has already voted";

    };

    public shared(msg) func BonsaiOption3 () : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.get(
            uniqueUserIV,
            key(callerId),
            Principal.equal
        );

        if(result == null){
            let userchoice: Types.Profile = {
                hasVoted = true;
                whichOption = "vote3";
            };
            uniqueUserIV := Trie.replace(
                uniqueUserIV,
                key(callerId),
                Principal.equal,
                ?userchoice,
            ).0;
            vote3IV += 1;
            return "user has voted successfully on vote3"
        };

        return "user has already voted";

    };

    // query the vote results for the prologue
    public shared query(msg) func getBonsaiVotes() : async Types.StoryVotes {
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
    public shared query(msg) func getBonsaiVotesII() : async Types.StoryVotes {
        let callerId = msg.caller;

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
    public shared query(msg) func getBonsaiVotesIII() : async Types.StoryVotes {
        let callerId = msg.caller;
        
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

    // query votes for chapter 1
    public shared query(msg) func getBonsaiVotesIV() : async Types.StoryVotes {
        let callerId = msg.caller;
        
        var option : Types.Profile = { hasVoted = false; whichOption = "novote"};
        
        let result = Trie.get(
            uniqueUserIV,
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
            vote1 = vote1IV;
            vote2 = vote2IV;
            vote3 = vote3IV;
            total = vote1IV + vote2IV + vote3IV;
            userOption = option
        };
        return votes
    };
}