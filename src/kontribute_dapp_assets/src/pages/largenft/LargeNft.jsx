import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  Hide,
  Stack,
  Text,
  HStack,
  Box,
  Skeleton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useDisclosure,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import {
  useAnvilSelector,
  nft_fetch,
  useAnvilDispatch,
} from "@vvv-interactive/nftanvil-react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useParams } from "react-router-dom";
import { itemQuality } from "@vvv-interactive/nftanvil-tools/cjs/items.js";
import { LoadingSpinner } from "../../containers/index";
import { Link, useLocation } from "react-router-dom";
import { Confetti, GetMine } from "../components";
import ForSale from "./ForSale";
import Owned from "./Owned";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const LargeNft = () => {
  const params = useParams();
  const path = useLocation();
  const address = useAnvilSelector((state) => state.user.address);
  const dispatch = useAnvilDispatch();
  const [Loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [ownedTokens, setOwnedTokens] = useState([]);

  const [pathData, setPathData] = useState({
    prevPath: "/",
    showConfetti: false,
    amount: 0,
  });

  const load = async () => {
    try {
      await Promise.all([
        (async () => {
          let meta = await dispatch(nft_fetch(params.tokenid));
          let NftData = {
            id: params.tokenid,
            name: meta.name,
            lore: meta.lore,
            royalty: (Number(meta.authorShare) / 100).toString(),
            colorDark: itemQuality.dark[meta.quality].color,
            colorLight: itemQuality.light[meta.quality].color,
            rating: itemQuality.light[meta.quality].label,
            price: meta.price.amount,
            content: meta.content.internal
              ? meta.content.internal.url
              : meta.content.external,
            thumb: meta.thumb.internal
              ? meta.thumb.internal.url
              : meta.thumb.external,
          };

          setData(NftData);
        })(),
        (async () => {
          if (address) {
            let allTokens = await dispatch(GetMine());
            setOwnedTokens(allTokens);
          }
        })(),
      ]);

      if (path.state !== null) {
        setPathData({
          prevPath: path.state.prev,
          showConfetti: path.state.showConfetti,
          amount: path.state.totalNfts,
        });
      }

      setLoaded(true);
    } catch (e) {
      console.log(e.toString());
    }
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

  const { isOpen, onOpen, onClose } = useDisclosure();
  const modalPositionBool = useBreakpointValue({ base: true, md: false });
  const bgColor = useColorModeValue("white", "#111111");
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const nftNameColor = useColorModeValue(data.colorLight, data.colorDark);

  if (!Loaded) return <LoadingSpinner label="Loading Collectible..." />;
  return (
    <Center pt={2} pb={10}>
      {pathData.showConfetti ? <Confetti /> : null}
      <Stack
        direction={{ base: "column", md: "column", lg: "row" }}
        p={{ base: 3, md: 8 }}
      >
        <Box pt={{ base: 0, md: 2 }}>
          <ChakraImage
            borderRadius="lg"
            boxSize={["100px", null, "150px"]}
            boxShadow={"lg"}
            src={data.thumb}
            fallback={<Skeleton borderRadius="lg" boxSize={"100px"} />}
            objectFit="contain"
          />
        </Box>
        <Flex
          flex={1}
          onClick={onOpen}
          p={2}
          borderRadius="lg"
          boxShadow={"lg"}
          bg={bgColor}
          maxW="50vh"
          minW={{ md: "535px" }}
          minH={{ md: "535px" }}
          justifyContent="center"
          alignItems="center"
        >
          <ChakraImage
            _hover={{
              cursor: "pointer",
            }}
            borderRadius="lg"
            src={data.content}
            objectFit="cover"
            w="100%"
            h="100%"
            fallback={
              <Skeleton borderRadius="lg" boxSize={["320px", null, "520px"]} />
            }
          />
        </Flex>
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          isCentered={modalPositionBool}
          allowPinchZoom
        >
          <ModalOverlay />
          <ModalContent maxW="90vh">
            <ModalCloseButton />
            <ChakraImage
              borderRadius="md"
              height={"100%"}
              src={data.content}
              fallback={<Skeleton borderRadius="lg" height="100%" />}
            />
          </ModalContent>
        </Modal>
        <Stack
          flex={1}
          flexDirection="column"
          justifyContent={{ base: "center", md: "start" }}
          alignItems={{ base: "center", md: "start" }}
          px={{ base: 0, md: 3 }}
          pt={2}
          maxW="500px"
        >
          <HStack>
            <Hide below="md">
              <Link to={pathData.prevPath ? pathData.prevPath : "/marketplace"}>
                <Button
                  leftIcon={<ArrowBackIcon />}
                  _hover={{ boxShadow: "base" }}
                >
                  <Text>Go Back</Text>
                </Button>
              </Link>
            </Hide>
            {pathData.amount > 1 ? (
              <Link to="/inventory">
                <Button _hover={{ opacity: "0.8" }}>
                  <Text>{"+ " + (pathData.amount - 1) + " other NFTs"}</Text>
                </Button>
              </Link>
            ) : null}
          </HStack>
          {address ? (
            <Owned tokenId={data.id} tokens={ownedTokens} price={data.price} />
          ) : null}
          {data.price > 0 ? (
            <ForSale Icp={data.price} tokenId={data.id} tokens={ownedTokens} />
          ) : null}
          <Box bg={bgColor} boxShadow={"xl"} w="100%" rounded={"lg"} p={4}>
            <Heading
              color={nftNameColor}
              fontWeight="bold"
              fontSize={["2xl", null, "4xl"]}
              fontStyle={"italic"}
              mb={1}
            >
              {data.name}
            </Heading>
            <Flex align="center">
              <Text
                fontWeight={600}
                fontSize={{ base: "md", md: "lg" }}
                color="#b2b8be"
              >
                Token:&nbsp;
              </Text>
              <Text
                casing={"uppercase"}
                color={textColor}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight={500}
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
                Chain:&nbsp;
              </Text>
              <Text
                color={textColor}
                fontSize={{ base: "sm", md: "md" }}
                fontWeight={500}
              >
                ICP
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
              <Text fontWeight={500} color={textColor}>
                {data.rating}
              </Text>
            </Flex>
            <Flex align="center">
              <Text
                fontWeight={600}
                fontSize={{ base: "md", md: "lg" }}
                color="#b2b8be"
              >
                Author royalty:&nbsp;
              </Text>
              <Text fontWeight={500} color={textColor}>
                {data.royalty}%
              </Text>
            </Flex>
            <Text
              display="inline"
              fontWeight={600}
              fontSize={{ base: "md", md: "lg" }}
              color="#b2b8be"
            >
              Description:&nbsp;
            </Text>
            <Text display="inline" fontWeight={500} color={textColor} mb={2}>
              {data.lore ? data.lore : "None"}
            </Text>
          </Box>
          <Hide above="md">
            <Link to={pathData.prevPath ? pathData.prevPath : "/marketplace"}>
              <Button
                leftIcon={<ArrowBackIcon />}
                _hover={{ boxShadow: "base" }}
              >
                <Text>Go Back</Text>
              </Button>
            </Link>
          </Hide>
        </Stack>
      </Stack>
    </Center>
  );
};

export default LargeNft;
