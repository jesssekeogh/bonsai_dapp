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

    // if user in profiles return false(menaing already voted) if true create a profile and increment vote. 
    public shared(msg) func VoteOption1 () : async Text {
        let callerId = msg.caller;

        // check for the anon
        if(Principal.toText(callerId) == anon) {
            return "the anon";
        };

        //search the trie for the account
        let result = Trie.find(
            uniqueUsers,
            key(callerId),
            Principal.equal
        );
        let newresult = Result.fromOption(result, "error");
        if(Result.isOk(newresult)){
            return "the already have an account and have voted" // set this to return false e.g already voted
        };
        return "theres no account and no vote"
        // (todo) implement here a create profile and increment vote
    };

    // get the votes (need to encapsulate in a type)
    public query func getVotes() : async Nat {
        return vote1;
        return vote2;
        return vote3;
    };

    // util func
    private func key(x : Principal) : Trie.Key<Principal> {
        return { key = x; hash = Principal.hash(x) }
    };
}