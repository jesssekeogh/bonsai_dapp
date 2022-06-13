import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import { Container, Heading, Text } from "@chakra-ui/react";

const Story = () => {
  let isMounted = true;
  const params = useParams();
  const [story, setStory] = useState({});
  const [loaded, setLoaded] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const loadStory = async () => {
    let story = await storyMo.get(Number(params.storyId));
    if (isMounted) {
      setStory(story.ok);
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadStory();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container mt={{ base: -10, md: -2 }}>
      {loaded ? (
        <>
          <Heading mb={2} as={"h2"} bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
            {story.story.title}
          </Heading>
          <Text
            fontWeight={600}
            color="#f0e6d3"
            dangerouslySetInnerHTML={{ __html: decodeURIComponent(story.story.story) }}
          />{" "}
        </>
      ) : null}
    </Container>
  );
};

export default Story;
