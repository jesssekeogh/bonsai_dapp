export const greetUser = async (helloServiceClient, region, name) => {
  let pk = `region#${region}`;

  let userGreetingQueryResults = await helloServiceClient.query(pk, (actor) =>
    actor.greetUser(name)
  );

  for (let settledResult of userGreetingQueryResults) {
    // handle settled result if fulfilled
    if (
      settledResult.status === "fulfilled" &&
      settledResult.value.length > 0
    ) {
      // handle candid returned optional type (string[] or string)
      return Array.isArray(settledResult.value)
        ? settledResult.value[0]
        : settledResult.value;
    }
  }

  return "User does not exist";
};

export const putUser = async (helloServiceClient, region, name, zipCode) => {
  let pk = `region#${region}`;

  let sk = name;

  await helloServiceClient.update(pk, sk, (actor) =>
    actor.putUser(sk, zipCode)
  );
};
