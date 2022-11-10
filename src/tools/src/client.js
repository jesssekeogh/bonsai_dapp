import { IndexClient } from "candb-client-typescript/dist/IndexClient.js";
import { idlFactory } from "../declarations/index/index.js";
import { AnonymousIdentity } from "@dfinity/agent";
import { identityFromPemFile } from "candb-client-typescript/dist/ClientUtil.js";
import { homedir } from "os";

export const startIndexClient = async () => {
  // let identity = new AnonymousIdentity;

  const identity = await identityFromPemFile(
    `${homedir}/.config/dfx/identity/default/identity.pem`
  );

  const canisterId = "fxzyj-3yaaa-aaaai-qnocq-cai";
  const host = "https://ic0.app";

  return new IndexClient({
    IDL: idlFactory, //last line of index.js is commented out
    canisterId,
    agentOptions: {
      identity,
      host,
    },
  });
};
