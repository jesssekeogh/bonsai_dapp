import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import { Center, SimpleGrid } from "@chakra-ui/react";
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
    let fetch = await dispatch(GetMine())
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
        <SimpleGrid columns={[2, null, 4]} pb={5} gap={2} m={2} maxW="1250px">
          {data.map((item) => (
            <SingleNft tokenId={item} key={item} inventory={true} />
          ))}
        </SimpleGrid>
      </Center>
    </>
  );
};

export default Inventory;
