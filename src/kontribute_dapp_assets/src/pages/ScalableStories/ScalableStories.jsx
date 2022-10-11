import React, { useState } from "react";
import { startUserServiceClient, startIndexClient } from "./client";
import {
  Text,
  Heading,
  Button,
  Container,
  Input,
  createStandaloneToast,
  Flex,
  Spacer,
  Box,
  VStack,
  Center,
} from "@chakra-ui/react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../containers/toasts/Toasts";

const { toast } = createStandaloneToast();

const ScalableStories = () => {
  const [story, setStory] = useState();
  const [storyId, setStoryId] = useState("");
  const [newStoryTitle, setNewStoryTitle] = useState("");
  const [newStoryBody, setNewStoryBody] = useState("");

  const pk = "StoryService";
  const indexClient = startIndexClient();
  const userServiceClient = startUserServiceClient(indexClient);

  async function getStory() {
    // query needs to know pk to get story
    if (pk) {
      let userStoryQueryResults = await userServiceClient.query(pk, (actor) =>
        actor.getStory(storyId)
      );

      if (userStoryQueryResults.length < 1) return;

      let storyData;
      if (userStoryQueryResults[0].value.length > 0) {
        // handle candid returned optional type (string[] or string)
        storyData = Array.isArray(userStoryQueryResults[0].value)
          ? userStoryQueryResults[0].value[0]
          : userStoryQueryResults[0].value;
      }
      setStory(storyData);
      console.log(storyData);
    } else {
      FailedToast("Failed", "Not signed in");
    }
  }
  // story sk
  // author#2vxsx-fae#groupedStory#First Story#singleStory#testing
  const likeStory = async () => {
    const like = await userServiceClient.update(pk, "", (actor) =>
      actor.likeStory(
        "author#2vxsx-fae#groupedStory#First Story#singleStory#testing"
      )
    );

    console.log(like);
  };

  const createStory = async () => {
    if (pk) {
      // return await indexClient.indexCanisterActor.deleteStoryServiceCanister(
      //   pk
      // );

      if (newStoryTitle == "" || newStoryBody == "") {
        return FailedToast("Failed", "Some fields are empty");
      }

      SendingToast("Posting story...");
      let encodedStory = encodeURIComponent(newStoryBody);
      let encodedTitle = encodeURIComponent(newStoryTitle);

      // console.log("encoded story", encodedStory, encodedTitle);
      const creation =
        await indexClient.indexCanisterActor.createStoryServiceCanisterParitition(
          pk
        );

      console.log("creation", creation);

      try {
        const update = await userServiceClient.update(pk, "", (actor) =>
          actor.putStory({
            groupName: "First Story",
            title: encodedTitle,
            body: encodedStory,
            likes: 0,
            views: 0,
          })
        );

        toast.closeAll();
        console.log("update", update);
        SuccessToast("Success", `Story posted with ID ${update}`);
      } catch (e) {
        console.log(e);
        toast.closeAll();
        FailedToast("Failed", e.toString());
      }
    } else {
      FailedToast("Failed", "Not signed in");
    }
  };

  const getAllStories = async () => {
    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    console.log("loading all stories")
    const stories = await userServiceClient.query(pk, (actor) =>
      actor.scanAllStories(skLowerBound, skUpperBound, limit, ascending)
    );

    console.log(stories);
  };

  return (
    // add story editor
    <Container py={10} maxW="5xl">
      <Input
        placeholder="Story title"
        onChange={(e) => setNewStoryTitle(e.target.value)}
        my={3}
        variant="filled"
      />
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
          setNewStoryBody(editor.getData());
        }}
      />
      <Flex mt={3}>
        <Spacer />
        <Button type="button" onClick={() => createStory()}>
          Create story
        </Button>
      </Flex>
      <Center mt={5}>
        <VStack>
          <Input
            placeholder="story sort key"
            onChange={(e) => setStoryId(e.target.value)}
          />
          <Button type="button" onClick={() => getAllStories()}>
            Get All Stories
          </Button>
          <Button type="button" onClick={() => getStory()}>
            Get Story
          </Button>
          <Button type="button" onClick={() => likeStory()}>
            Like story
          </Button>
        </VStack>
      </Center>
      <Center>
        <Box py={10}>
          <Heading>{story ? decodeURIComponent(story.title) : null}</Heading>
          <Text
            dangerouslySetInnerHTML={{
              __html: story ? decodeURIComponent(story.body) : null,
            }}
          />
        </Box>
      </Center>
    </Container>
  );
};

export default ScalableStories;
