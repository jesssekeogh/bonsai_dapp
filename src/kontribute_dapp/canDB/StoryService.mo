import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";
import Types "./Types";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";

shared ({ caller = owner }) actor class StoryService({
    partitionKey: Text;
    scalingOptions: CanDB.ScalingOptions;
    owners: ?[Principal];
}) {

    stable let db = CanDB.init({
        pk = partitionKey;
        scalingOptions = scalingOptions;
    });

    public shared({caller}) func whoami() : async Principal {
        return caller
    };

    // public query func getPK(): async Text { db.pk };

    // public query func skExists(sk: Text): async Bool { 
    //     CanDB.skExists(db, sk);
    // };

    // public shared({ caller = caller }) func transferCycles(): async () {
    //     if (caller == owner) {
    //         return await CA.transferCycles(caller);
    //     };
    // };

    // // creates a new group story and stores 
    // public shared({caller}) func putStory(groupStory: Types.GroupStory): async Text {
    //     assert(checkStory(story) == true);
    //     assert(Principal.toText(caller) == partitionKey);

    //     let sortKey = groupStory.groupName # "/" # Nat.toText(_storyId);

    //     await CanDB.put(db, {
    //         sk = sortKey;
    //         attributes = [
    //             ("id", #text(Nat.toText(storyId))),
    //             ("title", #text(story.title)),
    //             ("body", #text(story.body))
    //         ];
    //     });
    //     // replace the entity for every vote?
    //     // its not a new story so we find the
    //     // get last story id

    //     return sortKey
    // };

    // private func getGroupedStoryLastId() : Nat {
        
    // };

    // public query func getStory(id: Text): async ?Types.IndividualStory {
    //     let story = switch(CanDB.get(db, { sk = id })) {
    //         case null { null };
    //         case (?userEntity) { unwrapUser(userEntity) };
    //     };

    //     switch(story) {
    //         case null { null };
    //         case (?{ title; body }) {
    //             ?({
    //                 title;
    //                 body
    //             });
    //         }
    //     }
    // };

    // private func checkStory(story: Types.Story): Bool {
    //     if(story.title == "" or story.body == ""){
    //         return false
    //     };
    //     // add checks here that likes & votes are 0
    //     return true
    // };

    //   // attempts to cast an Entity (retrieved from CanDB) into a User type
    // private func unwrapUser(entity: Entity.Entity): ?Types.Story {
    //     let { sk; attributes } = entity;
    //     let storyTitleValue = Entity.getAttributeMapValueForKey(attributes, "title");
    //     let storyBodyValue = Entity.getAttributeMapValueForKey(attributes, "body");

    //     switch(storyTitleValue, storyBodyValue) {
    //         case (
    //             ?(#text(title)),
    //             ?(#text(body))
    //         ) { ?{ title; body } };
    //         case _ { 
    //             null 
    //         }
    //     };
    // };
}