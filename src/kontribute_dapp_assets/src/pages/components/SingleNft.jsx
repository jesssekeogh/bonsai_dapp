import React, { useState, useEffect } from "react";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { itemQuality } from "@vvv-interactive/nftanvil-tools/cjs/items.js";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Box,
  Heading,
  Text,
  Stack,
  GridItem,
  Hide,
  Skeleton,
  HStack,
  useColorModeValue,
  Flex,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import icLogo from "../../../assets/ic-logo.png";
import { Link, useLocation } from "react-router-dom";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const SingleNft = ({ tokenId }) => {
  let isMounted = true;
  const path = useLocation();
  const dispatch = useAnvilDispatch();
  const [nft, setNft] = useState({});
  const [loaded, setLoaded] = useState(false);

  const token = tokenToText(tokenId);

  const load = async () => {
    const meta = await dispatch(nft_fetch(token));

    if (isMounted) {
      setNft({
        id: token,
        name: meta.name,
        colorDark: itemQuality.dark[meta.quality].color,
        colorLight: itemQuality.light[meta.quality].color,
        quality: meta.quality,
        filter: meta.tags[0],
        price: meta.price.amount,
        author: meta.author,
        thumb: meta.thumb.internal
          ? meta.thumb.internal.url
          : meta.thumb.external,
      });
      setLoaded(true);
    }
  };

  const bgColor = useColorModeValue("White", "#1d1d20");
  const borderColor = useColorModeValue("#e5e8eb", "#1a1a1a");
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const nftNameColor = useColorModeValue(nft.colorLight, nft.colorDark);

  useEffect(() => {
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Link
      to={"/nft/" + token}
      state={{
        prev: path.pathname,
        showConfetti: false,
        totalNfts: 1,
      }}
    >
      <GridItem>
        <Box
          role={"group"}
          minW={["150px", null, "280px"]}
          w={"full"}
          bg={bgColor}
          rounded={"md"}
          border={"2px"}
          borderColor={borderColor}
          boxShadow="sm"
        >
          <Box rounded={"lg"} pos={"relative"} overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              bg="#fff"
              height={["170px", null, "280px"]}
              width={"auto"}
              objectFit={"cover"}
              src={nft.thumb}
              fallback={<Skeleton height={["150px", null, "280px"]} />}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
          <HStack
            pt={1}
            px={3}
            align={"start"}
            justify={"space-between"}
            color={textColor}
          >
            {loaded ? (
              <>
                <Hide below="md">
                  <Text
                    casing={"uppercase"}
                    fontSize={{ base: "6pt", sm: "xs", md: "xs" }}
                  >
                    Price
                  </Text>
                </Hide>
                <Flex align="center">
                  <ChakraImage src={icLogo} h={"18px"} w={"auto"} />
                  &nbsp;
                  <Text as="kbd" fontSize={"xs"}>
                    {e8sToIcp(nft.price) > 0 ? e8sToIcp(nft.price) : "-"}
                  </Text>
                </Flex>
              </>
            ) : (
              <>
                <Skeleton height="8px" width={"70px"} mt={1} />
                <Hide below="md">
                  <Skeleton height="8px" width={"40px"} mt={1} />
                </Hide>
              </>
            )}
          </HStack>
          <Stack
            px={3}
            pb={2}
            direction={"row"}
            align={"center"}
            justify="space-between"
            w={["150px", null, "280px"]}
          >
            {loaded ? (
              <Heading
                fontSize={{ base: "xs", sm: "xs", md: "sm" }}
                color={nftNameColor}
                noOfLines={1}
              >
                {nft.name}
              </Heading>
            ) : (
              <Skeleton height="12px" width={"100px"} my={2} />
            )}
          </Stack>
        </Box>
      </GridItem>
    </Link>
  );
};

export default SingleNft;
