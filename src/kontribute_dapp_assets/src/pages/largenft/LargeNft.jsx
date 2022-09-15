import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  HStack,
  CircularProgress,
  Box,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import {
  tokenUrl,
  tokenFromText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  useAnvilSelector,
  nft_fetch,
  useAnvilDispatch,
} from "@vvv-interactive/nftanvil-react";
import { useParams } from "react-router-dom";
import { itemQuality } from "@vvv-interactive/nftanvil-tools/cjs/items.js";
import { LoadingSpinner } from "../../containers/index";
import { Link, useLocation } from "react-router-dom";
import { Confetti } from "../components";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";
import ForSale from "./ForSale";
import Owned from "./Owned";

const LargeNft = () => {
  const params = useParams();
  const path = useLocation();
  const address = useAnvilSelector((state) => state.user.address);
  const map = useAnvilSelector((state) => state.user.map);
  const dispatch = useAnvilDispatch();
  const [Loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [src, setSrc] = useState();

  const [pathData, setPathData] = useState({
    prevPath: "/",
    showConfetti: false,
    amount: 0,
  });

  const load = async () => {
    setSrc(tokenUrl(map.space, tokenFromText(params.tokenid), "content"));

    const meta = await dispatch(nft_fetch(params.tokenid));
    let NftData = {
      id: params.tokenid,
      name: meta.name,
      lore: meta.lore,
      attributes: meta.attributes,
      tags: meta.tags,
      color: itemQuality.light[meta.quality].color,
      rating: itemQuality.light[meta.quality].label,
      price: meta.price.amount,
    };

    if (path.state !== null) {
      setPathData({
        prevPath: path.state.prev,
        showConfetti: path.state.showConfetti,
        amount: path.state.totalNfts,
      });
    }

    setData(NftData);
    setLoaded(true);
  };

  useEffect(() => {
    load();
    window.scrollTo(0, 0);
    const interval = setInterval(() => {
      load();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark)
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  )

  if (!Loaded) return <LoadingSpinner label="Loading NFT..." />;
  return (
    <Center pt={5} pb={10}>
      {pathData.showConfetti ? <Confetti /> : null}
      <Stack direction={{ base: "column", md: "row" }} padding={4}>
        <Flex flex={1}>
          <ChakraImage
            borderRadius="lg"
            boxSize="100%"
            src={src}
            fallback={<LoadingImage />}
          />
        </Flex>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent="center"
          alignItems="start"
          p={{ sm: 5, md: 8 }}
          pt={2}
        >
          <HStack>
            <Link to={pathData.prevPath ? pathData.prevPath : "/marketplace"}>
              <Button
                bg={buttonBgColor}
                color={buttonTextColor}
                size="sm"
                _hover={{ opacity: "0.8" }}
              >
                <Text>Go Back</Text>
              </Button>
            </Link>
            {pathData.amount > 1 ? (
              <Link to="/marketplace">
                <Button
                  bg={buttonBgColor}
                  color={buttonTextColor}
                  size="sm"
                  _hover={{ opacity: "0.8" }}
                >
                  <Text>{"+ " + (pathData.amount - 1) + " other NFTs"}</Text>
                </Button>
              </Link>
            ) : null}
          </HStack>

          <Box bg={"white"} boxShadow={"xl"} rounded={"lg"} p={4}>
            <Heading
              color={data.color}
              fontWeight="bold"
              fontSize={["lg", null, "4xl"]}
              fontStyle={"italic"}
            >
              {data.name}
            </Heading>
            <Flex align="center">
              <Text
                fontWeight={600}
                fontSize={{ base: "md", md: "lg" }}
                color="#b2b8be"
              >
                Token ID:&nbsp;
              </Text>
              <Text
                casing={"uppercase"}
                color="#353840"
                fontSize={{ base: "xs", md: "md" }}
              >
                {data.id}
              </Text>
            </Flex>
            <Flex align="center">
              <Text
                fontWeight={600}
                fontSize={{ base: "md", md: "lg" }}
                color="#b2b8be"
              >
                Rarity:&nbsp;
              </Text>
              <Text color="#353840">{data.rating}</Text>
            </Flex>
            <Text
              fontWeight={600}
              fontSize={{ base: "md", md: "lg" }}
              color="#b2b8be"
            >
              Description:
            </Text>
            <Text fontWeight={600} color="#353840" mb={2} maxW="520px">
              {data.lore}
            </Text>
          </Box>
          {data.price > 0 ? (
            <ForSale Icp={data.price} tokenId={data.id} />
          ) : null}
          {address ? <Owned tokenId={data.id} /> : null}
        </Stack>
      </Stack>
    </Center>
  );
};

const LoadingImage = () => {
  return (
    <Center>
      <CircularProgress color="#9d8144" isIndeterminate />
    </Center>
  );
};
export default LargeNft;
