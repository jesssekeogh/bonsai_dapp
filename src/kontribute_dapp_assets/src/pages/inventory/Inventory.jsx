import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import {
  Center,
  SimpleGrid,
} from "@chakra-ui/react";
import { LoadingSpinner } from "../../containers";
import InventoryStats from "./InventoryStats.jsx";
import { GetMine, Claim } from "../components";
import { SingleNft } from "../components";

const Inventory = () => {
  const [data, setData] = useState([]);
  const dispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);

  const [Loaded, setLoaded] = useState(false);

  const load = async () => {
    setData(await dispatch(GetMine()));
    setLoaded(true);
    setData([394737, 394736]);
  };

  useEffect(() => {
    if (loaded) {
      // dispatch(Claim()).then(() => load());
      load()
    }
  }, []);

  return (
    <div>
      <InventoryStats />
      {Loaded ? (
        <Center>
          <SimpleGrid
            columns={[2, null, 4]}
            pb={5}
            gap={2}
            mt={2}
            maxW="1250px"
          >
            {data.map((item) => (
              <SingleNft tokenId={item} key={item} inventory={true} />
            ))}
          </SimpleGrid>
        </Center>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

export default Inventory;
