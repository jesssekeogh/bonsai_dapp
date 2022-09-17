import CA "mo:candb/CanisterActions";
import CanDB "mo:candb/CanDB";
import Entity "mo:candb/Entity";

shared ({ caller = owner }) actor class HelloService({
  // the primary key of this canister
  partitionKey: Text;
  // the scaling options that determine when to auto-scale out this canister storage partition
  scalingOptions: CanDB.ScalingOptions;
  // (optional) allows the developer to specify additional owners (i.e. for allowing admin or backfill access to specific endpoints)
  owners: ?[Principal];
}) {
  /// @required (may wrap, but must be present in some form in the canister)
  stable let db = CanDB.init({
    pk = partitionKey;
    scalingOptions = scalingOptions;
  });

  /// @recommended (not required) public API
  public query func getPK(): async Text { db.pk };

  /// @required public API (Do not delete or change)
  public query func skExists(sk: Text): async Bool { 
    CanDB.skExists(db, sk);
  };

  /// @required public API (Do not delete or change)
  public shared({ caller = caller }) func transferCycles(): async () {
    if (caller == owner) {
      return await CA.transferCycles(caller);
    };
  };

  // returns a greeting to the user if exists 
  public query func greetUser(name: Text): async ?Text {
    let user = switch(CanDB.get(db, { sk = name })) {
      case null { null };
      case (?userEntity) { unwrapUser(userEntity) };
    };

    switch(user) {
      case null { null };
      case (?{ name; zipCode }) {
        ?("Hello " # name # " from " # zipCode # " in " # db.pk);
      }
    }
  };

  // Create a new user. In this basic case, we're using the user's name as the sort key
  // This works for our hello world app, but as names are easily duplicated, one might want
  // to attach an unique identifier to the sk to separate users with the same name
  public func putUser(name: Text, zipCode: Text): async () {
    if (name == "" or zipCode == "") { return };

    // inserts the entity into CanDB
    await CanDB.put(db, {
      sk = name;
      attributes = [
        ("name", #text(name)),
        ("zipCode", #text(zipCode))
      ]
    })
  };

  type User = {
    name: Text;
    zipCode: Text;
  };

  // attempts to cast an Entity (retrieved from CanDB) into a User type
  func unwrapUser(entity: Entity.Entity): ?User {
    let { sk; attributes } = entity;
    let nameValue = Entity.getAttributeMapValueForKey(attributes, "name");
    let zipCodeValue = Entity.getAttributeMapValueForKey(attributes, "zipCode");

    switch(nameValue, zipCodeValue) {
      case (
        ?(#text(name)),
        ?(#text(zipCode))
      ) { ?{ name; zipCode } };
      case _ { 
        null 
      }
    };
  };
}