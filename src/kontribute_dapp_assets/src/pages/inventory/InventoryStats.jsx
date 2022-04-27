import React, { useState, useEffect } from "react";
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Center,
  Button,
  useClipboard,
  Text,
} from "@chakra-ui/react";
import {
  useAnvilSelector,
  useAnvilDispatch,
} from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { GetMine } from "../components";

const InventoryStats = ({totalnfts}) => {
  const dispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);

  const [totalselling, setTotal] = useState([]);

  const urlAuthorPrices =
    "https://nftpkg.com/api/v1/prices/a001c89f603f36aa5cba0d7f5f6ca9be2298c9e5f8309e2155767752916ef418";

  const load = async () => {
    let arrayOfTokens = [];
    let loadedData = await dispatch(GetMine());
    // setData([394609]);

    let resp = await fetch(urlAuthorPrices).then((x) => x.json());

    for (var i = 0; i < resp.length; i++) {
      //checks which are for sale
      if (resp[i][2] > 0) {
        let tokenId = resp[i][0];
        arrayOfTokens.push(tokenId);
      }
    }
    let Owned = [];

    for (var i = 0; i < arrayOfTokens.length; i++) {
      if (loadedData.includes(arrayOfTokens[i])) {
        Owned.push(arrayOfTokens[i]);
      }
    }

    setTotal(Owned.length);
  };

  useEffect(() => {
    if (loaded) {
      load();
    }
  },[]);

  return (
    <div>
      <BasicStatistics nftsTotal={totalnfts} selling={totalselling} />
    </div>
  );
};

export default InventoryStats;

function StatsCard({ title, stat }) {
  return (
    <Stat
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={useColorModeValue("gray.800", "gray.500")}
      rounded={"lg"}
    >
      <StatLabel
        fontWeight={"bold"}
        as="kbd"
        bgGradient="linear(to-l, #ed1f79, #2dade2)"
        bgClip="text"
        isTruncated
      >
        {title}
      </StatLabel>
      <br />
      <StatNumber
        fontSize={"2xl"}
        fontWeight={"medium"}
        as="kbd"
        bgGradient="linear(to-r, #ed1f79, #f15b25)"
        bgClip="text"
      >
        {stat}
      </StatNumber>
    </Stat>
  );
}

function BasicStatistics({ nftsTotal, selling }) {
  const address = useAnvilSelector((state) => state.user.address); // Retrieve NFT Anvil ICP address
  const user_icp = AccountIdentifier.e8sToIcp(
    useAnvilSelector((state) => state.user.icp) // Retrieve NFT Anvil Address ICP Balance
  );

  const { hasCopied, onCopy } = useClipboard(address);

  return (
    <Box
      maxW="7xl"
      mx={"auto"}
      py={{ base: 0, sm: null, md: 5 }}
      mt={{ base: -8, sm: null, md: -10 }}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <Center
        mb={2}
        shadow={"xl"}
        border={"1px solid"}
        borderColor={useColorModeValue("gray.800", "gray.500")}
        rounded={"lg"}
        p={2}
      >
        <chakra.h1
          textAlign={"center"}
          fontSize={{ base: "lg", sm: "2xl", md: "4xl" }}
          fontWeight={"bold"}
          py={{ base: 1, sm: null, md: 2 }}
          as="kbd"
          bgGradient="linear(to-l, #ed1f79, #2dade2)"
          bgClip="text"
        >
          {address
            ? address.substring(0, 10) + "......" + address.substring(56, 64)
            : null}
        </chakra.h1>
        <Button
          size={"sm"}
          onClick={onCopy}
          ml={2}
          colorScheme="#282828"
          bg="#282828"
          rounded={"full"}
        >
          <Text as="kbd">{hasCopied ? "Copied" : "Copy"}</Text>
        </Button>
      </Center>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard title={"ICP Balance"} stat={user_icp} />
        <StatsCard title={"NFTs Owned"} stat={nftsTotal} />
        <StatsCard title={"NFTs Listed for Sale"} stat={selling} />
      </SimpleGrid>
    </Box>
  );
}
