import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Types "./Types";

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

    public shared ({ caller }) func putProposal(proposal : Types.VotingProposal) : async Text {

        let sk = "#proposalfor#" # proposal.storySortKey;

        await CanDB.put(
            db,
            {
                sk = sk;
                attributes = [
                    ("title", #text(proposal.title)),
                    ("body", #text(proposal.body)),
                    ("votes", #int(0)),
                ];
            },
        );

        return sk;
    };

    // we return as many proposals as possible attached to a story sort key
    // public query func scanProposals() : async Types.ScanProposalResult {

    // }

    // func unwrapUser(entity : Entity.Entity) : ?User {
    //     let { sk; attributes } = entity;
    //     let nameValue = Entity.getAttributeMapValueForKey(attributes, "name");
    //     let zipCodeValue = Entity.getAttributeMapValueForKey(attributes, "zipCode");

    //     switch (nameValue, zipCodeValue) {
    //         case (
    //             ?(#text(name)),
    //             ?(#text(zipCode)),
    //         ) { ?{ name; zipCode } };
    //         case _ { null };
    //     };
    // };
};
