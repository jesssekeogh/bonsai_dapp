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
  Stack,
  Button,
} from "@chakra-ui/react";
import { SingleNft } from "../components";
import { LoadingSpinner } from "../../containers";
import { AuthorFilter, PriceFilter, RarityFilter } from "../components/Filters";
import { useParams } from "react-router-dom";

const Marketplace = () => {
  const params = useParams();
  const [Loaded, setLoaded] = useState(false);
  const [tokensForSale, setTokensForSale] = useState([]);
  const [sortBy, setSort] = useState("0");
  const [page, setPage] = useState(0);
  const [pricing, setPricing] = useState("LtoH");
  const [author, setAuthor] = useState({});

  // author fetch - only runs if author changes
  const fetchAuthorData = async () => {
    setLoaded(false);
    
    let meta = await fetch(
      "https://nftpkg.com/api/v1/author/" + params.author
    ).then((x) => x.json());

    let prices = await fetch(
      "https://nftpkg.com/api/v1/prices/" + params.author
    ).then((x) => x.json());

    setAuthor({ meta: meta, prices: prices });
    setLoaded(true);
  };

  // helper function for sorting rarities
  const sortRarity = async (allTokens, rarity) => {
    let rarityFiltered = [];
    for (let i = 0; i < author.meta.length; i++) {
      if (author.meta[i][1] === Number(rarity)) {
        rarityFiltered.push(author.meta[i][0]);
      }
    }
    let filtered = [];
    for (let i = 0; i < allTokens.length; i++) {
      if (rarityFiltered.includes(allTokens[i])) {
        filtered.push(allTokens[i]);
      }
    }
    return filtered;
  };

  // sort nfts accordingly - prices are retrieved from NFT meta data
  const LoadSale = async () => {
    if (Loaded) {
      let forSale = [];

      let prices = author.prices;

      if (pricing === "LtoH") {
        prices.sort((a, b) => a[2] - b[2]);
      } else {
        prices.sort((a, b) => b[2] - a[2]);
      }

      for (let i = 0; i < prices.length; i++) {
        if (prices[i][2] > 0) {
          forSale.push(prices[i][0]);
        }
      }
      if (sortBy === "0") {
        setTokensForSale(forSale.slice(page * 12, (page + 1) * 12));
      } else {
        let filtered = await sortRarity(forSale, sortBy);
        setTokensForSale(filtered.slice(page * 12, (page + 1) * 12));
      }
    }
  };

  useEffect(() => {
    LoadSale();
  }, [page, sortBy, pricing, Loaded]);

  useEffect(() => {
    fetchAuthorData();
  }, [params.author]);

  return (
    <div>
      <MarketplaceHeader
        setSort={setSort}
        setPage={setPage}
        setPricing={setPricing}
      />
      {Loaded ? (
        <>
          <Center my={2}>
            <PaginationButtons
              setPage={setPage}
              page={page}
              tokensLength={tokensForSale.length}
            />
          </Center>
          <Center mt={1}>
            <SimpleGrid
              columns={[2, null, 4]}
              pb={5}
              gap={2}
              mx={2}
              maxW="1250px"
            >
              {tokensForSale.map((item) => (
                <SingleNft
                  tokenId={item}
                  key={item}
                  sort={"0"}
                  collection={""}
                  selling={"all"}
                  isMarketplace={true}
                />
              ))}
            </SimpleGrid>
          </Center>
          <Center mb={2} mt={-2}>
            <PaginationButtons
              setPage={setPage}
              page={page}
              tokensLength={tokensForSale.length}
            />
          </Center>
        </>
      ) : (
        <LoadingSpinner label="Loading Marketplace" />
      )}
    </div>
  );
};

const MarketplaceHeader = ({ setSort, setPage, setPricing }) => {
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
          <RarityFilter setSort={setSort} setPage={setPage} />
          <PriceFilter setPricing={setPricing} setPage={setPage} />
        </HStack>
      </Flex>
      <Divider my={1} borderColor="#16171b" />
    </Container>
  );
};
export default Marketplace;

const PaginationButtons = ({ setPage, page, tokensLength }) => {
  return (
    <Stack
      direction={"row"}
      spacing={3}
      align={"center"}
      alignSelf={"center"}
      position={"relative"}
    >
      <Button
        size="xs"
        colorScheme="#282828"
        bg="#282828"
        rounded={"full"}
        px={6}
        _hover={{ opacity: "0.8" }}
        isDisabled={page === 0}
        onClick={() => {
          setPage(page - 1);
        }}
      >
        Prev Page
      </Button>
      <Button
        size="xs"
        colorScheme="#282828"
        bg="#282828"
        rounded={"full"}
        px={6}
        _hover={{ opacity: "0.8" }}
        isDisabled={tokensLength < 8}
        onClick={() => {
          setPage(page + 1);
        }}
      >
        Next Page
      </Button>
    </Stack>
  );
};
