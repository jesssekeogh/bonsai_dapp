import Principal "mo:base/Principal";
import Trie "mo:base/Trie";

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
    stable var uniqueUsers : Trie.Trie<Principal, hasVoted> = Trie.empty();

    // store the user if they have voted in a hashmap with id and has voted = true (todo):

    // if user is not anon they can vote
    public shared(msg) func VoteOption1() : async Bool {
        let userId = msg.caller;
        if(Principal.toText(userId) != anon) {
            // if has voted = false they can vote then set it to true (todo)
            vote1 += 1;
            return true;
        };
        return false;
    };


    // get the votes (need to encapsulate in a type)
    public query func getVotes() : async Nat {
        return vote1;
        return vote2;
        return vote3;
    };
}

