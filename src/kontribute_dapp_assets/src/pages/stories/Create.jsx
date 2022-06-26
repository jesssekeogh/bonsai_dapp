import React, { useState, useEffect } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CheckIcon, CloseIcon, EditIcon } from "@chakra-ui/icons";
import {
  Container,
  Box,
  Flex,
  Spacer,
  Wrap,
  Button,
  useBreakpointValue,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  createStandaloneToast,
  useEditableControls,
  ButtonGroup,
  IconButton,
  Input,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import "./story.css";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../containers/toasts/Toasts";
import { Usergeek } from "usergeek-ic-js";

const HowTo = "https://medium.com/@teambonsai.icp/c5c2cc3c404b";

const toast = createStandaloneToast();

const Create = () => {
  const [storyData, setStoryData] = useState("");
  const [title, setTitle] = useState("");
  const [anvilAddress, setAnvilAddress] = useState("");
  const [posting, setPosting] = useState(false);
  const navigate = useNavigate();

  const SaveData = (editor) => {
    setStoryData(editor.getData());
  };

  const PostStory = async () => {
    let encodedStory = encodeURIComponent(storyData);
    setPosting(true);

    if (CheckStory(title, encodedStory, anvilAddress) !== "passed") {
      setPosting(false);
      toast.closeAll();
      return FailedToast(
        "Failed",
        CheckStory(title, encodedStory, anvilAddress)
      );
    }

    SendingToast("Uploading Story");

    let storyMo = createStoryActor({
      agentOptions: authentication.getAgentOptions(),
    });

    let post;
    try {
      post = await storyMo.add({
        title: title,
        story: encodedStory,
        address: [anvilAddress],
      });
      Usergeek.trackEvent("StoryPublished");
    } catch (e) {
      toast.closeAll();
      setPosting(false);
      return FailedToast("Failed", e.toString());
    }

    toast.closeAll();

    if ("err" in post) {
      setPosting(false);
      return FailedToast("Failed", post.err.toString());
    }

    SuccessToast("Success", "Story added with ID: " + post.ok.toString());
    return navigate("/stories/story/" + post.ok, {
      state: { prev: "/stories/create" },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="story">
      <Container maxW="4xl" mt={{ base: -10, md: -2 }}>
        <Box mb={2}>
          <EditTitle setTitle={setTitle} />
        </Box>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: ["Heading", "bold", "italic", "|", "undo", "redo"],
            placeholder:
              "In the Celestial Empire, there are laws that must be obeyed, laws which bind all mankind into one great and inexhaustible force. None can defeat the boundless spirit and drive of the peoples of this great empire. ",
            heading: {
              options: [
                {
                  model: "heading2",
                  view: "h3",
                  title: "Heading",
                  class: "ck-heading_heading2",
                },
                {
                  model: "heading3",
                  view: "h4",
                  title: "Heading 2",
                  class: "ck-heading_heading3",
                },
                {
                  model: "paragraph",
                  title: "Paragraph",
                  class: "ck-heading_paragraph",
                },
              ],
            },
          }}
          onChange={(event, editor) => {
            SaveData(editor);
          }}
        />
        <Flex mb={2} alignItems={"center"}>
          <Box>
            <Wrap
              align="center"
              my={2}
              fontWeight={600}
              color="#f0e6d3"
              fontSize={["sm", null, "md"]}
            >
              Your
              <a
                href={"https://nftanvil.com/mint"}
                target="_blank"
                rel="noreferrer"
              >
                <Text
                  color="#6495ED"
                  _hover={{
                    opacity: "0.8",
                    textDecoration: "underline",
                    cursor: "pointer",
                  }}
                >
                  NFT Anvil
                </Text>
              </a>
              minting address:{" "}
              <Tooltip label={"Adding your address is optional"}>
                <InfoIcon boxSize={5} viewBox="0 0 30 30" />
              </Tooltip>
            </Wrap>
            <Input
              placeholder="E.g a00fe60cfcc1ecb49d7e8..."
              onChange={(e) => {
                setAnvilAddress(e.target.value);
              }}
              color="#f0e6d3"
              variant="flushed"
              width="auto"
            />
          </Box>
          <Spacer />
          <Button
            bg="#17191e"
            border="1px"
            size={useBreakpointValue(["sm", "md"])}
            borderColor="#9d8144"
            color="#f0e6d3"
            colorScheme="#17191e"
            _hover={{ opacity: "0.8" }}
            rightIcon={<MdOutlinePublishedWithChanges />}
            onClick={() => PostStory()}
            disabled={posting}
          >
            Publish
          </Button>
        </Flex>
        <Flex>
          <Spacer />
          <a href={HowTo} target="_blank" rel="noreferrer">
            <Text
              color="#6495ED"
              _hover={{
                opacity: "0.8",
                textDecoration: "underline",
                cursor: "pointer",
              }}
            >
              Need help?
            </Text>
          </a>
        </Flex>
      </Container>
    </div>
  );
};

const EditTitle = ({ setTitle }) => {
  return (
    <Editable
      textAlign="center"
      placeholder="Story Title ✍️ "
      fontSize="2xl"
      isPreviewFocusable={false}
      bgGradient="linear(to-t, #705025, #a7884a)"
      bgClip="text"
      fontWeight={800}
      onChange={(e) => {
        setTitle(e);
      }}
    >
      <Flex align={"center"}>
        <EditablePreview />
        <EditableInput />
        <EditableControls />
      </Flex>
    </Editable>
  );
};

const EditableControls = () => {
  const {
    isEditing,
    getSubmitButtonProps,
    getCancelButtonProps,
    getEditButtonProps,
  } = useEditableControls();
  return isEditing ? (
    <ButtonGroup justifyContent="center" size="sm" mx={2}>
      <IconButton
        color="#16171b"
        icon={<CheckIcon />}
        {...getSubmitButtonProps()}
      />
      <IconButton
        color="#16171b"
        icon={<CloseIcon />}
        {...getCancelButtonProps()}
      />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center" mx={2}>
      <IconButton
        size="sm"
        color="#16171b"
        icon={<EditIcon />}
        {...getEditButtonProps()}
      />
    </Flex>
  );
};

const CheckStory = (title, story, address) => {
  const checkSupport = (address) => {
    if (address.toLowerCase().substring(0, 3) !== "a00") return true;
  };

  if (title.length < 3) {
    return "Invalid title length";
  }

  if (story.length < 1000) {
    return "Invalid story length - minimum 1000 characters";
  }

  if (address.length > 0) {
    if (checkSupport(address)) return "Address must support NFTA";
    if (address.length !== 64) return "Invalid address";
  }

  return "passed";
};

export default Create;
