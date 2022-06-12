import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  Stack,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  Spacer,
} from "@chakra-ui/react";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../../declarations/story";

const StorySummary = ({ storyId }) => {
  const [storyData, setStoryData] = useState({});
  const [loaded, setLoaded] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const loadSummary = async () => {
    let summary = await storyMo.getSummary(storyId);
    setStoryData(summary.ok);
    setLoaded(true);
  };

  useEffect(() => {
    loadSummary();
  }, []);

  return (
    <NavLink to={"/stories/story/" + storyId}>
      <Box
        w={"full"}
        border={"double"}
        borderRadius="lg"
        backgroundColor="#16171b"
        boxShadow={"2xl"}
        overflow={"hidden"}
        height={["180px", null, "220px"]}
      >
        <Box p={[3, null, 6]}>
          <Stack spacing={0} align={"left"} mb={5}>
            {loaded ? (
              <Heading
                fontSize={["md", null, "xl"]}
                bgGradient="linear(to-t, #705025, #a7884a)"
                bgClip="text"
              >
                {loaded ? storyData.title : <Skeleton />}
              </Heading>
            ) : (
              <Skeleton height="20px" mb={3} width="120px" />
            )}
            {loaded ? (
              <Box minH={"50px"}>
                <Text
                  fontWeight={600}
                  color="#f0e6d3"
                  fontSize={["8pt", null, "md"]}
                >
                  {storyData.summary}
                </Text>
              </Box>
            ) : (
              <SkeletonText mt="4" noOfLines={4} spacing="2" />
            )}
          </Stack>
          {loaded ? (
            <>
              <Text mt={1} color={"gray.500"} fontSize={["6pt", null, "sm"]}>
                Story ID: {storyData.storyId.toString()}
              </Text>
              <Spacer />
              <Text mt={1} color={"gray.500"} fontSize={["6pt", null, "sm"]}>
                Author:{" "}
                {`${storyData.author
                  .toString()
                  .substring(0, 10)}...${storyData.author
                  .toString()
                  .substring(55, 63)}`}
              </Text>
            </>
          ) : (
            <>
              <br></br>
              <Skeleton height="15px" width="80px" />
            </>
          )}
        </Box>
      </Box>
    </NavLink>
  );
};

export default StorySummary;
