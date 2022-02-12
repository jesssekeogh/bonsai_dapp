import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Result "mo:base/Result";

actor {

    // test whoami() function
    public shared (msg) func whoami() : async Principal {
        msg.caller
    };

    //MAIN CONTRACT:
    // the anonymous identity
    var anon : Text = "2vxsx-fae";

    // user profile
    public type hasVoted = Bool;

    // state (add stable)
    stable var uniqueUser : Trie.Trie<Principal, hasVoted> = Trie.empty();
    stable var vote1 : Nat = 0;
    stable var vote2 : Nat = 0;
    stable var vote3 : Nat = 0;

    // vote options,check anon, check if account exists, create an account and increment
    public shared(msg) func VoteOption1 (hasvoted: hasVoted) : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.find(
            uniqueUser,
            key(callerId),
            Principal.equal
        );
        let newresult =  Result.fromOption(result, "true");

        if(Result.isOk(newresult)){
            return "user already has an account and has voted"
        };

        let hasvoted = true;

        uniqueUser := Trie.replace(
            uniqueUser,
            key(callerId),
            Principal.equal,
            ?hasvoted
            ).0;

        vote1 += 1;
        return "new account has been created and vote1 incremented";

    };

    public shared(msg) func VoteOption2 (hasvoted: hasVoted) : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.find(
            uniqueUser,
            key(callerId),
            Principal.equal
        );
        let newresult =  Result.fromOption(result, "true");

        if(Result.isOk(newresult)){
            return "user already has an account and has voted"
        };

        let hasvoted = true;

        uniqueUser := Trie.replace(
            uniqueUser,
            key(callerId),
            Principal.equal,
            ?hasvoted
            ).0;

        vote2 += 1;
        return "new account has been created and vote2 incremented";

    };

    public shared(msg) func VoteOption3 (hasvoted: hasVoted) : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "Anonymous user: Invalid";
        };

        let result = Trie.find(
            uniqueUser,
            key(callerId),
            Principal.equal
        );
        let newresult =  Result.fromOption(result, "true");

        if(Result.isOk(newresult)){
            return "user already has an account and has voted"
        };

        let hasvoted = true;

        uniqueUser := Trie.replace(
            uniqueUser,
            key(callerId),
            Principal.equal,
            ?hasvoted
            ).0;

        vote3 += 1;
        return "new account has been created and vote3 incremented";

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