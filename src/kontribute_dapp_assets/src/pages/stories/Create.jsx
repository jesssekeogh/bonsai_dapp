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
} from "@chakra-ui/react";
import { AddIcon, CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const Create = () => {
  const textColor = useColorModeValue(TextColorLight, TextColorDark);

  return (
    <Container maxW="7xl" py={12}>
      <ActionButtons />
      <Container maxW="2xl" color={textColor}>
        <Input placeholder="Title" variant="flushed" size="lg" />
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

const ActionButtons = () => {
  return (
    <Flex gap={2}>
      <Spacer />
      <StoryPicker />
      <Button
        rightIcon={<AddIcon />}
        boxShadow="base"
        _hover={{
          boxShadow: "md",
        }}
      >
        Add Proposals
      </Button>
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

const StoryPicker = () => {
const [currentOption, setCurrentOption] = useState("New story")
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
        {currentOption}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="New story" title="Story options">
          <MenuItemOption value={"New story"}>
            New story
          </MenuItemOption>
          <MenuItemOption value={"New chapter"}>
            New chapter
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
