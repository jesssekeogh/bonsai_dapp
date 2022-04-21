import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
  nft_fetch,
} from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  tokenUrl,
  tokenToText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
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
import { InventoryNft, MarketplaceNft } from "./index";

const urlAuthorPrices =
  "https://nftpkg.com/api/v1/prices/a001c89f603f36aa5cba0d7f5f6ca9be2298c9e5f8309e2155767752916ef418"; // change to minter address

const SingleNft = ({ tokenId, inventory, marketplace }) => {
  const map = useAnvilSelector((state) => state.user.map); //anvil mapper
  const dispatch = useAnvilDispatch();

  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(tokenId)));
    setName(meta.name);
    let src = await tokenUrl(map.space, tokenId, "thumb");
    setImg(src);

    // fetch prices:
    const resp1 = await fetch(urlAuthorPrices).then((x) => x.json());
    for (var i = 0; i < resp1.length; i++) {
      if (resp1[i][0] === tokenId) {
        let nft_icp = resp1[i][2];
        setPrice(nft_icp);
      }
    }

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
              <SkeletonCircle size={["150", null, "250"]} />
            )}
          </Box>
          <HStack pt={3} align={"start"} justify={"space-between"}>
            {loaded ? (
              <>
                <Text
                  color={"gray.500"}
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
                >
                  Id: {tokenId}
                </Text>
                <Text
                  as="kbd"
                  bgGradient="linear(to-r, #ed1f79, #f15b25)"
                  bgClip="text"
                  fontSize={{ base: "xs", sm: "sm", md: "md" }}
                >
                  ICP: {price === 0 ? "Not Set": AccountIdentifier.e8sToIcp(price)}
                </Text>
              </>
            ) : (
              <>
                <Skeleton height="15px" width={"80px"} />
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
                color={"white"}
              >
                {name}
              </Heading>
            ) : (
              <Skeleton height="15px" width={"100px"} />
            )}
            {inventory ? <InventoryNft tokenId={tokenId} /> : null}
            {marketplace ? <MarketplaceNft tokenId={tokenId} /> : null}
          </Stack>
        </Box>
      </GridItem>
    </>
  );
};

export default SingleNft;
