import React, { useState, useEffect } from "react";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { itemQuality } from "@vvv-interactive/nftanvil-tools/cjs/items.js";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Box,
  Heading,
  Text,
  GridItem,
  Skeleton,
  VStack,
  useColorModeValue,
  Button,
  SlideFade,
  Flex,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import icLogo from "../../../assets/ic-logo.png";
import { BsFillLightningChargeFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const SingleNft = ({ tokenId, isMarketplace }) => {
  let isMounted = true;
  const path = useLocation();
  const dispatch = useAnvilDispatch();
  const [nft, setNft] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showQuickBuy, setShowQuickBuy] = useState(false);

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
          w={["160px", null, "280px"]}
          bg={bgColor}
          rounded={"md"}
          boxShadow="md"
          onMouseOver={() => (isMarketplace ? setShowQuickBuy(true) : null)}
          onMouseOut={() => (isMarketplace ? setShowQuickBuy(false) : null)}
        >
          <Box rounded={"lg"} pos={"relative"} overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              bg="#fff"
              height={["160px", null, "280px"]}
              width={"auto"}
              objectFit={"cover"}
              src={nft.thumb}
              fallback={<Skeleton height={["160px", null, "280px"]} />}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
          <Box p={{ base: 2, md: 3 }}>
            <VStack align={"center"} color={textColor}>
              {loaded ? (
                <>
                  <Heading
                    fontSize={{ base: "sm", md: "md" }}
                    color={nftNameColor}
                    noOfLines={1}
                  >
                    {nft.name}
                  </Heading>
                  {!showQuickBuy ? (
                    <Flex align="center" pt={1}>
                      <ChakraImage src={icLogo} h={"22px"} w={"auto"} />
                      &nbsp;
                      <Text fontWeight="bold" fontSize={"md"}>
                        {e8sToIcp(nft.price) > 0
                          ? Number(e8sToIcp(nft.price)).toFixed(2)
                          : "-"}
                      </Text>
                    </Flex>
                  ) : null}
                  {showQuickBuy ? <QuickBuy tokenId={tokenId} /> : null}
                </>
              ) : (
                <>
                  <Skeleton height="15px" width={"100px"} my={2} />
                  <Skeleton height="15px" width={"70px"} mt={2} />
                </>
              )}
            </VStack>
          </Box>
        </Box>
      </GridItem>
    </Link>
  );
};

const QuickBuy = ({ tokenId }) => {
  return (
    <Flex pt={1} w={"100%"} justify="center">
      <SlideFade in={true} offsetY="20px">
        <Flex
          align="center"
          px={3}
          borderRadius={"lg"}
          color="black"
          bg={"#e6eaee"}
        >
          <BsFillLightningChargeFill />
          &nbsp;
          <Text fontWeight="bold" fontSize={"md"}>
            Quick buy
          </Text>
        </Flex>
      </SlideFade>
    </Flex>
  );
};

export default SingleNft;
