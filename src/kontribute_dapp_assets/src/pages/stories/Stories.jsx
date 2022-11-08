import React, { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { unwrapStory } from "./components/Unwrapping";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { ViewIcon, SpinnerIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import AvatarPic from "./components/AvatarPic";

const Stories = () => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [stories, setStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  const [storiesShowing, setStoriesShowing] = useState(8);

  const loadLatest = async () => {
    console.time("loop");
    const usersMap = await indexClient.indexCanisterActor.getPKs();

    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    let storiesToShow = [];
    let storyPromises = [];

    // simple getLatest algo, a more advanced algo is needed later on:
    for (let user of usersMap) {
      if (storyPromises.length < storiesShowing) {
        const stories = await storyServiceClient.query(user, (actor) =>
          actor.scanAllStories(skLowerBound, skUpperBound, limit, ascending)
        );

        const latestStoryFromAuthor = stories[0].value.stories;

        for (let story of latestStoryFromAuthor) {
          if (storyPromises.length < storiesShowing) {
            const storyData = storyServiceClient.query(user, (actor) =>
              actor.getStory(story.sortKey)
            );
            storyPromises.push(storyData);
          } else {
            break;
          }
        }
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
    console.timeEnd("loop");
  };

  useEffect(() => {
    loadLatest();
  }, [storiesShowing]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Center my={8} pb={10}>
      <Tabs variant="line" colorScheme="cyan" mx={3}>
        <TabList>
          <Tab>
            <Heading size="lg">Latest</Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <SlideFade in={true} offsetY="20px">
              {Loaded ? (
                <>
                  {stories.map((item) => (
                    <StoryCard key={item.groupName} data={{ ...item }} />
                  ))}
                  <Center>
                    <Button
                      onClick={() => {
                        setLoaded(false);
                        setStoriesShowing(storiesShowing + 5);
                      }}
                      leftIcon={<SpinnerIcon />}
                    >
                      Load more...
                    </Button>
                  </Center>
                </>
              ) : (
                <>
                  {stories.map((item) => (
                    <StoryCard key={item.groupName} data={{ ...item }} />
                  ))}
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
    </Center>
  );
};
export default Stories;

const StoryCard = ({ data }) => {
  let created = Number(data.time) / 1000000;

  const time = new Date(created);

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <NavLink
      to={`/stories/author_${data.author}_story_${data.groupName}_chapter_${data.title}`}
    >
      <Flex rounded={"lg"} my={3} _hover={{ boxShadow: "md" }}>
        <Container
          bg={bgColor}
          color={textColor}
          boxShadow={"xl"}
          rounded={"lg"}
          p={4}
        >
          <Flex align="center" gap={2}>
            <AvatarPic
              author={data.author}
              address={data.address}
              smallView={true}
            />
            ·<Text color={"gray.500"}>{moment(time.getTime()).fromNow()}</Text>
          </Flex>
          <Heading size={"md"} mt={1} noOfLines={1}>
            {decodeURIComponent(data.groupName)}
          </Heading>
          <Heading size={"sm"} my={2} noOfLines={1}>
            {decodeURIComponent(data.title)}
          </Heading>
          <Text noOfLines={2}>
            {decodeURIComponent(data.body).replace(/(<([^>]+)>)/gi, " ")}
          </Text>
          <Flex mt={3} gap={2} align={"center"}>
            <Tag>{data.genre}</Tag>·
            {/* {data.proposals > 1 ? <Tag>Poll ✅</Tag> : null}· */}
            <Button
              bg={"none"}
              p={0}
              m={0}
              size="sm"
              color="gray.500"
              leftIcon={<ViewIcon />}
              _hover={{ bg: "none", cursor: "default" }}
            >
              {data.views.toString()}
            </Button>
            ·
            <Button
              bg={"none"}
              p={0}
              m={0}
              size="sm"
              color="gray.500"
              leftIcon={<FaHeart />}
              _hover={{ bg: "none", cursor: "default" }}
            >
              {data.likes.toString()}
            </Button>
          </Flex>
        </Container>
      </Flex>
    </NavLink>
  );
};

const LoadingStoryCard = () => {
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Flex rounded={"lg"} my={3} _hover={{ boxShadow: "md" }}>
      <Container
        bg={bgColor}
        color={textColor}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
      >
        <Flex align="center" gap={2}>
          <SkeletonCircle size="8" />
          <Skeleton height="15px" w={"100px"} />
        </Flex>
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          w={{ base: "250px", md: "550px" }}
        />
      </Container>
    </Flex>
  );
};
