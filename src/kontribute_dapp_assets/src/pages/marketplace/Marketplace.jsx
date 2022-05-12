import React, { useState, useEffect } from "react";
import {
  Center,
  SimpleGrid,
  HStack,
  Flex,
  Spacer,
  Center,
  Heading,
  Container,
  useBreakpointValue,
  Divider,
  Text,
  Wrap,
} from "@chakra-ui/react";
import { SingleNft } from "../components";
import { LoadingSpinner } from "../../containers";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { AuthorFilter, PriceFilter, RarityFilter } from "../components/Filters";
import { useParams } from "react-router-dom";

const Marketplace = () => {
  const params = useParams();
  const [Loaded, setLoaded] = useState(false);
  const [tokensForSale, setTokensForSale] = useState([]);
  const [sortBy, setSort] = useState("0");
  const [collectionBy, setCollection] = useState("");

  const LoadSale = async () => {
    let forSale = [];
    let jsonData = await fetch(
      "https://nftpkg.com/api/v1/prices/" + params.author
    ).then((x) => x.json());

    for (var i = 0; i < jsonData.length; i++) {
      if (jsonData[i][2] > 0) {
        let saleObj = {
          id: jsonData[i][0],
          price: jsonData[i][2],
        };
        forSale.push(saleObj);
      }
    }

    setTokensForSale(forSale.slice(0, 10)); // for testing
    if (!Loaded) setLoaded(true);
  };

  console.log("hello");
  useEffect(() => {
    LoadSale();
  }, [params.author]);

  if (!Loaded) return <LoadingSpinner label="Loading Marketplace" />;
  return (
    <div>
      <MarketplaceHeader setSort={setSort} setCollection={setCollection} />
      <Center mt={3}>
        <SimpleGrid columns={[2, null, 4]} pb={5} gap={2} mx={2} maxW="1250px">
          {tokensForSale.map((item) => (
            <SingleNft
              tokenId={item.id}
              key={item.id}
              sort={sortBy}
              collection={collectionBy}
              isMarketplace={true}
            />
          ))}
        </SimpleGrid>
      </Center>
    </div>
  );
};

const MarketplaceHeader = ({ setSort, setCollection }) => {
  return (
    <Container maxWidth="1250px" mt={-8}>
      <Flex alignItems="center" gap="2">
        <Heading size={useBreakpointValue({ base: "xs", md: "lg" })}>
          <Wrap align={"center"}>
            <Text bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
              Kontribute{" "}
            </Text>
            <Text>Marketplace</Text>
          </Wrap>
        </Heading>
        <Spacer />
        <HStack>
          <AuthorFilter />
          <RarityFilter setSort={setSort} />
          <PriceFilter />
        </HStack>
      </Flex>
      <Divider my={1} borderColor="#16171b" />
    </Container>
  );
};
export default Marketplace;
