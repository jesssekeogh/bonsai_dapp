import { startIndexClient } from "./client.js";

const pk = "author_x4frj-bde26-i36op-k26wj-qsjhh-6tzic-pbvbk-2w5fp-ezivd-dtdoj-gqe"

const delete_pk = async () => {
  const indexClient = await startIndexClient();

  const del = await indexClient.indexCanisterActor.deleteServiceCanister(pk);
  console.log(del);
};

delete_pk();
