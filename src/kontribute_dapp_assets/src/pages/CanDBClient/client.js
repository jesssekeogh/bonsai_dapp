import { IndexClient } from "candb-client-typescript/dist/IndexClient";
import { ActorClient } from "candb-client-typescript/dist/ActorClient";

import { idlFactory as IndexCanisterIDL } from "../../../../declarations/index/index";
import { idlFactory as UserServiceCanisterIDL } from "../../../../declarations/storyservice/index";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";

export const startIndexClient = () => {
  // canister ID of index canister:
  // this canister is on ic network
  const canisterId = process.env.REACT_APP_INDEX_CANISTER_ID;

  return new IndexClient({
    IDL: IndexCanisterIDL,
    canisterId,
    agentOptions: authentication.getAgentOptions(),
  });
};

export const startStoryServiceClient = (indexClient) => {
  return new ActorClient({
    actorOptions: {
      IDL: UserServiceCanisterIDL,
      agentOptions: authentication.getAgentOptions(),
    },
    indexClient,
  });
};
