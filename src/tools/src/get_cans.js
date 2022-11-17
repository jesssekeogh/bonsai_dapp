import { startIndexClient } from "./client.js";

const get_cans = async () => {
  console.log("getting all user canisters...");
  const indexClient = await startIndexClient();

  let allCans = [];

  const pks = await indexClient.indexCanisterActor.getPKs();

  for (let pk of pks) {
    let cans = await indexClient.indexCanisterActor.getAllCanisterIdsByPK(pk);
    for (let singleCan of cans) {
      allCans.push(singleCan);
    }
  }

  console.log(allCans);
};

get_cans();
