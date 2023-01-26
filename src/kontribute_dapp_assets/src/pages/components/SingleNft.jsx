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
  useBreakpointValue,
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
import { BuySingle } from "./index";
import { useSelector } from "react-redux";

const SingleNft = ({ tokenId, isMarketplace }) => {
  let isMounted = true;
  const path = useLocation();
  const dispatch = useAnvilDispatch();
  const [nft, setNft] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [showQuickBuy, setShowQuickBuy] = useState(false);
  const loggedIn = useSelector((state) => state.Profile.loggedIn);

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
  const isMobile = useBreakpointValue({ base: true, lg: false });

  useEffect(() => {
    load();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <GridItem>
      <Box
        role={"group"}
        w={["160px", null, "280px"]}
        bg={bgColor}
        rounded={"md"}
        boxShadow="md"
        onMouseOver={() =>
          isMarketplace && !isMobile ? setShowQuickBuy(true) : null
        }
        onMouseOut={() =>
          isMarketplace && !isMobile ? setShowQuickBuy(false) : null
        }
      >
        <Link
          to={"/nft/" + token}
          state={{
            prev: path.pathname,
            showConfetti: false,
            totalNfts: 1,
          }}
        >
          <Box rounded={"lg"} pos={"relative"} align="center" overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              bg="#fff"
              height={["160px", null, "280px"]}
              rounded="lg"
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
        </Link>
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
                {showQuickBuy ? (
                  <QuickBuy
                    tokenId={tokenId}
                    Icp={nft.price}
                    setShowQuickBuy={setShowQuickBuy}
                    loggedIn={loggedIn}
                  />
                ) : null}
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
  );
};

const QuickBuy = ({ tokenId, Icp, setShowQuickBuy, loggedIn }) => {
  return (
    <Flex pt={1} w={"100%"} justify="center">
      <SlideFade in={true} offsetY="20px">
        {loggedIn ? (
          <BuySingle
            tokenId={tokenToText(tokenId)}
            price={Icp}
            setShowQuickBuy={setShowQuickBuy}
          >
            <Flex
              align="center"
              px={3}
              borderRadius={"lg"}
              color="black"
              bg={"#e6eaee"}
              _hover={{
                opacity: "0.8",
                cursor: "pointer",
              }}
            >
              <BsFillLightningChargeFill />
              &nbsp;
              <Text fontWeight="bold" fontSize={"md"}>
                Quick buy
              </Text>
            </Flex>
          </BuySingle>
        ) : (
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
              Log in to buy
            </Text>
          </Flex>
        )}
      </SlideFade>
    </Flex>
  );
};

export default SingleNft;
