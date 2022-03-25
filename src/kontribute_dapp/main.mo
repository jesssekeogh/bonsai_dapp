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

    // query the voted data such as totals and voted option for that user
    // for prologue
    public func getVotes() : async Types.StoryVotes {
        await Bonsai.getBonsaiVotes()
    };

    // for PrologueII
    public shared(msg) func getVotesII() : async Types.StoryVotes {
        let callerId = msg.caller;
        await Bonsai.getBonsaiVotesII(callerId)
    };

    // for PrologueIII
    public shared(msg) func getVotesIII() : async Types.StoryVotes {
        let callerId = msg.caller;
        await Bonsai.getBonsaiVotesIII(callerId)
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