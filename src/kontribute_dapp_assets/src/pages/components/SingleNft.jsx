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
import { itemQuality } from "@vvv-interactive/nftanvil-tools/cjs/items.js";
import {
  Box,
  Heading,
  Text,
  Stack,
  GridItem,
  SkeletonCircle,
  Skeleton,
  HStack,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { InventoryNftButton } from "./index";

const SingleNft = ({ tokenId }) => {
  const map = useAnvilSelector((state) => state.user.map); //anvil mapper
  const dispatch = useAnvilDispatch();

  const [img, setImg] = useState();
  const [name, setName] = useState({});
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(tokenId)));
    setName({ name: meta.name, color: itemQuality.dark[meta.quality].color });
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
          rounded={"lg"}
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
              <SkeletonCircle size={["150", null, "250"]} />
            )}
          </Box>
          <HStack pt={3} align={"start"} justify={"space-between"}>
            {loaded ? (
              <>
                <Text
                  color={"gray.500"}
                  casing={"uppercase"}
                  fontSize={{ base: "7pt", sm: "sm", md: "sm" }}
                >
                  {tokenToText(tokenId)}
                </Text>
              </>
            ) : (
              <>
                <Skeleton height="15px" width={"80px"} />
              </>
            )}
          </HStack>
          <Stack
            pt={2}
            direction={"row"}
            align={"center"}
            justify="space-between"
          >
            {loaded ? (
              <Heading
                fontSize={{ base: "xs", sm: "xs", md: "md" }}
                color={name.color}
              >
                {name.name}
              </Heading>
            ) : (
              <Skeleton height="15px" width={"100px"} />
            )}
            <InventoryNftButton tokenId={tokenId} />
          </Stack>
        </Box>
      </GridItem>
    </>
  );
};

export default SingleNft;
