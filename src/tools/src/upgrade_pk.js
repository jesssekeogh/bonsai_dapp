import { loadWasm } from "candb-client-typescript/dist/ClientUtil.js";
import { startIndexClient } from "./client.js";
import { homedir } from "os";

const testPK = "ntohy-uex3p-ricj3-dhz7a-enmvo-szydx-l77yh-kftxf-h25x3-j6feg-2ae" // local user PK

const upgrade_pk = async () => {
  const indexClient = await startIndexClient();

  // we need to `dfx build userservice` canister to get latest local wasm to deploy
  // we comment out the last line in userservice index.js

  let userServiceWasmPath = `${homedir}/Desktop/Kontribute Resources/kontribute_dapp/.dfx/local/canisters/userservice/userservice.wasm`
  let wasm = loadWasm(userServiceWasmPath)
  
  // pass into backend
  const result = await indexClient.indexCanisterActor.upgradeUserCanistersByPK(testPK, wasm)
  console.log(result)
};

upgrade_pk()