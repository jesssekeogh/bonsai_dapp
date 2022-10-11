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

import StoryService "./StoryService";
import VotingService "./VotingService";


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

  // Partition HelloService canisters by the region passed in
  public shared ({ caller = creator }) func createStoryServiceCanisterParitition(serviceId : Text) : async ?Text {
    let pk = serviceId;
    let canisterIds = getCanisterIdsIfExists(pk);

    if (canisterIds == []) {
      ?(await createStoryServiceCanister(pk, ?[owner, Principal.fromActor(this)]));
      // already exists
    } else {
      Debug.print(pk # " already exists, not creating and returning null");
      null;
    };
  };

  // Spins up a new HelloService canister with the provided pk and controllers
  func createStoryServiceCanister(pk : Text, controllers : ?[Principal]) : async Text {
    Debug.print("creating new story service canister with pk=" # pk);
    // Pre-load 300 billion cycles for the creation of a new Hello Service canister
    // Note that canister creation costs 100 billion cycles, meaning there are 200 billion
    // left over for the new canister when it is created
    Cycles.add(300_000_000_000);
    let newStoryServiceCanister = await StoryService.StoryService({
      partitionKey = pk;
      scalingOptions = {
        autoScalingHook = autoScaleStoryServiceCanister;
        sizeLimit = #heapSize(200_000_000); // Scale out at 200MB
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
    // After creating the new Hello Service canister, add it to the pkToCanisterMap
    pkToCanisterMap := CanisterMap.add(pkToCanisterMap, pk, newStoryServiceCanisterId);

    Debug.print("new story service canisterId=" # newStoryServiceCanisterId);
    newStoryServiceCanisterId;
  };

  /*
    API for voting service:
  */

  public shared ({ caller = caller }) func autoScaleVotingServiceCanister(pk : Text) : async Text {
    if (Utils.callingCanisterOwnsPK(caller, pkToCanisterMap, pk)) {
      Debug.print("creating an additional canister for pk=" # pk);
      await createVotingServiceCanister(pk, ?[owner, Principal.fromActor(this)]);
    } else {
      throw Error.reject("not authorized");
    };
  };

  public shared ({ caller = creator }) func createVotingServiceCanisterParitition(serviceId : Text) : async ?Text {
    let pk = serviceId;
    let canisterIds = getCanisterIdsIfExists(pk);

    if (canisterIds == []) {
      ?(await createVotingServiceCanister(pk, ?[owner, Principal.fromActor(this)]));
    } else {
      Debug.print(pk # " already exists, not creating and returning null");
      null;
    };
  };

  func createVotingServiceCanister(pk : Text, controllers : ?[Principal]) : async Text {
    Debug.print("creating new voting service canister with pk=" # pk);
    Cycles.add(300_000_000_000);
    let newVotingServiceCanister = await VotingService.VotingService({
      partitionKey = pk;
      scalingOptions = {
        autoScalingHook = autoScaleVotingServiceCanister;
        sizeLimit = #heapSize(200_000_000);
      };
      owners = controllers;
    });
    let newVotingServiceCanisterPrincipal = Principal.fromActor(newVotingServiceCanister);
    await CA.updateCanisterSettings({
      canisterId = newVotingServiceCanisterPrincipal;
      settings = {
        controllers = controllers;
        compute_allocation = ?0;
        memory_allocation = ?0;
        freezing_threshold = ?2592000;
      };
    });

    let newVotingServiceCanisterId = Principal.toText(newVotingServiceCanisterPrincipal);
    pkToCanisterMap := CanisterMap.add(pkToCanisterMap, pk, newVotingServiceCanisterId);

    Debug.print("new voting service canisterId=" # newVotingServiceCanisterId);
    newVotingServiceCanisterId;
  };

  /*
    Util functions:
  */

  public shared ({ caller }) func deleteServiceCanister(serviceId : Text) : async () {
    // assert(caller == owner);

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
    // assert(caller == owner);

    let pk = serviceId;
    let scalingOptions = {
      autoScalingHook = autoScaleStoryServiceCanister;
      sizeLimit = #heapSize(200_000_000); // Scale out at 200MB
    };

    let result = await Admin.upgradeCanistersByPK(pkToCanisterMap, pk, wasmModule, scalingOptions);

    return "Canisters in PK " # pk # " upgraded";
  };

  public shared ({ caller }) func upgradeVotingServiceCanistersByPK(serviceId : Text, wasmModule : Blob) : async Text {
    // assert(caller == owner);

    let pk = serviceId;
    let scalingOptions = {
      autoScalingHook = autoScaleVotingServiceCanister;
      sizeLimit = #heapSize(200_000_000); // Scale out at 200MB
    };

    let result = await Admin.upgradeCanistersByPK(pkToCanisterMap, pk, wasmModule, scalingOptions);

    return "Canisters in PK " # pk # " upgraded";
  };

};
