import React, { useState } from "react";
import { startUserServiceClient, startIndexClient } from "./client";
import { Text, Heading, Button, Container, Input } from "@chakra-ui/react";
import { useSelector } from "react-redux";

const ScalableStories = () => {
  const [story, setStory] = useState({});
  const [storyId, setStoryId] = useState("");
  const [newStory, setNewStory] = useState({});

  const pk = useSelector((state) => state.Profile.principal);
  const indexClient = startIndexClient();
  const userServiceClient = startUserServiceClient(indexClient);

  async function getStory() {
    let userStoryQueryResults = await userServiceClient.query(pk, (actor) =>
      actor.getStory(storyId)
    );

    let storyData;

    if (userStoryQueryResults[0].value.length > 0) {
      // handle candid returned optional type (string[] or string)
      storyData = Array.isArray(userStoryQueryResults[0].value)
        ? userStoryQueryResults[0].value[0]
        : userStoryQueryResults[0].value;
    }
    setStory(storyData);
  }

  const createStory = async () => {
    if (pk) {
      // delete a canister:
      // const del = await indexClient.indexCanisterActor.deleteUserServiceCanister()

      console.log(newStory)
      // const creation =
      //   await indexClient.indexCanisterActor.createUserServiceCanisterByPrincipal(
      //     pk
      //   );

      // console.log("creation", creation);

      // const update = await userServiceClient.update(pk, "", (actor) =>
      //   actor.putStory({ title: newStory.title, body: newStory.body })
      // );

      // console.log("update", update);
    } else {
      console.log("not signed in");
    }
  };

  return (
    // add story editor
    <Container py={10}>
      <Heading>{story.title}</Heading>
      <Text>{story.body}</Text>
      <Input
        placeholder="1"
        value={storyId}
        onChange={(e) => setStoryId(e.target.value)}
      />
      <Button type="button" onClick={() => getStory()}>
        Get Story
      </Button>
      <Button type="button" onClick={() => createStory()}>
        Create story
      </Button>
    </Container>
  );
};

export default ScalableStories;
