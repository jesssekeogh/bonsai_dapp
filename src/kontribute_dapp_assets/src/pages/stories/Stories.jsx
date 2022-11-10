import React, { useState, useEffect } from "react";
import {
  Heading,
  SlideFade,
  Flex,
  Container,
  Center,
  useColorModeValue,
  Heading,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  GridItem,
  Box,
  Tag,
  Text,
} from "@chakra-ui/react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { unwrapStory } from "./components/Unwrapping";
import { SpinnerIcon } from "@chakra-ui/icons";
import StoryCard from "./components/StoryCard";
import { LoadingStoryCard, StoryCard } from "./components";

const Stories = () => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [stories, setStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  const [storyFilter, setStoryFilter] = useState("Latest");
  const [storiesShowing, setStoriesShowing] = useState(8);

  const loadLatest = async () => {
    setLoaded(false);
    const usersMap = await indexClient.indexCanisterActor.getPKs();

    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    let storiesToShow = [];
    let storyPromises = [];

    // simple getLatest algo, a more advanced algo is needed later on:
    for (let user of usersMap) {
      const stories = await storyServiceClient.query(user, (actor) =>
        actor.scanAllStories(skLowerBound, skUpperBound, limit, ascending)
      );

      const latestStoryFromAuthor = stories[0].value.stories;

      for (let story of latestStoryFromAuthor) {
        const storyData = storyServiceClient.query(user, (actor) =>
          actor.getStory(story.sortKey)
        );
        storyPromises.push(storyData);
      }
    }

    await Promise.allSettled(
      storyPromises.map(async (data) => {
        const story = await data;
        storiesToShow.push(unwrapStory(story));
      })
    );

    const filterByLatest = storiesToShow.sort(
      (a, b) => Number(b.time) - Number(a.time)
    );

    if (storyFilter !== "Latest") {
      const filterByFilter = filterByLatest.filter((a) => {
        if (a.genre === storyFilter) {
          return a;
        }
      });

      setStories(filterByFilter.slice(0, storiesShowing));
      return setLoaded(true);
    }

    setStories(filterByLatest.slice(0, storiesShowing));
    setLoaded(true);
  };

  useEffect(() => {
    loadLatest();
  }, [storiesShowing, storyFilter]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Center my={8} pb={10}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        templateColumns={{ base: "auto", lg: "1fr 350px" }}
      >
        <GridItem ml={{ base: 0, lg: 20 }}>
          <Tabs variant="line" colorScheme="cyan" mx={3}>
            <TabList>
              <Tab>
                <Heading size="lg">{storyFilter}</Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SlideFade in={true} offsetY="20px">
                  {Loaded ? (
                    <>
                      {stories.map((item) => (
                        <StoryCard key={item.time} data={{ ...item }} />
                      ))}
                      <Center>
                        <Button
                          onClick={() => {
                            setLoaded(false);
                            setStoriesShowing(storiesShowing + 5);
                          }}
                          leftIcon={<SpinnerIcon />}
                          mt={3}
                        >
                          Load more...
                        </Button>
                      </Center>
                    </>
                  ) : (
                    <>
                      {stories.map((item) => {
                        if (
                          storyFilter === "Latest" ||
                          storyFilter === item.genre
                        ) {
                          return (
                            <StoryCard key={item.time} data={{ ...item }} />
                          );
                        }
                      })}
                      {[...Array(storiesShowing - stories.length).keys()].map(
                        (item) => (
                          <LoadingStoryCard key={item} />
                        )
                      )}
                    </>
                  )}
                </SlideFade>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <GridItem>
          <Box
            pos={{ base: "auto", md: "sticky" }}
            top={{ base: "auto", md: "20" }}
          >
            <BetaInfo />
            <BrowseUtils
              storyFilter={storyFilter}
              setStoryFilter={setStoryFilter}
              Loaded={Loaded}
            />
          </Box>
        </GridItem>
      </SimpleGrid>
    </Center>
  );
};

export default Stories;

const BrowseUtils = ({ storyFilter, setStoryFilter }) => {
  const bgColor = useColorModeValue("white", "#111111");

  const Genres = [
    "Latest",
    "Fiction",
    "Non-Fiction",
    "Short Story",
    "Blog",
    "Other",
  ];
  return (
    <Flex rounded={"lg"} m={3}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
        <Heading size="md">Topics</Heading>
        <SimpleGrid columns={2} spacing={0}>
          {Genres.map((item) => (
            <GridItem m={2} p={2} key={item}>
              <Button
                isDisabled={storyFilter === item ? true : false}
                onClick={() => setStoryFilter(item)}
              >
                {item}
              </Button>
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>
    </Flex>
  );
};

const BetaInfo = () => {
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Flex rounded={"lg"} mt={{ base: 3, md: 20 }} m={3}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
        <Flex align="center">
          <Heading size="md" flex="1">
            Welcome👋🏻
          </Heading>
          <Tag colorScheme="green">Beta release</Tag>
        </Flex>
        <Text mt={3}>
          sit back grab a ☕️ and enjoy some of the web3 stories on Kontribute.
          We appreciate any feedback at this early stage.
        </Text>
      </Container>
    </Flex>
  );
};
