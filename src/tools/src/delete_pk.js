import { startIndexClient } from "./client";

const testPK = "ntohy-uex3p-ricj3-dhz7a-enmvo-szydx-l77yh-kftxf-h25x3-j6feg-2ae"

const delete_pk = async () => {
  const indexClient = await startIndexClient();

  const del = await indexClient.indexCanisterActor.deleteUserServiceCanister(testPK);
  console.log(del);
};

delete_pk();
