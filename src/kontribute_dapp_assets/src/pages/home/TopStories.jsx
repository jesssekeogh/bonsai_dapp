import React, { useState, useEffect } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Center,
  Box,
  Heading,
  Text,
  SkeletonCircle,
  Skeleton,
  Flex,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { AvatarPic } from "../stories/components";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import moment from "moment";

const TopStories = () => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const [stories, setStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);

  const Load = async () => {
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

    setStories(storiesToShow);
    setLoaded(true)
  };

  useEffect(() => {
    Load();
  }, []);

  return (
    <Box mt={{ base: 7, md: 10 }} justifyContent="center" align="center">
      <Center pb={3}>
        <Heading fontSize={{ base: "2xl", lg: "3xl" }}>Top stories</Heading>
      </Center>
      <Tabs variant="line" colorScheme="cyan" maxW="1200px">
        <TabList>
          <Tab>
            <Heading fontSize="xl">All</Heading>
          </Tab>
          <Tab>
            <Heading fontSize="xl">Month</Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0} mx={0}>
            <TopStoriesAll showAll stories={stories} Loaded={Loaded} />
          </TabPanel>
          <TabPanel px={0} mx={0}>
            <TopStoriesAll showMonth stories={stories} Loaded={Loaded}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

const TopStoriesAll = ({ showAll, showMonth, stories, Loaded }) => {
  const [tabStories, setTabStories] = useState([]);
  const location = useLocation();

  const Load = () => {
    if (showAll) {
      const filterByViews = stories.sort(
        (a, b) => Number(b.views) - Number(a.views)
      );
      setTabStories(filterByViews.slice(0, 5));
    } else if (showMonth) {
      let lastmonth = moment().subtract(1, "months");
      let toShow = [];

      for (let story of stories) {
        let created = Number(story.time) / 1000000;
        let time = new Date(created);

        if (moment(time.getTime()).isAfter(lastmonth)) {
          toShow.push(story);
        }
      }
      const filterByViews = toShow.sort(
        (a, b) => Number(b.views) - Number(a.views)
      );
      setTabStories(filterByViews.slice(0, 5));
    }
  };

  useEffect(() => {
    Load();
  }, [Loaded]);

  return (
    <TableContainer>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Author</Th>
            <Th>Title</Th>
            <Th>Views</Th>
          </Tr>
        </Thead>
        <Tbody>
          {!Loaded
            ? [...Array(5).keys()].map((item) => (
                <Tr key={item}>
                  <Td>
                    <Flex align="center" gap={2}>
                      <SkeletonCircle size="8" />
                      <Skeleton height="15px" w={"120px"} />
                    </Flex>
                  </Td>
                  <Td>
                    <Skeleton height="15px" w={"200px"} />
                  </Td>
                  <Td>
                    <Skeleton height="15px" w={"50px"} />
                  </Td>
                </Tr>
              ))
            : null}
          {Loaded
            ? tabStories.map((story) => (
                <Tr key={story.time}>
                  <Td>
                    <AvatarPic
                      author={story.author}
                      address={story.address}
                      smallView={true}
                      monetized={story.monetized}
                    />
                  </Td>
                  <Td>
                    <NavLink
                      to={`/stories/author_${story.author}_story_${story.groupName}_chapter_${story.title}`}
                      state={{ previous: location.pathname }}
                    >
                      <Heading size={"sm"} noOfLines={1}>
                        {decodeURIComponent(story.title)}
                      </Heading>
                    </NavLink>
                  </Td>
                  <Td>
                    <Heading size={"sm"} noOfLines={1}>
                      {story.views.toLocaleString()}
                    </Heading>
                  </Td>
                </Tr>
              ))
            : null}
        </Tbody>
        <Tfoot>
          <Tr>
            <Th></Th>
            <Th></Th>
            <Th>
              <NavLink to={"/stories"}>
                <Text as="u">
                  View all
                  <ArrowForwardIcon mx={2} />
                </Text>
              </NavLink>
            </Th>
          </Tr>
        </Tfoot>
      </Table>
    </TableContainer>
  );
};

export default TopStories;
