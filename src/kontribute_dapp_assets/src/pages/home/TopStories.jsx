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
} from "@chakra-ui/react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { AvatarPic } from "../stories/components";
import { NavLink, useLocation } from "react-router-dom";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const TopStories = () => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [stories, setStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const location = useLocation();

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

    const filterByViews = storiesToShow.sort(
      (a, b) => Number(b.views) - Number(a.views)
    );

    setStories(filterByViews.slice(0, 5));
    setLoaded(true);
  };

  useEffect(() => {
    Load();
  }, []);

  return (
    <Box mt={{ base: 5, md: 10 }} justifyContent="center" align="center">
      <Center pb={3}>
        <Heading fontSize={{ base: "xl", lg: "3xl" }}>Top stories</Heading>
      </Center>
      <TableContainer maxW="1050px">
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
              ? stories.map((story) => (
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
    </Box>
  );
};

export default TopStories;
