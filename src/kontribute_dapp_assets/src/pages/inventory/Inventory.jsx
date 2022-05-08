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
  Select,
  HStack,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../../containers";
import InventoryStats from "./InventoryStats.jsx";
import { GetMine, Claim } from "../components";
import { SingleNft } from "../components";
import { FailedToast } from "../../containers/toasts/Toasts";

const Inventory = () => {
  let isMounted = true;
  const [sortedTokens, setTokens] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [sortBy, setSort] = useState("0");
  const dispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);

  const fetchTokens = async () => {
    try {
      let tokens = await dispatch(GetMine());
      if (isMounted) {
        setTokens(tokens);
        if (!Loaded) {
          setLoaded(true);
        }
      }
    } catch (e) {
      FailedToast("Failed", "Error loading some NFTs, please try again");
    }
  };

  useEffect(() => {
    if (loaded) {
      fetchTokens();
    }
    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(Claim());
  }, []);

  if (!Loaded) return <LoadingSpinner label="Fetching NFTs..." />;
  return (
    <>
      <InventoryStats totalnfts={sortedTokens.length} />
      <Center>
        <HStack>
          <Select
            size="sm"
            border={"double"}
            borderRadius="lg"
            backgroundColor="#16171b"
            borderColor="#16171b"
            color="#f0e6d3"
            my={2}
            maxW={["100px", null, "150px"]}
            fontSize={["7pt", null, "md"]}
            onChange={(e) => {
              setSort(e.target.value);
            }}
          >
            <option value={0}>All</option>
            <option value={1}>Common</option>
            <option value={2}>Uncommon</option>
            <option value={3}>Rare</option>
            <option value={4}>Epic</option>
            <option value={5}>Legendary</option>
            <option value={6}>Artifact</option>
          </Select>
        </HStack>
      </Center>
      <Center>
        {sortedTokens.length > 0 ? (
          <>
            <SimpleGrid
              columns={[2, null, 4]}
              pb={5}
              gap={2}
              mx={2}
              maxW="1250px"
            >
              {sortedTokens.map((item) => (
                <SingleNft tokenId={item} key={item} sort={sortBy} />
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
