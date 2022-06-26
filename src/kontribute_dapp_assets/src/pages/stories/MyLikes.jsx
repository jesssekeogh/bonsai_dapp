import React, { useState, useEffect } from "react";
import {
  SimpleGrid,
  Kbd,
  Text,
  SimpleGrid,
  Container,
  Center,
  Heading,
  Divider
} from "@chakra-ui/react";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import { LoadingSpinner } from "../../containers/index";
import { StorySummary } from "./s_components";

const MyLikes = () => {
  let isMounted = true;
  const [loaded, setLoaded] = useState(false);
  const [storyIds, setStoryIds] = useState([]);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const loadStories = async () => {
    let ids = await storyMo.getUserLikedStories();
    if (isMounted) {
      if ("err" in ids) {
        setStoryIds("err");
      } else {
        setStoryIds(ids.ok);
      }
      setLoaded(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    loadStories();

    return () => {
      isMounted = false;
    };
  }, []);

  if (!loaded) return <LoadingSpinner label="Fetching Stories..." />;
  return (
    <>
      <Container maxW={"7xl"} mt={{ base: -10, md: -2 }} mb={5}>
        <Heading
          my={1}
          bgGradient="linear(to-t, #705025, #a7884a)"
          bgClip="text"
        >
          Liked Stories
        </Heading>
        <Divider my={2} borderColor="#16171b" />
        {storyIds === "err" || storyIds.length < 1 ? (
          <Center>
            <Kbd
              my={"195px"}
              border={"double"}
              borderRadius="lg"
              backgroundColor="#16171b"
            >
              <Text color="#f0e6d3">There are no Stories here!😕</Text>
            </Kbd>
          </Center>
        ) : (
          <SimpleGrid
            columns={{ base: 2, md: 2, lg: 4 }}
            pb={5}
            gap={3}
            mx={2}
            mt={3}
          >
            {storyIds.map((item) => (
              <StorySummary key={item} storyId={item} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

export default MyLikes;
