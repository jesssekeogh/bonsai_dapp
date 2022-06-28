import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Box,
  Stack,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  Spacer,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../../declarations/story";
import { useSelector } from "react-redux";

const StorySummary = ({ storyId }) => {
  const isLogged = useSelector((state) => state.Profile.loggedIn);
  const path = useLocation();
  let isMounted = true;
  const [storyData, setStoryData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const checkIfLiked = async () => {
    if (!isLogged) return;

    let liked = await storyMo.getUserLikedStories();

    if (isMounted) {
      setIsLiked(liked.ok.includes(BigInt(storyId)));
    }
  };

  const loadSummary = async () => {
    let summary = await storyMo.get(storyId);

    if (isMounted) {
      setStoryData(summary.ok);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadSummary();
    checkIfLiked();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <NavLink to={"/stories/story/" + storyId} state={{ prev: path.pathname }}>
      <Box
        w={"full"}
        border={"double"}
        borderRadius="lg"
        backgroundColor="#16171b"
        boxShadow={"2xl"}
        height={["150px", null, "220px"]}
      >
        <Box
          p={[3, null, 6]}
          overflow={"hidden"}
          height={["150px", null, "220px"]}
        >
          <Stack
            spacing={0}
            align={"left"}
            mb={5}
            height={["75px", null, "125px"]}
            overflow="hidden"
          >
            {loaded ? (
              <Heading
                fontSize={["8pt", null, "lg"]}
                bgGradient="linear(to-t, #705025, #a7884a)"
                bgClip="text"
              >
                {loaded ? storyData.story.title : <Skeleton />}
              </Heading>
            ) : (
              <Skeleton height="20px" mb={3} width="120px" />
            )}
            {loaded ? (
              <Text
                fontWeight={600}
                color="#f0e6d3"
                fontSize={["7pt", null, "md"]}
                dangerouslySetInnerHTML={{
                  __html:
                    decodeURIComponent(storyData.story.story).substring(0, 70) +
                    "...",
                }}
              />
            ) : (
              <SkeletonText mt="4" noOfLines={4} spacing="2" />
            )}
          </Stack>
          {loaded ? (
            <>
              <Flex m={1}>
                <Stack direction="column">
                  <Text
                    mt={1}
                    color={"gray.500"}
                    fontSize={["6pt", null, "sm"]}
                  >
                    Story ID: {storyData.storyId.toString()}
                  </Text>
                </Stack>
                <Spacer />
                <TotalLikes
                  likes={storyData.totalVotes.toString()}
                  isLiked={isLiked}
                />
              </Flex>
            </>
          ) : (
            <Flex>
              <Skeleton height="15px" width="80px" />
              <Spacer />
              <Skeleton height="20px" width="40px" />
            </Flex>
          )}
        </Box>
      </Box>
    </NavLink>
  );
};

const TotalLikes = ({ likes, isLiked }) => {
  return (
    <Button
      maxW={"100px"}
      align={"center"}
      borderRadius="md"
      bg="#0fbdde"
      color="black"
      fontWeight="semibold"
      size={"xs"}
      fontSize={{ base: "xs", md: "sm" }}
      py={{ base: 0, md: 0.5 }}
      px={{ base: 1, md: 2 }}
      leftIcon={isLiked ? <FaHeart /> : <FaRegHeart />}
    >
      {likes}
    </Button>
  );
};

export default StorySummary;
