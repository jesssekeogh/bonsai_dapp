export const unwrapStory = (data) => {
  for (let settledResult of data) {
    // handle settled result if fulfilled
    if (
      settledResult.status === "fulfilled" &&
      settledResult.value.length > 0
    ) {
      return Array.isArray(settledResult.value)
        ? settledResult.value[0]
        : settledResult.value;
    }
  }
};

export const unwrapAllProposals = (data) => {
  let allUnwrapped = [];

  for (let settledResult of data) {
    // handle settled result if fulfilled
    if (settledResult.status === "fulfilled" && "ok" in settledResult.value) {
      if (Array.isArray(settledResult.value.ok))
        for (let val of settledResult.value.ok) {
          allUnwrapped.push(val[0]);
        }
      return allUnwrapped;
    }
  }
};
