import React, { useState, useEffect } from "react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { useParams } from "react-router-dom";
import {
  Container,
  useColorModeValue,
  Center,
  Stack,
  Box,
  SimpleGrid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import { LoadingSpinner } from "../../containers/index";
import PollSection from "./components/PollSection";
import { useSelector } from "react-redux";

const unwrapStory = (data) => {
  for (let settledResult of data) {
    // handle settled result if fulfilled
    if (
      settledResult.status === "fulfilled" &&
      settledResult.value.length > 0
    ) {
      return Array.isArray(settledResult.value)
        ? settledResult.value[0]
        : settledResult.value;
    }
  }
};

const unwrapProposal = (data) => {
  for (let settledResult of data) {
    // handle settled result if fulfilled
    if (settledResult.status === "fulfilled" && "ok" in settledResult.value) {
      return Array.isArray(settledResult.value.ok)
        ? settledResult.value.ok[0]
        : settledResult.value.ok;
    }
  }
};

const SingleStory = () => {
  const params = useParams();
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const storySortKey = params.storySortKey;
  const loggedIn = useSelector((state) => state.Profile.loggedIn);

  const partitionKey = `user_${storySortKey.split("_")[1]}`;

  const [storyContent, setStoryContent] = useState({});
  const [proposalsArray, setProposalsArray] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const loadStory = async () => {
    const storyData = await storyServiceClient.query(partitionKey, (actor) =>
      actor.getStory(encodeURIComponent(storySortKey))
    );

    const result = unwrapStory(storyData);

    if (!result) return;
    let proposals = [];

    if (result.proposals > 1) {
      for (let i = 0; i < result.proposals; i++) {
        let proposalSK = `proposal_${i + 1}_for_${encodeURIComponent(
          storySortKey
        )}`;

        const proposal = await storyServiceClient.query(partitionKey, (actor) =>
          actor.getProposal(proposalSK)
        );

        proposals.push(unwrapProposal(proposal));
      }
    }

    const hasVoted = await storyServiceClient.query(partitionKey, (actor) =>
      actor.checkIfVoted(storySortKey)
    );
    
    if (hasVoted[0].value) {
      setHasVoted(true);
    }

    setStoryContent(result);
    setProposalsArray(proposals);
    setLoaded(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadStory();
  }, [loggedIn]);

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Box py={{ base: 5, md: 5, lg: 12 }} pb={{ base: 10 }}>
      {loaded ? (
        <Center>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            templateColumns={{ base: "auto", lg: "1fr 500px" }}
          >
            <GridItem
              boxShadow={"lg"}
              bg={bgColor}
              p={{ base: 0, lg: 2 }}
              borderRadius="lg"
              ml={{ base: 0, lg: 20 }}
            >
              <Container minW={{ lg: "2xl" }} minH="2xl" color={textColor}>
                <Stack p={2} pb={4} align="center">
                  <Text
                    fontSize="34px"
                    fontFamily="'Times New Roman', Times, serif"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {decodeURIComponent(storyContent.groupName)}
                  </Text>
                  <Text
                    fontSize="28px"
                    fontFamily="'Times New Roman', Times, serif"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {decodeURIComponent(storyContent.title)}
                  </Text>
                </Stack>
                <Text
                  lineHeight={1.5}
                  fontSize={"21px"}
                  fontFamily="'Times New Roman', Times, serif"
                  dangerouslySetInnerHTML={{
                    __html: decodeURIComponent(storyContent.body),
                  }}
                  mb={20}
                />
              </Container>
            </GridItem>
            <GridItem>
              <Box
                pos={{ base: "auto", md: "sticky" }}
                top={{ base: "auto", md: "20" }}
              >
                {/* takes in an array of objects */}
                {storyContent.proposals > 1 ? (
                  <PollSection
                    justCreated={false}
                    pollData={proposalsArray}
                    storySortKey={encodeURIComponent(storySortKey)}
                    setLoaded={setLoaded}
                  />
                ) : null}
              </Box>
            </GridItem>
          </SimpleGrid>
        </Center>
      ) : (
        <LoadingSpinner label="fetching story..." />
      )}
    </Box>
  );
};

export default SingleStory;
