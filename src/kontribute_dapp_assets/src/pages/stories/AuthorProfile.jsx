import React, { useState, useEffect } from "react";
import * as Principal from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useParams } from "react-router-dom";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import StoryCard from "./components/StoryCard";
import {
  Heading,
  SlideFade,
  Flex,
  Container,
  Center,
  useColorModeValue,
  useClipboard,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Tooltip,
  Text,
  GridItem,
  VStack,
  Stack,
  Box,
  Hide,
} from "@chakra-ui/react";
import { CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { BiCylinder, BiWallet } from "react-icons/bi";
import LoadingStoryCard from "./components/LoadingStoryCard";
import AvatarPic from "./components/AvatarPic";
import AuthorsCollectibles from "./components/AuthorsCollectibles";
import GetAuthorsSelling from "../components/GetAuthorsSelling";

// test a faulty principal
const AuthorProfile = () => {
  const [allStories, setAllStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const params = useParams();
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [canister, setCanister] = useState(null);
  const [authorSelling, setAuthorSelling] = useState([]);

  const partitionKey = `author_${params.authorPrincipal}`;

  // get address
  let address;
  for (let i = 0; i < 100000; i++) {
    let c = Principal.principalToAccountIdentifier(params.authorPrincipal, i);

    if (c.substring(0, 3) === "a00") {
      address = c;
      break;
    }
  }

  const getAuthorStories = async () => {
    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    const stories = await storyServiceClient.query(partitionKey, (actor) =>
      actor.scanAllFullStories(skLowerBound, skUpperBound, limit, ascending)
    );

    const authorCanisters =
      await indexClient.indexCanisterActor.getCanistersByPK(partitionKey);

    setCanister(authorCanisters[0]);

    let likes = 0;
    let views = 0;

    if (stories.length > 0 && stories[0].value.stories.length > 0) {
      let authorStories = stories[0].value.stories;

      // getSize(authorStories);

      const filterByLatest = authorStories.sort(
        (a, b) => Number(b.time) - Number(a.time)
      );

      setAllStories(filterByLatest);

      for (let story of stories[0].value.stories) {
        likes += Number(story.likes);
        views += Number(story.views);
      }
    } else {
      setAllStories([]);
    }

    setAuthorSelling(await GetAuthorsSelling(address));

    setTotalLikes(likes.toLocaleString());
    setTotalViews(views.toLocaleString());
    setLoaded(true);
  };

  // return array size in bytes
  // query limit is 2mb?
  // const getSize = (storyArray) => {
  //   let newArray = storyArray.map((story) => {
  //     for (let value in story) {
  //       story[value] = story[value].toString();
  //     }
  //     return story;
  //   });

  //   console.info(new Blob([JSON.stringify(newArray)]).size);
  // };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthorStories();
  }, [params.authorPrincipal]);

  return (
    <Center mt={{ base: 0, md: 8 }} mb={8} pb={10}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        templateColumns={{ base: "auto", lg: "1fr 500px" }}
      >
        <Hide above="md">
          <GridItem>
            <Box mt={{ base: 3, md: 20 }}>
              <ProfileBox
                author={params.authorPrincipal}
                address={address}
                totalLikes={totalLikes}
                totalViews={totalViews}
                canister={canister}
              />
              <AuthorsCollectibles address={address} tokens={authorSelling} />
            </Box>
          </GridItem>
        </Hide>
        <GridItem ml={{ base: 0, lg: 20 }}>
          <Tabs variant="line" colorScheme="cyan" mx={{ base: 3, md: 6 }}>
            <TabList>
              <Tab>
                <Heading size="lg">Stories</Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0} mx={0}>
                <SlideFade in={true} offsetY="20px">
                  {Loaded ? (
                    <>
                      {allStories.length > 0 ? (
                        allStories.map((item) => (
                          <StoryCard key={item.time} data={{ ...item }} />
                        ))
                      ) : (
                        <Flex justify="center">
                          <Text py={"100px"} px={{ base: null, md: "200px" }}>
                            No stories here!😕
                          </Text>
                        </Flex>
                      )}
                    </>
                  ) : (
                    <>
                      {[...Array(1).keys()].map((item) => (
                        <LoadingStoryCard key={item} />
                      ))}
                    </>
                  )}
                </SlideFade>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <Hide below="md">
          <GridItem mt={{ base: 3, md: 20 }}>
            <Box
              pos={{ base: "auto", md: "sticky" }}
              top={{ base: "auto", md: "20" }}
            >
              <ProfileBox
                author={params.authorPrincipal}
                address={address}
                totalLikes={totalLikes}
                totalViews={totalViews}
                canister={canister}
              />
              <AuthorsCollectibles address={address} tokens={authorSelling} />
            </Box>
          </GridItem>
        </Hide>
      </SimpleGrid>
    </Center>
  );
};

export default AuthorProfile;

const ProfileBox = ({ author, address, totalLikes, totalViews, canister }) => {
  const bgColor = useColorModeValue("white", "#111111");
  const { onCopy, hasCopied } = useClipboard(canister);

  return (
    <Flex rounded={"lg"} my={3}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} w="100vw" p={4}>
        <AvatarPic
          author={author}
          address={address}
          smallView={false}
          monetized={false}
        />
        <VStack align="start" justify="start" gap={1} mt={3}>
          <Stack
            gap={{ base: 0, lg: 5 }}
            direction={{ base: "column", lg: "row" }}
          >
            <CopyAddress address={address} />
            <VStack spacing={-1} align="start">
              <Flex align="center" mb={-1} gap={1} color="gray.500">
                <BiCylinder />
                <Text
                  fontSize={"xs"}
                  textTransform="uppercase"
                  fontWeight={700}
                  display="inline"
                >
                  Canister
                </Text>
              </Flex>
              <Tooltip
                hasArrow
                closeOnClick={false}
                label={hasCopied ? "Copied" : "Copy canister"}
              >
                <Button
                  bg={"none"}
                  p={0}
                  m={0}
                  size="md"
                  onClick={() => onCopy()}
                  rightIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
                  _hover={{ bg: "none", cursor: "pointer", opacity: "0.8" }}
                >
                  {canister
                    ? canister.substring(0, 5) +
                      "..." +
                      canister.substring(20, 27)
                    : "No canister found"}
                </Button>
              </Tooltip>
            </VStack>
          </Stack>
          <Flex gap={5} align={"center"} justify="start">
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
          </Flex>
        </VStack>
      </Container>
    </Flex>
  );
};

const CopyAddress = ({ address }) => {
  const { onCopy, hasCopied } = useClipboard(address);
  return (
    <VStack spacing={-1} align="start">
      <Flex align="center" mb={-1} gap={1} color="gray.500">
        <BiWallet />
        <Text
          fontSize={"xs"}
          textTransform="uppercase"
          fontWeight={700}
          display="inline"
        >
          Address
        </Text>
      </Flex>
      <Tooltip
        hasArrow
        closeOnClick={false}
        label={hasCopied ? "Copied" : "Copy address"}
      >
        <Button
          bg={"none"}
          p={0}
          m={0}
          size="md"
          onClick={() => onCopy()}
          rightIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
          _hover={{ bg: "none", cursor: "pointer", opacity: "0.8" }}
        >
          {address
            ? `${address.substring(0, 5)}...${address.substring(59, 64)}`
            : "No address found"}
        </Button>
      </Tooltip>
    </VStack>
  );
};
