import React, { useState } from "react";
import { Center, Box, Button } from "@chakra-ui/react";
import { nft_fetch, useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";

const MINTINGADDRESS = "";

const Snapshot = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useAnvilDispatch();

  const [nftsChecked, setNftsChecked] = useState(0);

  const load = async () => {
    setLoading(true);
    const ids = [];
    const bearers = [];
    const bearerCounts = {};

    try {
      const meta = await fetch(
        `https://nftpkg.com/api/v1/author/${MINTINGADDRESS}`
      ).then((x) => x.json());

      for (let nft of meta) {
        ids.push(tokenToText(nft[0]));
      }
    } catch (e) {
      setLoading(false);
      return setNftsChecked("Failed to fetch");
    }

    let amount = 0;
    for (let token of ids) {
      const { bearer } = await dispatch(nft_fetch(token));
      bearers.push(bearer);
      amount += 1;
      setNftsChecked(amount);
    }

    bearers.forEach((address) => {
      bearerCounts[address] = (bearerCounts[address] || 0) + 1;
    });

    console.log(bearerCounts);

    setLoading(false);
  };

  return (
    <Box>
      <Center my={10}>
        <Button isLoading={loading} onClick={() => load()}>
          Load
        </Button>
      </Center>
      <Center>
        <Box>Checked:{nftsChecked}</Box>
      </Center>
    </Box>
  );
};

export default Snapshot;
