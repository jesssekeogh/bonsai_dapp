import React, { useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { MdOutlinePublishedWithChanges } from "react-icons/md";
import {
  Container,
  Box,
  Flex,
  Spacer,
  Button,
  useBreakpointValue,
  Editable,
  EditableInput,
  EditablePreview,
  Text,
  Textarea,
} from "@chakra-ui/react";
import "./story.css";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";

const Create = () => {
  const [storyData, setStoryData] = useState("");
  // const [anvilAddress, setAnvilAddress] = useState("");

  const EncodeData = (editor) => {
    setStoryData(editor.getData());
  };

  const PostStory = async () => {
    let encodedStory = encodeURIComponent(storyData);

    let storyMo = createStoryActor({
      agentOptions: authentication.getAgentOptions(),
    });

    let post = await storyMo.add({
      title: "Testing a big title right here big title right",
      summary: "Lets test something else",
      story: "Testing the upload",
      address: [""],
    });

    return console.log(post);
  };

  return (
    <div className="story">
      <Container maxW="4xl">
        <Box mb={2}>
          <Editable
            placeholder="Title: e.g 'Bonsai Warriors Chapter 1'"
            maxW={"sm"}
            onChange={(e) => {
              setAnvilAddress(e);
            }}
          >
            <EditablePreview bg="#fff" px={2} />
            <EditableInput bg="#fff" />
          </Editable>
        </Box>
        <CKEditor
          editor={ClassicEditor}
          config={{
            toolbar: ["Heading", "bold", "italic", "|", "undo", "redo"],
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
            EncodeData(editor);
          }}
        />
        <Flex mb={2} align={"center"}>
          <Box>
            <Text my={2} fontWeight={600} color="#f0e6d3">
              Your NFT Anvil minting address:
            </Text>
            <Editable
              placeholder="a00fe60cfcc1ecb49d7e8..."
              maxW={"xl"}
              onChange={(e) => {
                setAnvilAddress(e);
              }}
            >
              <EditablePreview bg="#fff" px={2} />
              <EditableInput bg="#fff" />
            </Editable>
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
          >
            Publish
          </Button>
        </Flex>
      </Container>
    </div>
  );
};

export default Create;
