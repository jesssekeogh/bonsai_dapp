import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Types "./Types";
import Nat "mo:base/Nat";
import Result "mo:base/Result";
import Principal "mo:base/Principal";

shared ({ caller = owner }) actor class VotingService({
    partitionKey : Text;
    scalingOptions : CanDB.ScalingOptions;
    owners : ?[Principal];
}) {

    stable let db = CanDB.init({
        pk = partitionKey;
        scalingOptions = scalingOptions;
    });

    public query func getPK() : async Text { db.pk };

    public query func skExists(sk : Text) : async Bool {
        CanDB.skExists(db, sk);
    };

    public shared ({ caller = caller }) func transferCycles() : async () {
        if (caller == owner) {
            return await CA.transferCycles(caller);
        };
    };

    public shared ({ caller }) func putProposal(storySK : Text, proposals : [Types.VotingProposal]) : async Text {
        // we pass in storySortKey to query relevant proposals attached to a story
        var proposalsAmount = 1;

        for (p in proposals.vals()) {
            await CanDB.put(
                db,
                {
                    sk = "proposal#" # Nat.toText(proposalsAmount) # "for#" # storySK;
                    attributes = [
                        ("proposal#", #int(proposalsAmount)),
                        ("title", #text(p.title)),
                        ("body", #text(p.body)),
                        ("votes", #int(0)),
                    ];
                },
            );

            proposalsAmount += 1;
        };

        return Nat.toText(proposalsAmount) # " proposals added";
    };

    public query func getProposal(proposalSK : Text) : async ?Types.VotingProposal {
        let proposal = switch (CanDB.get(db, { sk = proposalSK })) {
            case null { null };
            case (?userEntity) { unwrapProposal(userEntity) };
        };

        switch (proposal) {
            case null { null };
            case (?{ title; body; votes }) {
                ?({
                    title;
                    body;
                    votes;
                });
            };
        };
    };

    // public shared ({ caller }) func voteOnProposal(proposalNumber: Text, storySK : Text) : async Result.Result<?Types.ConsumableEntity, Text> {
    //     // we add an entity to the db that stores the storySk and a voted attribute to ensure 1 vote for 1 story
    //     // contains an update element that updates whichever proposal is voted on
    //     let sortKeyForVotes = "user#" # Principal.toText(caller) # "proposal#" # proposalNumber # storySK;

    //     // get a votes previous likes

    // };

    private func unwrapProposal(entity : Entity.Entity) : ?Types.VotingProposal {
        let { sk; attributes } = entity;

        let proposalTitleValue = Entity.getAttributeMapValueForKey(attributes, "title");
        let proposalBodyValue = Entity.getAttributeMapValueForKey(attributes, "body");
        let proposalVotesValue = Entity.getAttributeMapValueForKey(attributes, "votes");

        switch (proposalTitleValue, proposalBodyValue, proposalVotesValue) {
            case (
                ?(#text(title)),
                ?(#text(body)),
                ?(#int(votes)),
            ) { ?{ title; body; votes } };
            case _ {
                null;
            };
        };
    };
};
