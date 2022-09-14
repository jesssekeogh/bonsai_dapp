import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import {
  Center,
  SimpleGrid,
  Kbd,
  Text,
  HStack,
  Divider,
  Spacer,
  Container,
  Flex,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../../containers";
import InventoryStats from "./InventoryStats.jsx";
import { GetMine, Claim } from "../components";
import { SingleNft } from "../components";
import {
  CollectionFilter,
  RarityFilter,
  QuickView,
} from "../components/Filters";
import { useSelector } from "react-redux";

const Inventory = () => {
  let isMounted = true;
  const [sortedTokens, setTokens] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [sortBy, setSort] = useState(0);
  const [collectionBy, setCollection] = useState("");
  const anvilDispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);
  const quickView = useSelector((state) => state.Global.quickview);

  const fetchTokens = async () => {
    try {
      let tokens = await anvilDispatch(GetMine());
      if (isMounted) {
        setTokens(tokens);
        if (!Loaded) {
          setLoaded(true);
        }
      }
    } catch (e) {
      console.log("Error loading some NFTs");
    }
  };

  useEffect(() => {
    if (loaded) {
      fetchTokens(); // run once
      const interval = setInterval(() => {
        fetchTokens(); // then every 3 seconds
      }, 3000);
      return () => {
        clearInterval(interval);
        isMounted = false;
      };
    }
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    anvilDispatch(Claim());
  }, []);

  if (!Loaded) return <LoadingSpinner label="Fetching NFTs..." />;
  return (
    <>
      <InventoryStats totalnfts={sortedTokens.length} />
      <Container maxWidth="1250px" px={{ base: 3, md: 5, lg: 1 }} mt={1}>
        <Flex alignItems="center">
          <HStack width={["250px", null, "auto"]}>
            <CollectionFilter setCollection={setCollection} />
            <RarityFilter setSort={setSort} />
          </HStack>
          <Spacer />
          <QuickView />
        </Flex>
        <Divider my={1} borderColor="#16171b" />
      </Container>
      <Center mt={2}>
        {sortedTokens.length > 0 ? (
          <>
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              pb={5}
              gap={2}
              mx={2}
              maxW="1250px"
            >
              {sortedTokens.map((item) => (
                <SingleNft
                  tokenId={item}
                  key={item}
                  sort={sortBy}
                  collection={collectionBy}
                  isInventory={true}
                  quickView={quickView}
                />
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Kbd
            my={"195px"}
            border={"double"}
            borderRadius="lg"
            backgroundColor="#16171b"
          >
            <Text color="#f0e6d3">You have no NFTs here!😕</Text>
          </Kbd>
        )}
      </Center>
    </>
  );
};

export default Inventory;
