import React, { useState, useEffect } from "react";
import {
  Heading,
  SlideFade,
  Flex,
  Container,
  Center,
  useColorModeValue,
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
    const limit = 5;
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
          if (story.body.length > 200) {
            storiesToShow.push(story);
          }
        }
      })
    );

    const filterByLatest = storiesToShow.sort(
      (a, b) => Number(b.time) - Number(a.time)
    );

    if (
      storyFilter !== "Top" &&
      storyFilter !== "Latest" &&
      storyFilter !== "Most Liked"
    ) {
      const filterByFilter = filterByLatest.filter((a) => {
        if (a.genre === storyFilter) {
          return a;
        }
      });

      if (showAll) {
        setStories(filterByFilter);
      } else {
        setStories(filterByFilter.slice(0, 20));
      }

      return setLoaded(true);
    }

    if (storyFilter === "Top") {
      if (showAll) {
        setStories(
          filterByLatest.sort((a, b) => Number(b.views) - Number(a.views))
        );
      } else {
        setStories(
          filterByLatest
            .sort((a, b) => Number(b.views) - Number(a.views))
            .slice(0, 20)
        );
      }
    }

    if (storyFilter === "Most Liked") {
      if (showAll) {
        setStories(
          filterByLatest.sort((a, b) => Number(b.views) - Number(a.views))
        );
      } else {
        setStories(
          filterByLatest
            .sort((a, b) => Number(b.likes) - Number(a.likes))
            .slice(0, 20)
        );
      }
      return setLoaded(true);
    }

    // default is latest
    if (showAll) {
      setStories(filterByLatest);
    } else {
      setStories(filterByLatest.slice(0, 20));
    }
    return setLoaded(true);
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
          <Tabs variant="line" colorScheme="cyan" mx={{ base: 3, md: 6 }}>
            <TabList>
              <Tab>
                <Heading size="lg">{storyFilter}</Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel px={0} mx={0}>
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
        <GridItem mt={{ base: 3, md: 20 }}>
          <OurPicks />
          <Box
            pos={{ base: "auto", md: "sticky" }}
            top={{ base: "auto", md: "20" }}
          >
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
    "Top",
    "Most Liked",
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
        <SimpleGrid mt={5} columns={2} spacing={3}>
          {Genres.map((item) => (
            <GridItem m={1} key={item}>
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
    "author_zqxph-ufrag-xelru-brcwg-4amzv-dxvcm-ws2eq-qg2jm-7kvnc-ugtig-wqe_story_Crypto%20Girl%20in%20Wonderland_chapter_Chapter%201",
    "author_olrda-tpftz-wwerk-7whnq-s3l47-oq4kh-wvumc-byngh-yzkev-3rwze-pae_story_The%20Crypto%20Vampires%20of%20Nakano_chapter_Reunion%20with%20Takeshi",
    "author_3zgw5-lwcb5-szvtp-tkqbu-zcdmp-qphq3-4gmre-75bbr-airu3-kfyeq-4ae_story_LIT-RPG%20Details_chapter_--",
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
          Our picks ✍️
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
              <Skeleton height="12px" mt={2} ms={1} w={"200px"} />
            </Box>
          ))
        )}
      </Container>
    </Flex>
  );
};
