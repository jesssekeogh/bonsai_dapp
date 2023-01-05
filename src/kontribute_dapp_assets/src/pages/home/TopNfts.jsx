import React from "react";
import { SingleNft } from "../components/index";
import { Heading, Box, Center, SimpleGrid } from "@chakra-ui/react";
import { tokenFromText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";

const TopNfts = () => {
  // user a courasal to scroll through NFTs - open sea inspo
  const NftsShowing = [
    "nfta4lm6ytn89lr9spca",
    "nfta5ysu1smhpk1n168d",
    "nfta4x66f414jc8u5zv6",
    "nftabs9l1cqmz52neylx",
  ];
  return (
    <Box mt={{ base: 5, md: 10 }}>
      <Center pb={3}>
        <Heading fontSize={{ base: "xl", lg: "3xl" }}>
          Over 20,000 NFTs minted
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
            <SingleNft
              tokenId={tokenFromText(item)}
              key={item}
              isMarketplace={false}
            />
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default TopNfts;
