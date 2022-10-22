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
  Checkbox,
  Box,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../../containers/colormode/Colors";
import { MdOutlineHowToVote } from "react-icons/md";

// visual only element
const PollSection = ({ pollData, storySortKey }) => {
  const [optionSelected, setOption] = useState("");

  const totalVotes = pollData.reduce((accumulator, value) => {
    return accumulator + value.votes;
  }, 0);

  console.log(optionSelected);
  // function here tp place vote
  // have show results option to show each votes result - show when voted and when closed
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  const borderColor = useColorModeValue("#ebeff4", "#373737");
  const selectedColor = useColorModeValue("#3181ce", "#90ccf4");
  return (
    <Flex rounded={"lg"} my={3}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
        <Text
          fontWeight={600}
          color={textColor}
          fontSize={{ base: "md", md: "lg" }}
          mb={2}
        >
          {pollData[0].title}
        </Text>
        <RadioGroup onChange={setOption} value={optionSelected}>
          <Stack spacing={3}>
            {pollData.map((item) => (
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
            ))}
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
            _hover={{
              boxShadow: "md",
            }}
            // onClick={() => addStory()}
          >
            Vote
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
};

export default PollSection;
