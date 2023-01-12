import Cycles "mo:base/ExperimentalCycles";
import Debug "mo:base/Debug";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import Text "mo:base/Text";

import CA "mo:candb/CanisterActions";
import CanisterMap "mo:candb/CanisterMap";
import Utils "mo:candb/Utils";
import Buffer "mo:stable-buffer/StableBuffer";
import Admin "mo:candb/CanDBAdmin";
import Iter "mo:base/Iter";

import StoryService "./StoryService";

shared ({ caller = owner }) actor class IndexCanister() = this {
  /// @required stable variable (Do not delete or change)
  ///
  /// Holds the CanisterMap of PK -> CanisterIdList
  stable var pkToCanisterMap = CanisterMap.init();

  /// @required API (Do not delete or change)
  ///
  /// Get all canisters for an specific PK
  ///
  /// This method is called often by the candb-client query & update methods.
  public shared query ({ caller = caller }) func getCanistersByPK(pk : Text) : async [Text] {
    getCanisterIdsIfExists(pk);
  };

  // returns all ouser partitions
  public query func getPKs() : async [Text] {
    let allPks = CanisterMap.entries(pkToCanisterMap);

    let iterOfPks = Iter.map<(Text, CanisterMap.CanisterIdList), Text>(
      allPks,
      func(e) {
        e.0;
      },
    );

    return Iter.toArray(iterOfPks);
  };

  /// @required function (Do not delete or change)
  ///
  /// Helper method acting as an interface for returning an empty array if no canisters
  /// exist for the given PK
  func getCanisterIdsIfExists(pk : Text) : [Text] {
    switch (CanisterMap.get(pkToCanisterMap, pk)) {
      case null { [] };
      case (?canisterIdsBuffer) { Buffer.toArray(canisterIdsBuffer) };
    };
  };

  /// @modify and @required (Do not delete or change the API, but must change/modify the function logic for your given application actor and data model)
  ///
  /// This is method is called by CanDB for AutoScaling. It is up to the developer to specify which
  /// PK prefixes should spin up which canister actor.
  ///
  /// If the developer does not utilize this method, auto-scaling will NOT work

  /*
    API for story service:
  */

  public shared ({ caller = caller }) func autoScaleStoryServiceCanister(pk : Text) : async Text {
    // Auto-Scaling Authorization - if the request to auto-scale the partition is not coming from an existing canister in the partition, reject it
    if (Utils.callingCanisterOwnsPK(caller, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createStoryServiceCanister(pk, ?[owner, Principal.fromActor(this)]);
    } else {
      throw Error.reject("not authorized");
    };
  };

  // Partition storyservice canisters by user
  public shared ({ caller }) func createStoryServiceCanisterParitition() : async ?Text {
    // valid principals can create their own canister partitions
    assert (Principal.isAnonymous(caller) == false);
    let pk = "author_" # Principal.toText(caller);
    let canisterIds = getCanisterIdsIfExists(pk);

    if (canisterIds == []) {
      ?(await createStoryServiceCanister(pk, ?[owner, Principal.fromActor(this)]));
      // already exists
    } else {
      Debug.print(pk # " already exists, not creating and returning null");
      null;
    };
  };

  // Spins up a new storyservice canister with the provided pk and controllers
  func createStoryServiceCanister(pk : Text, controllers : ?[Principal]) : async Text {
    Debug.print("creating new story service canister with pk=" # pk);
    // Pre-load 2T cycles for the creation of a new storyservice canister
    // Note that canister creation costs 100 billion cycles, meaning there are 1.9T
    // left over for the new canister when it is created
    Cycles.add(2_000_000_000_000);
    let newStoryServiceCanister = await StoryService.StoryService({
      partitionKey = pk;
      scalingOptions = {
        autoScalingHook = autoScaleStoryServiceCanister;
        sizeLimit = #heapSize(475_000_000); // Scale out at 200MB
      };
      owners = controllers;
    });
    let newStoryServiceCanisterPrincipal = Principal.fromActor(newStoryServiceCanister);
    await CA.updateCanisterSettings({
      canisterId = newStoryServiceCanisterPrincipal;
      settings = {
        controllers = controllers;
        compute_allocation = ?0;
        memory_allocation = ?0;
        freezing_threshold = ?2592000;
      };
    });

    let newStoryServiceCanisterId = Principal.toText(newStoryServiceCanisterPrincipal);
    // After creating the new story service canister, add it to the pkToCanisterMap
    pkToCanisterMap := CanisterMap.add(pkToCanisterMap, pk, newStoryServiceCanisterId);

    Debug.print("new story service canisterId=" # newStoryServiceCanisterId);
    newStoryServiceCanisterId;
  };

  /*
    Util functions:
  */

  public shared ({ caller }) func deleteServiceCanister(serviceId : Text) : async () {
    assert (caller == owner);
    // admin can delete any pk by passing in service id of user principal
    let pk = serviceId;

    let canisterIds = getCanisterIdsIfExists(pk);
    if (canisterIds == []) {
      Debug.print("canister with principal=" # pk # " pk=" # pk # " does not exist");
    } else {
      // can choose to use this statusMap for to detect failures and prompt retries if desired
      let statusMap = await Admin.transferCyclesStopAndDeleteCanisters(canisterIds);
      pkToCanisterMap := CanisterMap.delete(pkToCanisterMap, pk);
    };
  };

  public shared ({ caller }) func upgradeStoryServiceCanistersByPK(serviceId : Text, wasmModule : Blob) : async Text {
    assert (caller == owner);

    let pk = serviceId;
    let scalingOptions = {
      autoScalingHook = autoScaleStoryServiceCanister;
      sizeLimit = #heapSize(475_000_000); // Scale out at 475MB
    };

    let result = await Admin.upgradeCanistersByPK(pkToCanisterMap, pk, wasmModule, scalingOptions);

    return "Canisters in PK " # pk # " upgraded";
  };

  // api for getting canisters relating to a PK
  public shared ({ caller = caller }) func getAllCanisterIdsByPK(pk : Text) : async [Text] {
    assert (caller == owner);
    switch (CanisterMap.get(pkToCanisterMap, pk)) {
      case null { [] };
      case (?canisterIdsBuffer) { Buffer.toArray(canisterIdsBuffer) };
    };
  };

  // test to check permissions
  public shared ({ caller }) func authTest() : async Text {
    assert (caller == owner);
    return "Passed";
  };

};
