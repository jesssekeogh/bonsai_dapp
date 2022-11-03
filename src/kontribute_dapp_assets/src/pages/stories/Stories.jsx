import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  SlideFade,
  Image as ChakraImage,
  HStack,
  Skeleton,
  Flex,
  Tag,
  Container,
  Center,
  SimpleGrid,
  useColorModeValue,
  Avatar,
  Heading,
  Button,
  Stack,
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
import { LoadingSpinner } from "../../containers/index";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";

const Stories = () => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [stories, setStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  const loadLatest = async () => {
    const usersMap = await indexClient.indexCanisterActor.getPKs();

    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    let storiesToShow = [];

    for (let user of usersMap) {
      const stories = await storyServiceClient.query(user, (actor) =>
        actor.scanAllStories(skLowerBound, skUpperBound, limit, ascending)
      );

      const latestStoryFromAuthor = stories[0].value.stories[1].sortKey;

      const storyData = await storyServiceClient.query(user, (actor) =>
        actor.getStory(latestStoryFromAuthor)
      );

      storiesToShow.push(unwrapStory(storyData));
    }

    setStories(storiesToShow);
    setLoaded(true);
  };

  useEffect(() => {
    loadLatest();
    window.scrollTo(0, 0);
  }, []);

  return (
    <Center my={8}>
      {Loaded ? (
        <Tabs variant="line" colorScheme="cyan" mx={3}>
          <TabList>
            <Tab>
              <Heading size="lg">Latest</Heading>
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {stories.map((item) => (
                <StoryCard key={item.groupName} data={{ ...item }} />
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      ) : (
        <LoadingSpinner label="loading stories..." />
      )}
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
            <Avatar size="xs" bg="teal.500" />
            <Text color={"gray.500"}>{`${data.address.substring(
              0,
              5
            )}...${data.address.substring(59, 64)}`}</Text>
            ·
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
            <Tag>{data.genre}</Tag>
            {data.proposals > 1 ? <Tag>Poll ✅</Tag> : null}·
            <Text color={"gray.500"}>{moment(time.getTime()).fromNow()}</Text>
          </Flex>
        </Container>
      </Flex>
    </NavLink>
  );
};
