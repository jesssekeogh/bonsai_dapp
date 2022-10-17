import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import {
  Container,
  Input,
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
  useDisclosure,
  Center,
  VStack,
  IconButton,
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, ChevronDownIcon, AddIcon } from "@chakra-ui/icons";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { useSelector } from "react-redux";
import { FailedToast } from "../../containers/toasts/Toasts";

const partitionKey = "StoryService";

const Create = () => {
  const userId = useSelector((state) => state.Profile.principal);

  const [storyTitle, setStoryTitle] = useState("");
  const [chapterTitle, setChapterTitle] = useState("");
  const [storyBody, setStoryBody] = useState("Write your story...");

  // for adding to current story:
  const [storyOption, setStoryOption] = useState("New story"); // or new chapter
  const [myStories, setMyStories] = useState([]); // array of author stories returned from backend
  const [currentStory, setCurrentStory] = useState("Pick a story:"); // button state to display current selected author story

  const textColor = useColorModeValue(TextColorLight, TextColorDark);

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const addStory = async () => {
    console.log("adding...");

    let emptyProposal = {
      proposalNumber: 0,
      title: "",
      body: "",
      votes: 0,
      open: false,
    };

    if (storyOption === "New chapter" && currentStory === "Pick a story:") {
      return FailedToast("Failed", "Pick a story to add a chapter!");
    }

    const update = await storyServiceClient.update(partitionKey, "", (actor) =>
      actor.putStory(
        {
          groupName:
            storyOption === "New story"
              ? encodeURIComponent(storyTitle)
              : encodeURIComponent(currentStory),
          title: encodeURIComponent(chapterTitle),
          body: encodeURIComponent(storyBody),
          likes: 0,
          views: 0,
          author: userId,
          proposals: 0, //change this if proposals are added
        },
        [emptyProposal]
      )
    );

    console.log(update);
  };

  const getMyStories = async () => {
    // some util help:

    // await indexClient.indexCanisterActor.deleteServiceCanister(partitionKey);
    // await indexClient.indexCanisterActor.createStoryServiceCanisterParitition(
    //   partitionKey
    // );
    // return console.log("done!")

    let skLowerBound = `author#${userId}`;
    let skUpperBound = `author#${userId}~`;
    let limit = 1000;
    let ascending = [false];

    const stories = await storyServiceClient.query(partitionKey, (actor) =>
      actor.scanAllStories(skLowerBound, skUpperBound, limit, ascending)
    );

    if (stories[0].value.stories.length > 0) {
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
    if (userId) {
      getMyStories();
    }
  }, [userId]);

  return (
    <Container maxW="5xl" py={10}>
      <ActionButtons
        setStoryOption={setStoryOption}
        storyOption={storyOption}
        addStory={addStory}
      />
      <Container maxW="3xl" py={10} color={textColor}>
        <HStack spacing={10} py={2}>
          {storyOption === "New story" ? (
            <Input
              placeholder="Title"
              variant="flushed"
              size="lg"
              onChange={(e) => setStoryTitle(e.target.value)}
            />
          ) : (
            <PickChapter
              myStories={myStories}
              currentStory={currentStory}
              setCurrentStory={setCurrentStory}
            />
          )}
          <Input
            placeholder="Chapter"
            variant="flushed"
            size="lg"
            onChange={(e) => setChapterTitle(e.target.value)}
          />
        </HStack>
        <ReactQuill
          theme={"bubble"}
          value={storyBody}
          onChange={setStoryBody}
        />
      </Container>
    </Container>
  );
};

export default Create;

const ActionButtons = ({ setStoryOption, storyOption, addStory }) => {
  return (
    <Flex gap={2}>
      <StoryPicker setStoryOption={setStoryOption} storyOption={storyOption} />
      <AddProposals />
      <Spacer />
      <Button
        rightIcon={<CheckIcon />}
        boxShadow="base"
        _hover={{
          boxShadow: "md",
        }}
        onClick={() => addStory()}
      >
        Publish
      </Button>
    </Flex>
  );
};

const AddProposals = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [proposalAmount, setProposalAmount] = useState([1, 2]); // minimum of two vote options

  const addProposal = () => {
    if (proposalAmount.length < 5) {
      let newAmount = [];

      for (let i = 0; i <= proposalAmount.length; i++) {
        newAmount.push(i + 1);
      }

      setProposalAmount(newAmount);
    }
  };

  const closeModal = () => {
    onClose()
    setProposalAmount([1, 2])
  }

  // min 2 max 5
  // have an "added" state to add to story
  return (
    <>
      <Button
        rightIcon={<AddIcon />}
        boxShadow="base"
        _hover={{
          boxShadow: "md",
        }}
        onClick={onOpen}
      >
        Add Polls
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} isCentered trapFocus={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Center>Add poll options </Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              mx={2}
              variant="flushed"
              placeholder="Ask a question to your audience..."
            />
            <VStack m={2} p={1} gap={1}>
              {proposalAmount.map((inp) => (
                <Input
                  key={inp}
                  variant="outline"
                  placeholder={`Choice ${inp}`}
                />
              ))}
              <IconButton icon={<AddIcon />} onClick={() => addProposal()} />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button>Add</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const PickChapter = ({ myStories, currentStory, setCurrentStory }) => {
  if (myStories.length < 1) return;

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
        {currentStory}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="New story" title="My current stories">
          {myStories.map((storyTitle) => (
            <MenuItemOption
              key={storyTitle}
              value={storyTitle}
              onClick={() => setCurrentStory(storyTitle)}
            >
              {storyTitle}
            </MenuItemOption>
          ))}
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

const StoryPicker = ({ setStoryOption, storyOption }) => {
  return (
    <Menu>
      <MenuButton
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
          <MenuItemOption
            value={"New chapter"}
            onClick={() => setStoryOption("New chapter")}
          >
            New chapter
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
