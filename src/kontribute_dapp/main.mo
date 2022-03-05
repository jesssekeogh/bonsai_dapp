import Bonsai "canister:bonsai";
import Create "canister:create";
import Types "types";

actor {

    // The main contract for the imports

    // Functions for the Bonsai Stories - pass the user principal through
    public shared(msg) func VoteOption1 () : async Text {
        let callerId = msg.caller;
        await Bonsai.BonsaiOption1(callerId)
    };

    public shared(msg) func VoteOption2 () : async Text {
        let callerId = msg.caller;
        await Bonsai.BonsaiOption2(callerId)
    };

    public shared(msg) func VoteOption3 () : async Text {
        let callerId = msg.caller;
        await Bonsai.BonsaiOption3(callerId)
    };

    public shared(msg) func readVotes() : async Types.Profile {
        let callerId = msg.caller;
        await Bonsai.readBonsaiVotes(callerId)
    };

    // call the votes
    public func getVote1() : async Nat {
        await Bonsai.getBonsaiVote1()
    };

    public func getVote2() : async Nat {
        await Bonsai.getBonsaiVote2()
    };

    public func getVote3() : async Nat {
        await Bonsai.getBonsaiVote3()
    };

}