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
  useColorModeValue,
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
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";

const HowTo = "https://medium.com/@teambonsai.icp/c5c2cc3c404b";

const { toast } = createStandaloneToast();

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

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  return (
    <div className="story">
      <Container maxW="5xl" py={10} pb={12}>
        <Box mb={2}>
          <EditTitle setTitle={setTitle} />
        </Box>
        <Box color="black">
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
        </Box>
        <Flex alignItems={"center"}>
          <Box>
            <Wrap
              p={2}
              align="center"
              fontWeight={600}
              fontSize={["sm", null, "md"]}
            >
              Link your NFTs and add your
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
            size={"md"}
            bg={buttonBgColor}
            color={buttonTextColor}
            _hover={{ opacity: "0.8" }}
            rightIcon={<MdOutlinePublishedWithChanges />}
            onClick={() => PostStory()}
            disabled={posting}
          >
            Post
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
      <IconButton icon={<CheckIcon />} {...getSubmitButtonProps()} />
      <IconButton icon={<CloseIcon />} {...getCancelButtonProps()} />
    </ButtonGroup>
  ) : (
    <Flex justifyContent="center" mx={2}>
      <IconButton size="sm" icon={<EditIcon />} {...getEditButtonProps()} />
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
