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
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import StoryCard from "./components/StoryCard";
import { LoadingStoryCard, StoryCard, SmallPickBox } from "./components";
import { SpinnerIcon } from "@chakra-ui/icons";
import { unwrapStory } from "./components/Unwrapping";

const Stories = () => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [stories, setStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  const [storyFilter, setStoryFilter] = useState("Latest");

  const [showAll, setShowAll] = useState(false);

  const loadLatest = async () => {
    setLoaded(false);

    const usersMap = await indexClient.indexCanisterActor.getPKs();

    const skLowerBound = "author_";
    const skUpperBound = "author_~";
    const limit = 1000;
    const ascending = [false];

    let storiesToShow = [];
    let storyPromises = [];

    for (let user of usersMap) {
      const stories = storyServiceClient.query(user, (actor) =>
        actor.scanAllFullStories(skLowerBound, skUpperBound, limit, ascending)
      );

      storyPromises.push(stories);
    }

    await Promise.allSettled(
      storyPromises.map(async (stories) => {
        const latestStoryFromAuthor = await stories;

        for (let story of latestStoryFromAuthor[0].value.stories) {
          storiesToShow.push(story);
        }
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

      if (showAll) {
        setStories(filterByFilter);
      } else {
        setStories(filterByFilter.slice(0, 15));
      }
      return setLoaded(true);
    }

    if (showAll) {
      setStories(filterByLatest);
    } else {
      setStories(filterByLatest.slice(0, 15));
    }
    setLoaded(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadLatest();
  }, [showAll, storyFilter]);

  return (
    <Center mt={{ base: 0, md: 8 }} mb={8} pb={10}>
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
                            setShowAll(true);
                          }}
                          isDisabled={showAll}
                          leftIcon={<SpinnerIcon />}
                          mt={3}
                        >
                          Load more...
                        </Button>
                      </Center>
                    </>
                  ) : (
                    <>
                      {[...Array(10).keys()].map((item) => (
                        <LoadingStoryCard key={item} />
                      ))}
                      <Center>
                        <Button
                          onClick={() => {
                            setShowAll(true);
                          }}
                          isDisabled={showAll}
                          leftIcon={<SpinnerIcon />}
                          mt={3}
                        >
                          Load more...
                        </Button>
                      </Center>
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
            mt={{ base: 3, md: 20 }}
          >
            <OurPicks />
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
    "Web3Author Competition",
  ];
  return (
    <Flex rounded={"lg"} my={3}>
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

const OurPicks = () => {
  const bgColor = useColorModeValue("white", "#111111");
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [showOurPicks, setShowOurPicks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const sortKeysForPicks = [
    "author_3d2q2-ce4z5-osah6-dibbj-secst-grfxj-q3f7x-ahuhz-gk5ma-rsgjo-lae_story_The%20Kontribute%20Writathon!_chapter_Web3%20Author%20Competition",
    "author_qflw3-vnfgg-ewg4g-rt7y7-zrana-4oruo-jfrbo-i3l5b-rid5c-7o7o2-pae_story_Interstellar%20Tales_chapter_Prologue",
    "author_bc2fh-bgwnk-fupqb-53xlk-ulfsk-tl7y3-difge-krqya-gb3am-uhwp6-gae_story_Moonewalker%20Fan%20Fiction_chapter_Say%20hello%20to%20my%20little%20Pleth...",
  ];

  const load = async () => {
    let promises = [];
    let pickedStories = [];

    for (let sk of sortKeysForPicks) {
      const partitionKey = `author_${sk.split("_")[1]}`;

      const storyData = storyServiceClient.query(partitionKey, (actor) =>
        actor.getStory(sk)
      );

      promises.push(storyData);
    }

    await Promise.allSettled(
      promises.map(async (story) => {
        const s = await story;
        pickedStories.push(unwrapStory(s));
      })
    );

    setShowOurPicks(pickedStories);
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <Flex rounded={"lg"} mt={3}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
        <Heading size="md" flex="1">
          Our Picks ✍️
        </Heading>
        {loaded ? (
          <>
            {showOurPicks.map((item) => (
              <SmallPickBox data={item} key={item.time} />
            ))}
          </>
        ) : (
          sortKeysForPicks.map((item) => (
            <Box key={item} mt={5}>
              <Flex align="center" gap={2}>
                <SkeletonCircle size="9" />
                <Skeleton height="12px" w={"100px"} />
              </Flex>
              <Skeleton height="12px" mt={1} ms={1} w={"200px"} />
            </Box>
          ))
        )}
      </Container>
    </Flex>
  );
};
