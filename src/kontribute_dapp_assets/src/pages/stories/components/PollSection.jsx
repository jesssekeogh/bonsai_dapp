import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  Container,
  Flex,
  Tooltip,
  Stack,
  Spacer,
  useColorModeValue,
  Radio,
  RadioGroup,
  Heading,
  Progress,
  IconButton,
  Box,
  Tag,
  TagLeftIcon,
} from "@chakra-ui/react";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
  TextColorDark,
  TextColorLight,
} from "../../../containers/colormode/Colors";
import { MdOutlineHowToVote } from "react-icons/md";
import { LockIcon } from "@chakra-ui/icons";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../../CanDBClient/client";
import { useSelector } from "react-redux";
import { FailedToast } from "../../../containers/toasts/Toasts";
import { GetMine } from "../../components/index";
import { nft_fetch, useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import * as DOMPurify from "dompurify";

const PollSection = ({
  justCreated,
  pollData,
  storySortKey,
  hasVoted,
  monetized,
  monetizedAddress,
}) => {
  const [optionSelected, setOption] = useState("");
  const [optionVotedOn, setOptionVotedOn] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const loggedIn = useSelector((state) => state.Profile.loggedIn);
  const userId = useSelector((state) => state.Profile.principal);
  const anvilDispatch = useAnvilDispatch();
  // working state:
  const [closingPoll, setClosingPoll] = useState(false);
  const [votingPoll, setVotingPoll] = useState(false);
  const [pollClosed, setPollClosed] = useState(false);

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  let author = "";
  let partitionKey = "";

  if (storySortKey) {
    author = storySortKey.split("_")[1];
    partitionKey = `author_${author}`;
  }

  const closePoll = async () => {
    setClosingPoll(true);

    try {
      await storyServiceClient.update(partitionKey, "", (actor) =>
        actor.closeProposals(storySortKey)
      );

      setClosingPoll(false);
      setPollClosed(true);
      setShowResults(true);
    } catch (e) {
      setClosingPoll(false);
      FailedToast("Failed", e.toString());
    }
  };

  const CheckIfOwns = async () => {
    let tokens = await anvilDispatch(GetMine());
    for (let token of tokens) {
      try {
        let { author } = await anvilDispatch(nft_fetch(tokenToText(token)));
        if (author == monetizedAddress) {
          return true;
        }
      } catch (e) {
        console.log(e.toString());
      }
    }

    return false;
  };

  const voteOnChoice = async (proposalNumber) => {
    setVotingPoll(true);

    if (monetized) {
      let owns = await CheckIfOwns();
      console.log(owns);
      if (!owns) {
        setVotingPoll(false);
        return FailedToast(
          "Failed",
          "You do not own any of this authors collectibles"
        );
      }
    }
    setOptionVotedOn(proposalNumber);

    try {
      await storyServiceClient.update(partitionKey, "", (actor) =>
        actor.voteOnProposal(proposalNumber, storySortKey)
      );

      setTotalVotes(totalVotes + 1);
      setShowResults(true);
      setVotingPoll(false);
    } catch (e) {
      setVotingPoll(false);
      FailedToast("Failed", e.toString());
    }
  };

  const load = async () => {
    setTotalVotes(
      pollData.reduce((accumulator, value) => {
        return Number(accumulator) + Number(value.votes);
      }, 0)
    );

    if (storySortKey && loggedIn) {
      if (hasVoted) {
        setShowResults(true);
      }
    }

    if (!pollData[0].open || pollClosed) {
      setShowResults(true);
    }
  };

  useEffect(() => {
    load();
  }, [loggedIn, hasVoted]);

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  const borderColor = useColorModeValue("#ebeff4", "#373737");
  const selectedColor = useColorModeValue("#3181ce", "#90ccf4");
  const buttonText = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  const buttonBg = useColorModeValue(ButtonColorLight, ButtonColorDark);
  return (
    <Flex rounded={"lg"} mb={3}>
      <Container
        bg={bgColor}
        color={textColor}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
      >
        <Flex align="center" mb={3}>
          <Heading fontWeight={600} size="md" flex="1">
            {pollData[0].title}
          </Heading>
          {monetized ? (
            <Tag colorScheme="red">
              <TagLeftIcon boxSize="12px" as={LockIcon} />
              Gated
            </Tag>
          ) : null}
        </Flex>
        <RadioGroup onChange={setOption} value={optionSelected}>
          <Stack spacing={3}>
            {!showResults
              ? pollData.map((item) => (
                  <Radio
                    key={item.proposalNumber}
                    size="lg"
                    colorScheme="blue"
                    value={item.proposalNumber.toString()}
                  >
                    {" "}
                    <Text
                      p={2}
                      borderRadius="lg"
                      border="solid 2px"
                      borderColor={
                        optionSelected == item.proposalNumber.toString()
                          ? selectedColor
                          : borderColor
                      }
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          decodeURIComponent(item.body),
                          { FORBID_ATTR: ["style"], FORBID_TAGS: ["style"] }
                        ),
                      }}
                    />
                  </Radio>
                ))
              : null}
            {showResults
              ? pollData.map((item) => (
                  <Box key={item.proposalNumber}>
                    <Radio
                      size="lg"
                      colorScheme="blue"
                      value={item.proposalNumber.toString()}
                      isDisabled
                    >
                      {" "}
                      <Text
                        p={2}
                        borderRadius="lg"
                        border="solid 2px"
                        borderColor={
                          optionSelected == item.proposalNumber.toString()
                            ? selectedColor
                            : borderColor
                        }
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            decodeURIComponent(item.body),
                            { FORBID_ATTR: ["style"], FORBID_TAGS: ["style"] }
                          ),
                        }}
                      />
                    </Radio>
                    <Stack mt={1} mb={3} mx={7}>
                      <Text size="xs" color="gray">
                        {optionVotedOn === item.proposalNumber.toString()
                          ? Math.round(
                              ((Number(item.votes) + 1) / totalVotes) * 100
                            )
                          : Math.round((Number(item.votes) / totalVotes) * 100)}
                        %
                      </Text>
                      <Progress
                        borderRadius="lg"
                        value={
                          optionVotedOn === item.proposalNumber.toString()
                            ? Math.round(
                                ((Number(item.votes) + 1) / totalVotes) * 100
                              )
                            : Math.round(
                                (Number(item.votes) / totalVotes) * 100
                              )
                        }
                      />
                    </Stack>
                  </Box>
                ))
              : null}
          </Stack>
        </RadioGroup>
        <Flex mt={5} align="center" gap={6} overflow="hidden">
          <Box fontSize="sm" color="#b2b8be">
            Votes:{" "}
            <Text color={textColor} fontWeight="bold">
              &nbsp;{totalVotes}
            </Text>
          </Box>
          <Box fontSize="sm" color="#b2b8be">
            Status:{" "}
            <Text
              color={pollData[0].open && !pollClosed ? "green" : "red"}
              fontWeight="bold"
            >
              &nbsp;{pollData[0].open && !pollClosed ? "Open" : "Closed"}
            </Text>
          </Box>

          <Spacer />
          {author === userId ? (
            <Tooltip label="Close poll">
              <IconButton
                icon={<LockIcon />}
                isLoading={closingPoll}
                isDisabled={!pollData[0].open || pollClosed}
                me={-4}
                onClick={() => closePoll()}
              />
            </Tooltip>
          ) : null}
          <Button
            rightIcon={<MdOutlineHowToVote />}
            boxShadow="base"
            isDisabled={
              justCreated || showResults || !loggedIn || optionSelected === ""
            }
            isLoading={votingPoll}
            bg={buttonBg}
            color={buttonText}
            _hover={{
              boxShadow: "md",
            }}
            onClick={() => voteOnChoice(optionSelected)}
          >
            Vote
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
};

export default PollSection;
