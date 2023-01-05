import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Center,
  Image as ChakraImage,
  HStack,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Skeleton,
  Flex,
  Text,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { FcApproval } from "react-icons/fc";

const TopAuthors = () => {
  const authors = [
    "3zgw5-lwcb5-szvtp-tkqbu-zcdmp-qphq3-4gmre-75bbr-airu3-kfyeq-4ae",
    "zqxph-ufrag-xelru-brcwg-4amzv-dxvcm-ws2eq-qg2jm-7kvnc-ugtig-wqe",
    "gjb2q-dzr7c-xdce5-m3yqz-zx3vg-7vciz-7vgcg-sov33-ln7rs-btbjk-2qe",
  ];

  return (
    <Box>
      <Center pb={3}>
        <Heading fontSize={{ base: "xl", lg: "3xl" }}>Notable authors</Heading>
      </Center>
      <Center>
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 3 }}
          pb={5}
          gap={{ base: 3, md: 5 }}
          maxW="1050px"
        >
          {authors.map((item) => (
            <TopAuthorCard author={item} key={item} />
          ))}
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default TopAuthors;

const TopAuthorCard = ({ author }) => {
  const [src, setSrc] = useState("");
  const [authorDetails, setAuthorDetails] = useState({});
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const partitionKey = `author_${author}`;
  const queryParam = `AuthorDetailsFor_${author}`;

  const dispatch = useAnvilDispatch();

  const getLikesAndViews = async () => {
    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    const stories = await storyServiceClient.query(partitionKey, (actor) =>
      actor.scanAllFullStories(skLowerBound, skUpperBound, limit, ascending)
    );

    let likes = 0;
    let views = 0;

    if (stories.length > 0 && stories[0].value.stories.length > 0) {
      for (let story of stories[0].value.stories) {
        likes += Number(story.likes);
        views += Number(story.views);
      }
    }

    setTotalLikes(likes.toLocaleString());
    setTotalViews(views.toLocaleString());
  };

  const load = async () => {
    try {
      const details = await storyServiceClient.query(partitionKey, (actor) =>
        actor.getAuthorDetails(queryParam)
      );

      if (details.length > 0) {
        setAuthorDetails(details[0].value.ok[0]);

        const meta = await dispatch(
          nft_fetch(details[0].value.ok[0].nftProfilePic.toLowerCase())
        );

        meta.thumb.internal
          ? setSrc(meta.thumb.internal.url)
          : setSrc(meta.thumb.external);
        setAuthorDetails(details[0].value.ok[0]);
      }
    } catch (e) {
      console.log(e.toString());
    }
  };

  useEffect(() => {
    load();
    getLikesAndViews();
  }, [author]);

  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <NavLink to={"/profile/" + author}>
      <Box
        spacing="30px"
        marginTop="5"
        boxShadow="md"
        borderRadius="lg"
        bg={bgColor}
        _hover={{
          transform: "translateY(-3px)",
          boxShadow: "lg",
        }}
        transition="0.3s ease-in-out"
      >
        <Box borderRadius="lg" overflow="hidden">
          <ChakraImage
            src={src}
            fallback={<Skeleton boxSize="335px" borderRadius="lg" />}
            objectFit="contain"
          />
        </Box>
        <Box p={5}>
          <Flex align="center">
            <Heading size={"md"} noOfLines={1}>
              {authorDetails.pseudonym}&nbsp;
            </Heading>
            <FcApproval />
          </Flex>
          <HStack justify="start" spacing={12} mt={3} align="center">
            <VStack spacing={-1} align="start">
              <Text
                fontSize={"xs"}
                textTransform="uppercase"
                color="gray.500"
                fontWeight={700}
              >
                Views
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                {totalViews}
              </Text>
            </VStack>
            <VStack spacing={-1} align="start">
              <Text
                fontSize={"xs"}
                textTransform="uppercase"
                color="gray.500"
                fontWeight={700}
              >
                Likes
              </Text>
              <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                {totalLikes}
              </Text>
            </VStack>
          </HStack>
        </Box>
      </Box>
    </NavLink>
  );
};
