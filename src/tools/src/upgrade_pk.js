import { loadWasm } from "candb-client-typescript/dist/ClientUtil.js";
import { startIndexClient } from "./client.js";
import { homedir } from "os";

const upgrade_pk = async () => {
  const indexClient =  await startIndexClient();

  // we need to `dfx build userservice` canister to get latest local wasm to deploy
  // we comment out the last line in userservice index.js

  let userServiceWasmPath = `${homedir}/Desktop/Kontribute Resources/kontribute_dapp/.dfx/local/canisters/storyservice/storyservice.wasm`
  let wasm = loadWasm(userServiceWasmPath) // need to build wasm

  const pks = await indexClient.indexCanisterActor.getPKs()

  for(let pk of pks){
    let res = await indexClient.indexCanisterActor.upgradeStoryServiceCanistersByPK(pk, wasm)
    console.log("done", res)
  }

  // // pass into backend
  // const result = await indexClient.indexCanisterActor.upgradeUserCanistersByPK(testPK, wasm)
  // console.log(result)
};

upgrade_pk()