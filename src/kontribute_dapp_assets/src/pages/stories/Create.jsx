import React, { useState, useEffect, useReducer } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import {
  Container,
  Input,
  Text,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  HStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormErrorMessage,
  createStandaloneToast,
  FormControl,
  FormLabel,
  useDisclosure,
  Divider,
  Center,
  Tooltip,
  Stack,
  Box,
  IconButton,
  Textarea,
  SimpleGrid,
  GridItem,
  Switch,
} from "@chakra-ui/react";
import {
  AddIcon,
  CheckIcon,
  ChevronDownIcon,
  EditIcon,
} from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";
import { BiPoll } from "react-icons/bi";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { useSelector } from "react-redux";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../containers/toasts/Toasts";
import { PollSection, PutAuthor } from "./components";
import { LoadingSpinner } from "../../containers/index";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { Usergeek } from "usergeek-ic-js";
import "../../../assets/main.css";

const { toast } = createStandaloneToast();

const reducer = (state, action) => {
  switch (action.type) {
    case "updateGroupName":
      return {
        ...state,
        groupName: action.payload,
      };
    case "updateTitle":
      return {
        ...state,
        title: action.payload,
      };
    case "updateBody":
      return {
        ...state,
        body: action.payload,
      };
    case "updateGenre":
      return {
        ...state,
        genre: action.payload,
      };
    case "updateMonetized":
      return {
        ...state,
        monetized: action.payload,
      };
    case "updateMonetizedAddress":
      return {
        ...state,
        monetizedAddress: action.payload,
      };
  }
};

const Create = () => {
  const userId = useSelector((state) => state.Profile.principal);
  const address = useAnvilSelector((state) => state.user.address);

  const partitionKey = `author_${userId}`;
  const [storyOption, setStoryOption] = useState("New story"); // or new chapter
  const [myStories, setMyStories] = useState([]); // array of author stories returned from backend
  const [publishDisable, setPublishDisable] = useState(false);

  const [proposalsArray, setProposalsArray] = useState([
    {
      proposalNumber: 0,
      title: "",
      body: "",
      votes: 0,
      open: true,
    },
  ]); // sent from poll option

  const [storyState, dispatch] = useReducer(reducer, {
    groupName: "", // overall story title
    title: "", // individual story title
    body: "Write your story...",
    genre: "",
    likes: 0,
    views: 0,
    author: userId,
    address: address,
    time: 0,
    proposals: 0,
    monetized: false,
    monetizedAddress: address,
  });

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const navigate = useNavigate();

  const addStory = async () => {
    if (storyOption === "New chapter" && storyState.groupName === "") {
      return FailedToast("Failed", "Please pick a story to add a chapter!");
    }

    if (storyState.groupName === "" || storyState.title === "") {
      return FailedToast("Failed", "Story fields cannot be empty!");
    } else if (storyState.genre === "") {
      return FailedToast("Failed", "Please pick a genre!");
    } else if (
      storyState.monetizedAddress.toLowerCase().substring(0, 3) !== "a00"
    ) {
      return FailedToast("Failed", "Invalid address!");
    }

    setPublishDisable(true);
    SendingToast("Publishing story...");

    const can =
      await indexClient.indexCanisterActor.createStoryServiceCanisterParitition();
    console.log("Your canister:", can);
    try {
      const keys = await storyServiceClient.update(partitionKey, "", (actor) =>
        actor.putStory(
          {
            groupName: encodeURIComponent(storyState.groupName),
            title: encodeURIComponent(storyState.title),
            body: encodeURIComponent(storyState.body),
            genre: storyState.genre,
            likes: storyState.likes,
            views: storyState.views,
            author: storyState.author,
            address: storyState.address,
            time: storyState.time,
            proposals: proposalsArray.length,
            responses: 0,
            monetized: storyState.monetized,
            monetizedAddress: storyState.monetizedAddress,
          },
          proposalsArray
        )
      );
      toast.closeAll();
      SuccessToast("Success", "Congratulations your story is published!");
      setPublishDisable(false);
      Usergeek.trackEvent("StoryPosted");

      let sk = keys.replace("STORY SORT KEY: ", "");
      return navigate(`/stories/${sk}`, {
        state: { showConfetti: true, previous: "/stories/create" },
      });
    } catch (e) {
      toast.closeAll();
      FailedToast("Failed", e.toString());
      setPublishDisable(false);
    }
  };

  const getMyStories = async () => {
    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    const stories = await storyServiceClient.query(partitionKey, (actor) =>
      actor.scanAllStories(skLowerBound, skUpperBound, limit, ascending)
    );

    if (stories.length > 0 && stories[0].value.stories.length > 0) {
      let authorStories = stories[0].value.stories;
      let newArray = [];

      for (let story of authorStories) {
        newArray.push(decodeURIComponent(story.groupName).toLocaleLowerCase());
      }

      let noDuplicates = [...new Set(newArray)];
      setMyStories(noDuplicates);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (userId) {
      getMyStories();
    }
  }, [userId]);

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Box py={{ base: 5, md: 5, lg: 12 }} pb={{ base: 10 }}>
      {userId ? (
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
              mr={{ base: 0, md: 3 }}
              mb={3}
            >
              <Container
                minW={{ lg: "2xl" }}
                pb={3}
                minH="2xl"
                color={textColor}
              >
                <Stack p={2} pb={4} align="center">
                  {storyOption === "New story" ? (
                    <Input
                      placeholder="Title"
                      variant="unstyled"
                      textAlign="center"
                      size="lg"
                      fontSize="34px"
                      fontFamily="'Times New Roman', Times, serif"
                      fontWeight="bold"
                      onChange={(e) =>
                        dispatch({
                          type: "updateGroupName",
                          payload: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <PickChapter myStories={myStories} dispatch={dispatch} />
                  )}
                  <Input
                    placeholder="Chapter"
                    variant="unstyled"
                    textAlign="center"
                    size="lg"
                    fontSize="28px"
                    fontFamily="'Times New Roman', Times, serif"
                    fontWeight="bold"
                    onChange={(e) =>
                      dispatch({
                        type: "updateTitle",
                        payload: e.target.value,
                      })
                    }
                  />
                </Stack>
                <div className="ql-container">
                  <ReactQuill
                    theme={"bubble"}
                    value={storyState.body}
                    onChange={(e) =>
                      dispatch({ type: "updateBody", payload: e })
                    }
                    modules={{
                      toolbar: [{ header: 2 }, "bold", "italic", "underline"],
                    }}
                  />
                </div>
              </Container>
            </GridItem>
            <GridItem>
              <Box
                pos={{ base: "auto", md: "sticky" }}
                top={{ base: "auto", md: "20" }}
              >
                <PutAuthor
                  pk={partitionKey}
                  address={address}
                  author={userId}
                />
                <ActionButtons
                  setStoryOption={setStoryOption}
                  storyOption={storyOption}
                  addStory={addStory}
                  setProposalsArray={setProposalsArray}
                  myStories={myStories}
                  genre={storyState.genre}
                  dispatch={dispatch}
                  publishDisable={publishDisable}
                  storyState={storyState}
                  proposals={proposalsArray.length}
                />
                {proposalsArray.length > 1 ? (
                  <PollSection justCreated={true} pollData={proposalsArray} />
                ) : null}
              </Box>
            </GridItem>
          </SimpleGrid>
        </Center>
      ) : (
        <LoadingSpinner label="Please log in" />
      )}
    </Box>
  );
};

export default Create;

const ActionButtons = ({
  setStoryOption,
  storyOption,
  setProposalsArray,
  addStory,
  myStories,
  publishDisable,
  genre,
  dispatch,
  storyState,
  proposals,
}) => {
  const [advanced, setAdvanced] = useState(false);
  const bgColor = useColorModeValue("white", "#111111");
  const buttonBg = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  return (
    <Stack
      gap={2}
      bg={bgColor}
      boxShadow={"xl"}
      rounded={"lg"}
      p={{ base: 3, lg: 5 }}
      mb={3}
      maxW={{ base: "auto", lg: "350px" }}
    >
      <HStack>
        <StoryPicker
          setStoryOption={setStoryOption}
          storyOption={storyOption}
          myStories={myStories}
          dispatch={dispatch}
        />
        <AddProposals setProposalsArray={setProposalsArray} />
      </HStack>
      <PickGenre genre={genre} dispatch={dispatch} />
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="enable-advanced" mb="0">
          Advanced options
        </FormLabel>
        <Switch id="enable-advanced" onChange={() => setAdvanced(!advanced)} />
      </FormControl>
      {advanced ? (
        <>
          <Divider />
          <UpdateAddress dispatch={dispatch} storyState={storyState} />
          <Monetization
            dispatch={dispatch}
            storyState={storyState}
            proposals={proposals}
          />
        </>
      ) : null}
      <Divider />
      <Button
        rightIcon={<CheckIcon />}
        bg={buttonBg}
        isLoading={publishDisable}
        color={buttonTextColor}
        boxShadow="base"
        _hover={{
          boxShadow: "md",
        }}
        onClick={() => addStory()}
      >
        Publish
      </Button>
    </Stack>
  );
};

const UpdateAddress = ({ dispatch, storyState }) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <Box boxShadow="base" rounded="lg" p={3}>
      <Text fontWeight={500}>Minting address used:</Text>
      <Flex align="center" gap={2}>
        {isEditing ? (
          <Input
            placeholder="a00fe60cfc..."
            isInvalid={
              storyState.monetizedAddress.toLowerCase().substring(0, 3) ===
              "a00"
                ? false
                : true
            }
            onChange={(e) =>
              dispatch({
                type: "updateMonetizedAddress",
                payload: e.target.value,
              })
            }
          />
        ) : (
          `${storyState.monetizedAddress.substring(
            0,
            5
          )}...${storyState.monetizedAddress.substring(59, 64)}`
        )}
        <IconButton
          icon={isEditing ? <CheckIcon /> : <EditIcon />}
          size="sm"
          onClick={() =>
            storyState.monetizedAddress.toLowerCase().substring(0, 3) === "a00"
              ? setIsEditing(!isEditing)
              : null
          }
        />
      </Flex>
    </Box>
  );
};

const Monetization = ({ dispatch, storyState, proposals }) => {
  const enable = () => {
    dispatch({ type: "updateMonetized", payload: !storyState.monetized });
  };

  return (
    <Box boxShadow="base" rounded="lg" p={3}>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="enable-monetized" mb="0">
          Enable poll gating?
        </FormLabel>
        <Switch
          id="enable-monetized"
          isDisabled={proposals < 2}
          isChecked={storyState.monetized}
          onChange={() => enable()}
        />
      </FormControl>
      {proposals < 2 ? (
        <Text size="7pt" color="gray.500">
          Create a poll to enable!
        </Text>
      ) : null}
      {storyState.monetized ? (
        <Text size="xs" color="gray.500">
          Only those who own some of your minted collectibles can vote on your
          poll.
        </Text>
      ) : null}
    </Box>
  );
};

const PickGenre = ({ genre, dispatch }) => {
  const Genres = ["Fiction", "Non-Fiction", "Short Story", "Blog", "Other"];

  return (
    <Menu>
      <MenuButton
        w="full"
        as={Button}
        boxShadow="base"
        _hover={{
          boxShadow: "md",
        }}
        rightIcon={<ChevronDownIcon />}
      >
        {genre === "" ? "Genre" : genre}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="Genre" title="Genres">
          {Genres.map((genreTitle) => (
            <MenuItemOption
              key={genreTitle}
              value={genreTitle}
              onClick={() =>
                dispatch({ type: "updateGenre", payload: genreTitle })
              }
            >
              {genreTitle}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

const AddProposals = ({ setProposalsArray }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [maxAmountError, setMaxAmountError] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [pollTitle, setPollTitle] = useState("");

  const [pollOptions, setPollOption] = useState(["", ""]); // and array of body text

  const CHOICESALLOWED = 5;

  const addProposalChoice = () => {
    setSubmitted(false);
    if (pollOptions.length < CHOICESALLOWED) {
      let newAmount = [];
      for (let i = 0; i < pollOptions.length; i++) {
        newAmount.push(pollOptions[i]);
      }
      newAmount.push("");

      setPollOption(newAmount);
    } else {
      setMaxAmountError(true);
    }
  };

  const closeModal = () => {
    onClose();
    setPollOption(["", ""]);
    setMaxAmountError(false);
    setPollTitle("");
    setSubmitted(false);
  };

  const inputPollChoice = (newBody, index) => {
    const newPollOptions = [...pollOptions];
    newPollOptions[index] = newBody;

    setPollOption(newPollOptions);
  };

  const submitPoll = async () => {
    setSubmitted(true);
    let storyProposals = [];

    // error to check poll title
    if (pollTitle == "") return;
    for (let i = 0; i < pollOptions.length; i++) {
      if (pollOptions[i] == "") return;

      storyProposals.push({
        proposalNumber: i + 1,
        title: pollTitle,
        body: pollOptions[i].replace(/\n/g, encodeURIComponent("<br/>")),
        votes: 0,
        open: true,
      });
    }

    // send to upper parent component as ready array of objects
    setProposalsArray(storyProposals);
    closeModal();
  };

  return (
    <>
      <Button
        rightIcon={<BiPoll />}
        boxShadow="base"
        w="full"
        _hover={{
          boxShadow: "md",
        }}
        onClick={onOpen}
      >
        Add poll
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>
            <Center>Poll options</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              mx={2}
              variant="flushed"
              placeholder="Ask a question to your audience..."
              size="lg"
              onChange={(e) => setPollTitle(e.target.value)}
              isInvalid={submitted && pollTitle == "" ? true : false}
            />
            <Box p={3}>
              {pollOptions.map((item, index) => {
                if (index + 1 == pollOptions.length) {
                  return (
                    <Box key={index}>
                      <Flex mb={3} gap={2} align="center">
                        <Textarea
                          placeholder={`Choice ${index + 1}`}
                          isInvalid={submitted && item == "" ? true : false}
                          maxW="80%"
                          value={item}
                          onChange={(e) =>
                            inputPollChoice(e.target.value, index)
                          }
                        />
                        <Spacer />
                        <Tooltip label="Add choice">
                          <IconButton
                            icon={<AddIcon />}
                            onClick={() => addProposalChoice()}
                            size="lg"
                          />
                        </Tooltip>
                      </Flex>
                      <FormControl isInvalid={maxAmountError}>
                        <FormErrorMessage>
                          max {CHOICESALLOWED} choices allowed!
                        </FormErrorMessage>
                      </FormControl>
                    </Box>
                  );
                }
                return (
                  <Flex key={index} mb={3}>
                    <Textarea
                      placeholder={`Choice ${index + 1}`}
                      isInvalid={submitted && item == "" ? true : false}
                      maxW="80%"
                      value={item}
                      onChange={(e) => inputPollChoice(e.target.value, index)}
                    />
                  </Flex>
                );
              })}
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button rightIcon={<CheckIcon />} onClick={() => submitPoll()}>
              Add
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const PickChapter = ({ myStories, dispatch }) => {
  if (myStories.length < 1) return;

  const [currentStory, setCurrentStory] = useState("Pick a story:");

  const updateStory = (title) => {
    setCurrentStory(title);
    dispatch({ type: "updateGroupName", payload: title });
  };

  return (
    <Menu>
      <MenuButton
        textTransform="uppercase"
        as={Button}
        variant="outline"
        _hover={{
          boxShadow: "md",
        }}
        rightIcon={<ChevronDownIcon />}
      >
        {currentStory}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="New story" title="My current stories">
          {myStories.map((storyTitle) => (
            <MenuItemOption
              key={storyTitle}
              value={storyTitle}
              onClick={() => updateStory(storyTitle)}
            >
              {storyTitle}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

const StoryPicker = ({ setStoryOption, storyOption, myStories, dispatch }) => {
  return (
    <Menu>
      <MenuButton
        w="full"
        as={Button}
        boxShadow="base"
        _hover={{
          boxShadow: "md",
        }}
        rightIcon={<ChevronDownIcon />}
      >
        {storyOption}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="New story" title="Story options">
          <MenuItemOption
            value={"New story"}
            onClick={() => setStoryOption("New story")}
          >
            New story
          </MenuItemOption>
          {myStories.length > 0 ? (
            <MenuItemOption
              value={"New chapter"}
              onClick={() => {
                setStoryOption("New chapter");
                dispatch({
                  type: "updateGroupName",
                  payload: "",
                });
              }}
            >
              New chapter
            </MenuItemOption>
          ) : null}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
