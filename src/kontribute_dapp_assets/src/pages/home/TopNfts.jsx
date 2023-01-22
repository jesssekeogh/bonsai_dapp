import React, { useState, useEffect } from "react";
import { SingleNft } from "../components/index";
import {
  Heading,
  Box,
  Center,
  SimpleGrid,
  Flex,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const MINTERADDRESS =
  "a007d0f435865a7ff5ad5ad2251b04005a569778e55613e0482ea421a36ced4e";

const TopNfts = () => {
  const [tokens, setTokens] = useState([]);

  const loadSelling = async () => {
    let forSale = [];
    const prices = await fetch(
      "https://nftpkg.com/api/v1/prices/" + MINTERADDRESS
    ).then((x) => x.json());

    for (let nft of prices.sort((a, b) => a[2] - b[2])) {
      if (nft[2] > 0) {
        forSale.push(nft[0]);
      }

      if (forSale.length > 3) {
        break;
      }
    }

    setTokens(forSale);
  };

  useEffect(() => {
    loadSelling();
  }, []);

  return (
    <Box mt={{ base: 7, md: 10 }}>
      <Center pb={3}>
        <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
          Collectible spotlight
        </Heading>
      </Center>
      <Center marginTop="5">
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 4 }}
          pb={3}
          gap={{ base: 3, md: 6 }}
          maxW="1200px"
        >
          {tokens.map((item) => (
            <SingleNft tokenId={item} isMarketplace={false} key={item} />
          ))}
        </SimpleGrid>
      </Center>
      <Box align="center">
        <Flex align="center" maxW="1200px">
          <Spacer />
          <NavLink to={`/marketplace/${MINTERADDRESS}`}>
            <Text as="u">
              View all
              <ArrowForwardIcon mx={2} />
            </Text>
          </NavLink>
        </Flex>
      </Box>
    </Box>
  );
};

export default TopNfts;
