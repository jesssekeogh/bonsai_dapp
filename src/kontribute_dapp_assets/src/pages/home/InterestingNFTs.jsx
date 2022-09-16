import React from "react";
import { SimpleGrid, Center, Heading } from "@chakra-ui/react";
import SingleNft from "../components/SingleNft";
import { tokenFromText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";

const InterestingNFTs = () => {
  return (
    <>
      <Center pb={5} pt={20}>
        <Heading
          fontWeight={"bold"}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
        >
          Unique NFTs
        </Heading>
      </Center>
      <Center mt={1}>
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 4 }}
          pb={5}
          gap={2}
          mx={2}
          maxW="1250px"
        >
          <SingleNft tokenId={tokenFromText("nftabs9l1cqmz52neylx")} />
          <SingleNft tokenId={tokenFromText("nfta7ns5uf7gkvkw412t")} />
          <SingleNft tokenId={tokenFromText("nfta3t6uqthxajm1d23r")} />
          <SingleNft tokenId={tokenFromText("nfta3p5rltyh80twqune")} />
        </SimpleGrid>
      </Center>
    </>
  );
};

export default InterestingNFTs;
