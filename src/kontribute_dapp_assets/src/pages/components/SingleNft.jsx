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
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Box,
  Heading,
  Text,
  Stack,
  GridItem,
  SkeletonCircle,
  Skeleton,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import InventoryNftButton from "../inventory/InventoryNftButton";
import MarketplaceNftButton from "../marketplace/MarketplaceNftButton";

const SingleNft = ({
  tokenId,
  sort,
  collection,
  selling,
  isInventory,
  isMarketplace,
}) => {
  let isMounted = true;
  const map = useAnvilSelector((state) => state.user.map); //anvil mapper
  const dispatch = useAnvilDispatch();

  const [img, setImg] = useState();
  const [name, setName] = useState({});
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(tokenId)));
    if (isMounted) {
      setName({
        name: meta.name,
        color: itemQuality.dark[meta.quality].color,
        quality: meta.quality.toString(),
        filter: meta.tags[0],
        price: meta.price.amount,
      });
      let src = await tokenUrl(map.space, tokenId, "thumb");
      setImg(src);

      setLoaded(true);
    }
  };

  useEffect(() => {
    load();
    return () => {
      isMounted = false;
    };
  });

  if (checkFilter(sort, collection, selling, name)) return null;

  return (
    <>
      <GridItem>
        <Box
          role={"group"}
          p={[2, null, 4]}
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
              <SkeletonCircle size={["150", null, "270"]} />
            )}
          </Box>
          <HStack pt={3} align={"start"} justify={"space-between"}>
            {loaded ? (
              <>
                <Text
                  color={"gray.500"}
                  casing={"uppercase"}
                  fontSize={{ base: "6pt", sm: "xs", md: "xs" }}
                >
                  {tokenToText(tokenId)}
                </Text>
                {name.price > 0 ? (
                  <Tooltip label="Amount in ICP">
                    <Text
                      as="kbd"
                      bgGradient="linear(to-r, #ed1f79, #f15b25)"
                      bgClip="text"
                      fontSize={{ base: "7pt", sm: "xs", md: "xs" }}
                    >
                      {e8sToIcp(name.price)}
                    </Text>
                  </Tooltip>
                ) : null}
              </>
            ) : (
              <>
                <Skeleton height="20px" width={"70px"} />
              </>
            )}
          </HStack>
          <Stack
            pt={1}
            direction={"row"}
            align={"center"}
            justify="space-between"
          >
            {loaded ? (
              <Heading
                fontSize={{ base: "7pt", sm: "xs", md: "sm" }}
                color={name.color}
              >
                {name.name}
              </Heading>
            ) : (
              <Skeleton height="20px" width={"100px"} />
            )}
            {isInventory ? <InventoryNftButton tokenId={tokenId} /> : null}
            {isMarketplace ? (
              <MarketplaceNftButton tokenId={tokenId} price={name.price} />
            ) : null}
          </Stack>
        </Box>
      </GridItem>
    </>
  );
};

const checkFilter = (sort, collection, selling, nftmeta) => {
  if (selling !== "all" && selling === "selling") {
    if (!(nftmeta.price > 0)) return true;
  } else if (selling !== "all" && selling === "notselling") {
    if (nftmeta.price > 0) return true;
  }

  if (collection === "") {
    collection = nftmeta.filter;
  } else if (collection !== nftmeta.filter) return true;

  if (sort === "0") {
    sort = nftmeta.quality;
  } else if (sort !== nftmeta.quality) return true;

  return false;
};

export default SingleNft;
