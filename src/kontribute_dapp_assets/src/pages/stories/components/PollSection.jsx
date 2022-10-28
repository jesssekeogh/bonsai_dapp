import React, { useState, useEffect } from "react";
import {
  Button,
  Text,
  Container,
  Flex,
  Tooltip,
  useBreakpointValue,
  Stack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  createStandaloneToast,
  Spacer,
  useColorModeValue,
  Radio,
  RadioGroup,
  Heading,
  Progress,
  Box,
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
import {
  startIndexClient,
  startStoryServiceClient,
} from "../../CanDBClient/client";
import { useSelector } from "react-redux";

const PollSection = ({ justCreated, pollData, storySortKey }) => {
  const [optionSelected, setOption] = useState("");
  const [optionVotedOn, setOptionVotedOn] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [totalVotes, setTotalVotes] = useState(0);
  const loggedIn = useSelector((state) => state.Profile.loggedIn);

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  let partitionKey = "";
  if (storySortKey) {
    partitionKey = `user_${storySortKey.split("_")[1]}`;
  }

  // function so author can close poll

  const voteOnChoice = async (proposalNumber) => {
    setTotalVotes(totalVotes + 1);
    setShowResults(true);
    setOptionVotedOn(proposalNumber);

    await storyServiceClient.update(partitionKey, "", (actor) =>
      actor.voteOnProposal(proposalNumber, storySortKey)
    );
  };

  const load = async () => {
    setTotalVotes(
      pollData.reduce((accumulator, value) => {
        return Number(accumulator) + Number(value.votes);
      }, 0)
    );

    if (storySortKey && loggedIn) {
      const hasVoted = await storyServiceClient.query(partitionKey, (actor) =>
        actor.checkIfVoted(storySortKey)
      );

      if (hasVoted[0].value) {
        setShowResults(true);
      }
    }
  };

  useEffect(() => {
    load();
  }, [loggedIn]);

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
    <Flex rounded={"lg"} m={3}>
      <Container
        bg={bgColor}
        color={textColor}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
      >
        <Heading fontWeight={600} mb={3} size="md">
          {pollData[0].title}
        </Heading>
        <RadioGroup
          onChange={setOption}
          value={optionSelected}
          defaultValue={optionVotedOn}
        >
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
                        __html: decodeURIComponent(item.body),
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
                          __html: decodeURIComponent(item.body),
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
            Total votes:{" "}
            <Text color={textColor} fontWeight="bold">
              &nbsp;{totalVotes}
            </Text>
          </Box>
          <Box fontSize="sm" color="#b2b8be">
            Status:{" "}
            <Text color={pollData[0].open ? "green" : "red"} fontWeight="bold">
              &nbsp;{pollData[0].open ? "Open" : "Closed"}
            </Text>
          </Box>

          <Spacer />
          <Button
            rightIcon={<MdOutlineHowToVote />}
            boxShadow="base"
            isDisabled={justCreated || showResults || !loggedIn}
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
