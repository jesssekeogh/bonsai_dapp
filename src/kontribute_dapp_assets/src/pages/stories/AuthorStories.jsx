import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../containers";
import {
  Center,
  SimpleGrid,
  Kbd,
  Text,
  SimpleGrid,
  Container,
} from "@chakra-ui/react";
import { StorySummary } from "./s_components";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";

const AuthorStories = () => {
  const params = useParams();
  const author = params.principal;
  const [storyIds, setStoryIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const getIds = async () => {
    let ids = await storyMo.getUserStories(author);
    if ("err" in ids) {
      setStoryIds("err");
    } else {
      setStoryIds(ids.ok);
    }
    setLoaded(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getIds();
  }, []);

  if (!loaded) return <LoadingSpinner label="Fetching Stories..." />;
  return (
    <Center>
      {storyIds === "err" ? (
        <Kbd
          my={"195px"}
          border={"double"}
          borderRadius="lg"
          backgroundColor="#16171b"
        >
          <Text color="#f0e6d3">You have no Stories here!😕</Text>
        </Kbd>
      ) : (
        <Container maxW={"7xl"} mt={{ base: -10, md: -2 }} mb={5}>
          <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
            {storyIds.map((item) => (
              <StorySummary key={item} storyId={item} />
            ))}
          </SimpleGrid>
        </Container>
      )}
    </Center>
  );
};

export default AuthorStories;
