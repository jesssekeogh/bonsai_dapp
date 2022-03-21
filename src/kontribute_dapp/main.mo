import Bonsai "canister:bonsai";
import Create "canister:create";
import Types "types";
import List "mo:base/List";
import Principal "mo:base/Principal";

actor {

    // The main contract for the imports

    // Functions for the Bonsai Stories - pass the user principal through
    // update the votes
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

    // read to see which option for Prologue II
    public shared(msg) func readVotesII() : async Types.Profile {
        let callerId = msg.caller;
        await Bonsai.readBonsaiVotesII(callerId)
    };

    // call the votes for PrologueII
    public func getVote1II() : async Nat {
        await Bonsai.getBonsaiVote1II()
    };

    public func getVote2II() : async Nat {
        await Bonsai.getBonsaiVote2II()
    };

    public func getVote3II() : async Nat {
        await Bonsai.getBonsaiVote3II()
    };

    public func getAllII() : async Nat {
        await Bonsai.prologueIIGetAll()
    };

    // call the votes for the prologue
    public func getVote1() : async Nat {
        await Bonsai.getBonsaiVote1()
    };

    public func getVote2() : async Nat {
        await Bonsai.getBonsaiVote2()
    };

    public func getVote3() : async Nat {
        await Bonsai.getBonsaiVote3()
    };

    public func getAll() : async Nat {
        await Bonsai.prologueGetAll()
    };

    // functions for the create feature
    // work in progress
    public shared(msg) func uploadStory(story : Types.Story): async Text {
        let callerId = msg.caller;
        await Create.create(callerId, story)
    };

    public func getAllStories(amount : Nat) : async List.List<(Principal, Types.Story)>{
        await Create.allStories(amount)
    };

    public func findStory(userId : Text) : async Text {
        await Create.findStory(userId)
    };
}