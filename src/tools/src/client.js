import { IndexClient } from "candb-client-typescript/dist/IndexClient.js";
import { idlFactory } from "../declarations/index/index.js";
import { AnonymousIdentity } from "@dfinity/agent";

export const startIndexClient = async () => {
  // canister ID of index canister:
  // this canister is on ic network

  let identity = new AnonymousIdentity;
  
  const canisterId = "fxzyj-3yaaa-aaaai-qnocq-cai";
  const host = "https://ic0.app";

  return new IndexClient({
    IDL: idlFactory,
    canisterId,
    agentOptions: {
      identity,
      host,
    },
  });

};
