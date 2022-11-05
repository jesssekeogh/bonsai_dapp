import React, { useState, useEffect } from "react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { useParams, useLocation } from "react-router-dom";
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
import { PollSection, StoryUtils } from "./components";
import { useSelector } from "react-redux";
import { Confetti } from "../components";
import "../../../assets/main.css";
import { unwrapProposal, unwrapStory } from "./components/Unwrapping";

const SingleStory = () => {
  const params = useParams();
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const storySortKey = encodeURIComponent(params.storySortKey);
  const loggedIn = useSelector((state) => state.Profile.loggedIn);
  const location = useLocation();
  console.log(location.state);

  const partitionKey = `user_${storySortKey.split("_")[1]}`;

  const [storyContent, setStoryContent] = useState({});
  const [proposalsArray, setProposalsArray] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const loadStory = async () => {
    const storyData = await storyServiceClient.query(partitionKey, (actor) =>
      actor.getStory(storySortKey)
    );

    const result = unwrapStory(storyData);

    if (!result) return;
    let proposals = [];

    if (result.proposals > 1) {
      for (let i = 0; i < result.proposals; i++) {
        let proposalSK = `proposal_${i + 1}_for_${storySortKey}`;

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
    <Box py={{ base: 0, md: 5, lg: 12 }} pb={{ base: 10 }}>
      {loaded ? (
        <Center>
          {location.state ? <Confetti /> : null}
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
              m={2}
            >
              <Container
                minW={{ lg: "2xl" }}
                minH="2xl"
                color={textColor}
                className={"ql-container"}
              >
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
                />
              </Container>
            </GridItem>
            <GridItem>
              <Box
                pos={{ base: "auto", md: "sticky" }}
                top={{ base: "auto", md: "20" }}
              >
                <StoryUtils
                  storySortKey={storySortKey}
                  likes={Number(storyContent.likes)}
                  views={storyContent.views.toLocaleString()}
                  partitionKey={partitionKey}
                  loggedIn={loggedIn}
                  address={storyContent.address}
                  author={storyContent.author}
                />
                {/* takes in an array of objects */}
                {storyContent.proposals > 1 ? (
                  <PollSection
                    justCreated={false}
                    pollData={proposalsArray}
                    storySortKey={storySortKey}
                    hasVoted={hasVoted}
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
