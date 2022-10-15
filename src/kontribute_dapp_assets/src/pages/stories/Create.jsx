import React, { useState } from "react";
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
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const Create = () => {
  const [storyOption, setStoryOption] = useState("New story");
  const textColor = useColorModeValue(TextColorLight, TextColorDark);

  return (
    <Container maxW="5xl" py={10}>
      <ActionButtons
        setStoryOption={setStoryOption}
        storyOption={storyOption}
      />
      <Container maxW="3xl" py={10} color={textColor}>
        <HStack spacing={10} py={2}>
          {storyOption === "New story" ? (
            <Input placeholder="Title" variant="flushed" size="lg" />
          ) : (
            <PickChapter />
          )}
          <Input placeholder="Chapter" variant="flushed" size="lg" />
        </HStack>
        <StoryEditor />
      </Container>
    </Container>
  );
};

export default Create;

const StoryEditor = () => {
  const [value, setValue] = useState("Write your story...");

  return <ReactQuill theme={"bubble"} value={value} onChange={setValue} />;
};

const ActionButtons = ({ setStoryOption, storyOption }) => {
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
      >
        Publish
      </Button>
    </Flex>
  );
};

const AddProposals = () => {
  return (
    <Button
      rightIcon={<AddIcon />}
      boxShadow="base"
      _hover={{
        boxShadow: "md",
      }}
    >
      Add Proposals
    </Button>
  );
};

const PickChapter = () => {
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
        Testing
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="New story" title="My current stories">
          <MenuItemOption value={"New story"}>New story</MenuItemOption>
          <MenuItemOption value={"New chapter"}>New chapter</MenuItemOption>
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
