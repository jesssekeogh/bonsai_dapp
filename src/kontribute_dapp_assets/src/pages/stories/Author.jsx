import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Heading,
  SlideFade,
  Skeleton,
  Flex,
  Tag,
  Container,
  Center,
  useColorModeValue,
  Heading,
  Button,
  SkeletonText,
  SkeletonCircle,
  Skeleton,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  SimpleGrid,
  GridItem,
  Box,
} from "@chakra-ui/react";
import AvatarPic from "./components/AvatarPic";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { unwrapStory } from "./components/Unwrapping";
import StoryCard from "./components/StoryCard";
import LoadingStoryCard from "./components/LoadingStoryCard";

const Author = () => {
  const params = useParams();

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [stories, setStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  const [storiesShowing, setStoriesShowing] = useState(8);

  const skLowerBound = "";
  const skUpperBound = "~";
  const limit = 1000;
  const ascending = [false];

  const loadStories = async () => {
    const stories = await storyServiceClient.query(
      `user_${params.author}`,
      (actor) =>
        actor.scanAllStories(skLowerBound, skUpperBound, limit, ascending)
    );

    let storiesToShow = [];
    let storyPromises = [];

    const latestStoryFromAuthor = stories[0].value.stories;

    for (let story of latestStoryFromAuthor) {
      if (storyPromises.length < storiesShowing) {
        const storyData = storyServiceClient.query(
          `user_${params.author}`,
          (actor) => actor.getStory(story.sortKey)
        );
        storyPromises.push(storyData);
      } else {
        break;
      }
    }

    await Promise.allSettled(
      storyPromises.map(async (data) => {
        const story = await data;
        storiesToShow.push(unwrapStory(story));
      })
    );

    setStories(storiesToShow.sort((a, b) => Number(b.time) - Number(a.time)));
    setLoaded(true);
  };

  useEffect(() => {
    loadStories();
  }, []);

  const bgColor = useColorModeValue("white", "#111111");
  return (
    <>
      <Center my={8}>
        <Flex rounded={"lg"} m={3}>
          <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
            <AvatarPic
              author={params.author}
              address={params.address}
              smallView={false}
            />
          </Container>
        </Flex>
      </Center>
      <Center pb={10}>
        <Tabs variant="line" colorScheme="cyan" mx={3}>
          <TabList>
            <Tab>
              <Heading size="lg">Stories</Heading>
            </Tab>
            <Tab>
              <Heading size="lg">Digital Collectibles</Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <SlideFade in={true} offsetY="20px">
                {" "}
                {stories.map((item) => (
                  <StoryCard key={item.groupName} data={{ ...item }} />
                ))}
              </SlideFade>
            </TabPanel>
            <TabPanel>
              <SlideFade in={true} offsetY="20px">
                nfts
              </SlideFade>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Center>
    </>
  );
};

export default Author;
