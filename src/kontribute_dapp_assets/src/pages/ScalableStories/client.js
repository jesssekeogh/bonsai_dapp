import { IndexClient } from "candb-client-typescript/dist/IndexClient";
import { ActorClient } from "candb-client-typescript/dist/ActorClient";

import { idlFactory as IndexCanisterIDL } from "../../../../declarations/index/index";
import { idlFactory as HelloServiceCanisterIDL } from "../../../../declarations/helloservice/index";

export const startIndexClient = () => {
  // canister ID of index canister:
  // this canister is on ic network
  const canisterId = "fxzyj-3yaaa-aaaai-qnocq-cai";
  const host = "https://ic0.app";

  return new IndexClient({
    IDL: IndexCanisterIDL,
    canisterId,
    agentOptions: {
      host,
    },
  });
};

export const startHelloServiceClient = (indexClient) => {
  const host = "https://ic0.app";

  return new ActorClient({
    actorOptions: {
      IDL: HelloServiceCanisterIDL,
      agentOptions: {
        host,
      },
    },
    indexClient,
  });
};
