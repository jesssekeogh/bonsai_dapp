import { startIndexClient } from "./client.js";

const testPK = "user_ntohy-uex3p-ricj3-dhz7a-enmvo-szydx-l77yh-kftxf-h25x3-j6feg-2ae"

const delete_pk = async () => {
  const indexClient = await startIndexClient();

  const del = await indexClient.indexCanisterActor.deleteServiceCanister(testPK);
  console.log(del);
};

delete_pk();
