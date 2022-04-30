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
  tokenToText,
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
  const [prevPath, setPath] = useState("/");
  const [showConfetti, setConfetti] = useState(false);
  
  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(params.tokenid)));
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
      setConfetti(path.state.showConfetti)
      setPath(path.state.prev);
    }
    setSrc(await tokenUrl(map.space, params.tokenid, "content"));
    setData(NftData);
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  if (!Loaded) return <LoadingSpinner />;
  return (
    <>
      <Center px={5}>
        {showConfetti ? <Confetti /> : null}
        <Stack
          height={{ sm: "476px", md: "38vw" }}
          width="auto"
          direction={{ base: "column", md: "row" }}
          padding={4}
        >
          <Flex flex={1}>
            <ChakraImage objectFit="contain" boxSize="100%" src={src} />
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
            <Text fontWeight={600} color="#f0e6d3" mb={2} maxW="550px">
              {data.lore}
            </Text>
          </Stack>
        </Stack>
      </Center>
      <Center>
        <Link to={prevPath}>
          <Button
            colorScheme="#282828"
            bg="#282828"
            rounded={"full"}
            px={6}
            mt={3}
            _hover={{ opacity: "0.8" }}
          >
            <Text as="kbd">Go Back</Text>
          </Button>
        </Link>
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
