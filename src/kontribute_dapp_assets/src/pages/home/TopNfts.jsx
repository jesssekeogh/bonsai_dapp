import React from "react";
import { SingleNft } from "../components/index";
import { Heading, Box, Center, SimpleGrid } from "@chakra-ui/react";
import { tokenFromText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { motion, AnimatePresence } from "framer-motion";

const TopNfts = () => {
  // user a courasal to scroll through NFTs - open sea inspo
  const NftsShowing = [
    "nfta9y6vuk5fvxq0r0y9",
    "nftaa2c9u1ta3d2l6g7s",
    "nfta434fle9wygsea4qv",
    "nfta9ujhl9244c45chva",
  ];

  return (
    <Box mt={{ base: 5, md: 10 }}>
      <Center pb={3}>
        <Heading fontSize={{ base: "xl", lg: "3xl" }}>
          Collectible spotlight
        </Heading>
      </Center>
      <Center marginTop="5">
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 4 }}
          pb={5}
          gap={{ base: 3, md: 5 }}
          maxW="1250px"
        >
          {NftsShowing.map((item) => (
            <SingleNft tokenId={tokenFromText(item)} isMarketplace={false} key={item} />
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default TopNfts;
