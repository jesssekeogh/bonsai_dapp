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

export const unwrapProposal = (data) => {
  for (let settledResult of data) {
    // handle settled result if fulfilled
    if (settledResult.status === "fulfilled" && "ok" in settledResult.value) {
      return Array.isArray(settledResult.value.ok)
        ? settledResult.value.ok[0]
        : settledResult.value.ok;
    }
  }
};
