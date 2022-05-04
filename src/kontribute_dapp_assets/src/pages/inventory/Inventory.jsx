import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import { Center, SimpleGrid, Kbd, Text } from "@chakra-ui/react";
import { LoadingSpinner } from "../../containers";
import InventoryStats from "./InventoryStats.jsx";
import { GetMine, Claim } from "../components";
import { SingleNft } from "../components";

const Inventory = () => {
  let isMounted = true;
  const [data, setData] = useState([]);
  const dispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);

  const [Loaded, setLoaded] = useState(false);

  const load = async () => {
    let fetch = await dispatch(GetMine());
    if (isMounted) {
      setData(fetch);
      setLoaded(true);
    }
  };

  useEffect(() => {
    try {
      dispatch(Claim());
    } catch (e) {
      console.log("Error claiming NFT");
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      load();
    }
    return () => {
      isMounted = false;
    };
  });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!Loaded) return <LoadingSpinner />;
  return (
    <>
      <InventoryStats totalnfts={data.length} />
      <Center>
        {data.length > 0 ? (
          <SimpleGrid columns={[2, null, 4]} pb={5} gap={2} m={2} maxW="1250px">
            {data.map((item) => (
              <SingleNft tokenId={item} key={item} inventory={true} />
            ))}
          </SimpleGrid>
        ) : (
          <Kbd
            mt={10}
            border={"double"}
            borderRadius="lg"
            backgroundColor="#16171b"
          >
            <Text color="#f0e6d3">Your inventory is empty!😱</Text>
          </Kbd>
        )}
      </Center>
    </>
  );
};

export default Inventory;
