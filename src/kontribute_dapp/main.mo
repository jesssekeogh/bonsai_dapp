import Principal "mo:base/Principal";
import Trie "mo:base/Trie";
import Result "mo:base/Result";

actor {

    // test whoami() function
    public shared (msg) func whoami() : async Principal {
        msg.caller
    };

    //MAIN CONTRACT:
    // the votes
    stable var vote1 : Nat = 0;
    stable var vote2 : Nat = 0;
    stable var vote3 : Nat = 0;

    // the anonymous identity
    var anon : Text = "2vxsx-fae";

    // user profile
    public type hasVoted = Bool;

    // state
    stable var uniqueUsers : Trie.Trie<Principal, hasVoted> = Trie.empty();

    // vote option,check anon, check if account exists, create an account and increment
    public shared(msg) func VoteOption1 (hasvoted: hasVoted) : async Text {
        let callerId = msg.caller;

        if(Principal.toText(callerId) == anon) {
            return "the anon";
        };

        let result = Trie.find(
            uniqueUsers,
            key(callerId),
            Principal.equal
        );
        let newresult =  Result.fromOption(result, "error");

        if(Result.isOk(newresult)){
            return "they already have an account and have voted"
        };

        let hasvoted = true;

        uniqueUsers := Trie.replace(
            uniqueUsers,
            key(callerId),
            Principal.equal,
            ?hasvoted
            ).0;

        vote1 += 1;
        return "new account has been created and vote incremented";

    };

    // get the votes (need to encapsulate in a type)
    public query func getVotes() : async Nat {
        return vote1;
        return vote2;
        return vote3;
    };

    // utility func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };
}