import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { tokenUrl } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";

// will need to send minted NFTs to Anvil and list for sale there
const UniqueNft = () => {
  let urlAuthor = // api for author address
    "https://nftpkg.com/api/v1/author/a00dcee3d64e4daaa34ebfa7b95fba5f095e234d32a4770958e3f8e8818cafe1"; //change to minter address

  let urlAuthorPrices =
    "https://nftpkg.com/api/v1/prices/a00dcee3d64e4daaa34ebfa7b95fba5f095e234d32a4770958e3f8e8818cafe1"; // change to minter address

  let nftname = useParams();
  const [nftInfo, setNftinfo] = useState();
  const [nftPrice, setNftprice] = useState(); // price data - can filter by "available for sale" or sold

  const [img, setImg] = useState();
  const map = useAnvilSelector((state) => state.user.map); //anvil mapper
  const nftArray = []; // for the ids of that character -- set as state fro the component and map it

  const load = async () => {
    let respInfo = [];
    let respPrice = [];
    await Promise.all([
      (async () => {
        const resp = await fetch(urlAuthor).then((x) => x.json());
        setNftinfo(resp);
        respInfo = resp;
      })(),
      async () => {
        const resp = await fetch(urlAuthorPrices).then((x) => x.json());
        setNftprice(resp);
        respPrice = resp;
      },
    ]);

    // find the data + imgs of NFTs
    for (var i = 0; i < respInfo.length; i++) {
      if (respInfo[i][2] === nftname.nftname) {
        setImg(tokenUrl(map.space, respInfo[i][0], "thumb"));
        nftArray.push(respInfo[i]); // add all the chars of the name to array
      }
    }
  };

  useEffect(() => {
    load().then(console.log(nftArray));
  }, []);

  return (
    <div>
      {nftname.nftname}
      {nftInfo}
      <img src={img} />
    </div>
  );
};

export default UniqueNft;
