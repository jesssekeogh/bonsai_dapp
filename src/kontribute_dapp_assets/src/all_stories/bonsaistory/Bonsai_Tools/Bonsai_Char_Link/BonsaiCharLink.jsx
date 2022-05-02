import React, { useState, useEffect } from "react";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import "../../BonsaiStory.css";
import { Link } from "react-router-dom";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import "../../../../../assets/main.css";
import { Tooltip } from "@chakra-ui/react";

// use component like this <BonsaiCharLink name="Dragonshield"/>

const urlAuthor = // api for author address
  "https://nftpkg.com/api/v1/author/a001c89f603f36aa5cba0d7f5f6ca9be2298c9e5f8309e2155767752916ef418"; //change to minter address

const BonsaiCharLink = ({ name, link }) => {
  const map = useAnvilSelector((state) => state.user.map);
  const [tokenId, setId] = useState();
  const [Loaded, setLoaded] = useState(false);

  const load = async () => {
    const resp = await fetch(urlAuthor).then((x) => x.json());

    for (var i = 0; i < resp.length; i++) {
      if (resp[i][2] == name) {
        setId(resp[i][0]);
        console.log("id", resp[i][0]);
        break;
      }
    }

    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      {Loaded ? (
        <Tooltip label="View NFT">
          <Link
            to={"/nft/" + tokenToText(tokenId)}
            state={{ prev: link, showConfetti: false, totalNfts: 1 }}
          >
            <u className="char__link">{name}</u>
          </Link>
        </Tooltip>
      ) : null}
    </>
  );
};

export default BonsaiCharLink;
