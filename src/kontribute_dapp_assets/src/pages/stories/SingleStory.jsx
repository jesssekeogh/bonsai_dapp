import React, { useState, useEffect } from "react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  useColorModeValue,
  Center,
  Stack,
  Box,
  SimpleGrid,
  GridItem,
  Text,
  Hide,
  Button,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { LoadingSpinner } from "../../containers/index";
import { PollSection, StoryUtils } from "./components";
import { useSelector } from "react-redux";
import { Confetti, GetAuthorsSelling } from "../components";
import "../../../assets/main.css";
import { unwrapAllProposals, unwrapStory } from "./components/Unwrapping";
import AuthorsCollectibles from "./components/AuthorsCollectibles";
import * as DOMPurify from "dompurify";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";

const SingleStory = () => {
  const params = useParams();
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const storySortKey = encodeURIComponent(params.storySortKey);
  const loggedIn = useSelector((state) => state.Profile.loggedIn);
  const { identity } = authentication.getAgentOptions();

  const location = useLocation();
  const navigate = useNavigate();

  const partitionKey = `author_${storySortKey.split("_")[1]}`;

  const [storyContent, setStoryContent] = useState({});
  const [proposalsArray, setProposalsArray] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);
  const [authorSelling, setAuthorSelling] = useState([]);

  const loadStory = async () => {
    const storyData = await storyServiceClient.query(partitionKey, (actor) =>
      actor.getStory(storySortKey)
    );

    const result = unwrapStory(storyData);

    if (!result) return;
    let proposals = [];

    if (result.proposals > 1) {
      const proposalData = await storyServiceClient.query(
        partitionKey,
        (actor) => actor.getProposals(storySortKey)
      );

      proposals = unwrapAllProposals(proposalData);
    }

    const hasVoted = await storyServiceClient.query(partitionKey, (actor) =>
      actor.checkIfVoted(storySortKey)
    );

    if (hasVoted[0].value) {
      setHasVoted(true);
    }

    setAuthorSelling(await GetAuthorsSelling(result.monetizedAddress));

    setStoryContent(result);
    setProposalsArray(proposals);
    setLoaded(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadStory();
  }, [loggedIn, identity]);

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Box py={{ base: 0, md: 10, lg: 12 }} pb={{ base: 10 }}>
      {loaded ? (
        <Center>
          {location.state ? (
            location.state.showConfetti ? (
              <Confetti />
            ) : null
          ) : null}
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            templateColumns={{ base: "auto", lg: "1fr 500px" }}
          >
            {/* for mobile: */}
            <Hide above="md">
              <GridItem>
                <StoryUtils
                  storySortKey={storySortKey}
                  likes={Number(storyContent.likes)}
                  views={storyContent.views.toLocaleString()}
                  partitionKey={partitionKey}
                  loggedIn={loggedIn}
                  address={storyContent.address}
                  author={storyContent.author}
                  monetized={storyContent.monetized}
                  identity={identity}
                  runIncrement={true}
                />
                <AuthorsCollectibles
                  address={storyContent.monetizedAddress}
                  tokens={authorSelling}
                />
              </GridItem>
            </Hide>
            <GridItem
              boxShadow={"lg"}
              bg={bgColor}
              p={{ base: 0, lg: 2 }}
              borderRadius="lg"
              ml={{ base: 0, lg: 20 }}
              mr={{ base: 0, md: 6 }}
              mb={3}
            >
              <Container
                minW={{ lg: "2xl" }}
                minH="2xl"
                color={textColor}
                className={"ql-container"}
                pb={3}
              >
                <Stack p={2} pb={4} align="center">
                  <Text
                    fontSize="34px"
                    fontFamily="'Times New Roman', Times, serif"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {DOMPurify.sanitize(
                      decodeURIComponent(storyContent.groupName),
                      { FORBID_ATTR: ["style"], FORBID_TAGS: ["style"] }
                    )}
                  </Text>
                  <Text
                    fontSize="28px"
                    fontFamily="'Times New Roman', Times, serif"
                    fontWeight="bold"
                    textAlign="center"
                  >
                    {DOMPurify.sanitize(
                      decodeURIComponent(storyContent.title),
                      { FORBID_ATTR: ["style"], FORBID_TAGS: ["style"] }
                    )}
                  </Text>
                </Stack>
                <Text
                  lineHeight={1.5}
                  fontSize={"21px"}
                  fontFamily="'Times New Roman', Times, serif"
                  wordBreak="break-word"
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(
                      decodeURIComponent(storyContent.body),
                      { FORBID_ATTR: ["style"], FORBID_TAGS: ["style", "pre"] }
                    ),
                  }}
                />
              </Container>
            </GridItem>
            <GridItem>
              <Box
                pos={{ base: "auto", md: "sticky" }}
                top={{ base: "auto", md: "20" }}
              >
                <Hide below="md">
                  <StoryUtils
                    storySortKey={storySortKey}
                    likes={Number(storyContent.likes)}
                    views={storyContent.views.toLocaleString()}
                    partitionKey={partitionKey}
                    loggedIn={loggedIn}
                    address={storyContent.address}
                    author={storyContent.author}
                    monetized={storyContent.monetized}
                    identity={identity}
                    runIncrement={false}
                  />
                  <AuthorsCollectibles
                    address={storyContent.monetizedAddress}
                    tokens={authorSelling}
                  />
                </Hide>
                {/* takes in an array of objects */}
                {storyContent.proposals > 1 ? (
                  <PollSection
                    justCreated={false}
                    pollData={proposalsArray}
                    storySortKey={storySortKey}
                    hasVoted={hasVoted}
                    monetized={storyContent.monetized}
                    monetizedAddress={storyContent.monetizedAddress}
                  />
                ) : null}
                <Center>
                  <Button
                    leftIcon={<ArrowBackIcon />}
                    _hover={{ boxShadow: "base" }}
                    mb={3}
                    onClick={() =>
                      location.state
                        ? navigate(location.state.previous)
                        : navigate("/stories")
                    }
                  >
                    <Text>Go Back</Text>
                  </Button>
                </Center>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Center>
      ) : (
        <LoadingSpinner label="loading story..." />
      )}
    </Box>
  );
};

export default SingleStory;
