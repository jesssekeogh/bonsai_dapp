import { startIndexClient } from "./client.js";

const get_cans = async () => {
  console.log("getting all user canisters...");
  const indexClient = await startIndexClient();

  let allCans = [];

  const pks = await indexClient.indexCanisterActor.getPKs();
  let i = 0;

  for (let pk of pks) {
    let cans = await indexClient.indexCanisterActor.getAllCanisterIdsByPK(pk);
    for (let singleCan of cans) {
      allCans.push(singleCan);
      i += 1;
    }
  }

  console.log(allCans);
  console.log(i.toString(), "Canisters in total")
};

get_cans();
