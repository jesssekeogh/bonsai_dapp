import React, { useEffect, useState } from "react";
import {
  Button,
  Center,
  Flex,
  Heading,
  Tag,
  Stack,
  Text,
  useBreakpointValue,
  HStack,
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

const LargeNft = () => {
  const params = useParams();
  const path = useLocation();

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
    setSrc(await tokenUrl(map.space, tokenFromText(params.tokenid), "content"));
    const meta = await dispatch(nft_fetch(params.tokenid));
    let NftData = {
      id: params.tokenid,
      name: meta.name,
      lore: meta.lore,
      attributes: meta.attributes,
      tags: meta.tags,
      color: itemQuality.dark[meta.quality].color,
      rating: itemQuality.dark[meta.quality].label,
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
  }, []);

  if (!Loaded) return <LoadingSpinner label="Loading NFT..." />;
  return (
    <>
      <Center px={5}>
        {pathData.showConfetti ? <Confetti /> : null}
        <Stack
          height={{ sm: "476px", md: "50vw", lg: "38vw" }}
          maxH="650px"
          width="auto"
          direction={{ base: "column", md: "row" }}
          padding={4}
        >
          <Flex flex={1}>
            <ChakraImage borderRadius="lg" boxSize="100%" src={src} />
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
              <Heading
                color={data.color}
                fontWeight="bold"
                fontSize={["lg", null, "4xl"]}
                fontStyle={"italic"}
              >
                {data.name}
              </Heading>
              <Text color="gray.500">({data.rating})</Text>
            </HStack>
            <HStack>
              <NftTags tags={data.tags} />
            </HStack>
            <Text fontWeight={600} color="#f0e6d3" mb={2} maxW="520px">
              {data.lore}
            </Text>
          </Stack>
        </Stack>
      </Center>
      <Center>
        <HStack>
          <Link to={pathData.prevPath}>
            <Button
              colorScheme="#282828"
              bg="#282828"
              rounded={"full"}
              px={5}
              my={5}
              size="sm"
              _hover={{ opacity: "0.8" }}
            >
              <Text as="kbd">Go Back</Text>
            </Button>
          </Link>
          {pathData.amount > 1 ? (
            <Link to="/inventory">
              <Button
                colorScheme="#282828"
                bg="#282828"
                rounded={"full"}
                px={5}
                my={5}
                size="sm"
                _hover={{ opacity: "0.8" }}
              >
                <Text as="kbd">
                  {"+ " + (pathData.amount - 1) + " other NFTs"}
                </Text>
              </Button>
            </Link>
          ) : null}
        </HStack>
      </Center>
    </>
  );
};

const NftTags = (props) => {
  return (
    <>
      {props.tags.map((tag) => {
        return (
          <Tag
            me={1}
            fontStyle={"italic"}
            my={1}
            p={1}
            size={useBreakpointValue(["sm", "md"])}
            variant="solid"
            colorScheme="blue"
            key={tag}
          >
            {tag}
          </Tag>
        );
      })}
    </>
  );
};
export default LargeNft;
