const GetAuthorsSelling = async (address) => {
  try {
    let forSale = [];

    const prices = await fetch(
      "https://nftpkg.com/api/v1/prices/" + address
    ).then((x) => x.json());
    
    for (let nft of prices.sort((a, b) => a[2] - b[2])) {
      if (nft[2] > 0) {
        forSale.push(nft[0]);
      }
      if (forSale.length > 3) {
        break;
      }
    }

    return forSale;
  } catch (e) {
    return [];
  }
};

export default GetAuthorsSelling;
