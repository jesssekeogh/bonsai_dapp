import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
  nft_fetch,
} from "@vvv-interactive/nftanvil-react";
import {
  tokenUrl,
  tokenToText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  GridItem,
  SkeletonCircle,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { LoadingSpinner } from "../../containers";
import InventoryStats from "./InventoryStats.jsx";
import { GetMine, Claim } from "../components";
import InventoryNft from "../components/nft_functions/InventoryNft.jsx";

const Inventory = () => {
  const [data, setData] = useState([]);
  const dispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);

  const [Loaded, setLoaded] = useState(false);

  const load = async () => {
    setData(await dispatch(GetMine()));
    setLoaded(true);
    // setData([394737]);
  };

  useEffect(() => {
    if (loaded) {
      dispatch(Claim()).then(() => load());
      // load()
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
              <SingleNft tokenId={item} key={item} />
            ))}
          </SimpleGrid>
        </Center>
      ) : (
        <LoadingSpinner />
      )}
    </div>
  );
};

const SingleNft = ({ tokenId }) => {
  const map = useAnvilSelector((state) => state.user.map); //anvil mapper
  const dispatch = useAnvilDispatch();

  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(tokenId)));
    setName(meta.name);
    let src = await tokenUrl(map.space, tokenId, "thumb");
    setImg(src);
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, [tokenId]);

  return (
    <>
      <GridItem>
        <Box
          role={"group"}
          p={4}
          maxW={"330px"}
          w={"full"}
          backgroundColor={"#1e212b"}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
        >
          <Box rounded={"lg"} pos={"relative"}>
            {loaded ? (
              <ChakraImage
                bg="#fff"
                rounded={"lg"}
                height={["180px", null, "300px"]}
                width={"auto"}
                objectFit={"cover"}
                src={img}
              />
            ) : (
              <SkeletonCircle size="150" />
            )}
          </Box>
          <Stack pt={3} align={"start"}>
            <Text
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "xs", md: "md" }}
            >
              Bonsai Warrior
            </Text>
          </Stack>
          <Stack
            pt={2}
            direction={"row"}
            align={"center"}
            justify="space-between"
          >
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              color={"white"}
            >
              {name}
            </Heading>
            <InventoryNft tokenId={tokenId}/>
          </Stack>
        </Box>
      </GridItem>
    </>
  );
};
export default Inventory;
