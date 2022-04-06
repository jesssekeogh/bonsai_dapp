import React, { useEffect, useState } from "react";
import { Box, Heading } from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { tokenUrl } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { LoadingSpinner } from "../../../containers";

// query all nfts from author that have a price listed

const urlAuthor = // api for author address
  "https://nftpkg.com/api/v1/author/a00dcee3d64e4daaa34ebfa7b95fba5f095e234d32a4770958e3f8e8818cafe1"; //change to minter address

const urlAuthorPrices =
  "https://nftpkg.com/api/v1/prices/a00dcee3d64e4daaa34ebfa7b95fba5f095e234d32a4770958e3f8e8818cafe1"; // change to minter address

const CommunityNft = () => {
  const [iDs, setIds] = useState([]);
  const [loaded, setLoaded] = useState(false); // allow loading of tokens before rendering

  const [loadedTokens, setTokens] = useState();

  const loadData = async () => {
    let arrayOfTokens = [];
    let respInfo = [];
    let respPrice = [];
    await Promise.all([
      (async () => {
        const resp = await fetch(urlAuthor).then((x) => x.json());
        respInfo = resp;
      })(),
      (async () => {
        const resp1 = await fetch(urlAuthorPrices).then((x) => x.json());
        respPrice = resp1;
      })(),
    ]);

    for (var i = 0; i < respPrice.length; i++) {
      if (respPrice[i][2] !== null) {
        let tokenId = respPrice[i][0];
        arrayOfTokens.push(tokenId);
      }
    }
    setTokens(arrayOfTokens); //set tokens to state for mapping
  };

  useEffect(async () => {
    await loadData().then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return <LoadingSpinner />;
  }
  return (
    <div>
      {loadedTokens.map((token) => (
        <SingleNFT imgsrc={token} key={token} />
      ))}
    </div>
  );
};

const SingleNFT = ({ imgsrc }) => {
  const map = useAnvilSelector((state) => state.user.map); //anvil mapper

  return <img src={tokenUrl(map.space, imgsrc, "thumb")}></img>;
};

export default CommunityNft;
