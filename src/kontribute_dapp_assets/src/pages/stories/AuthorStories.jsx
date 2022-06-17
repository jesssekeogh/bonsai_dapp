import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../containers";
import {
  SimpleGrid,
  Kbd,
  Text,
  SimpleGrid,
  Container,
  Center,
} from "@chakra-ui/react";
import { StorySummary } from "./s_components";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";

const AuthorStories = () => {
  let isMounted = true;
  const params = useParams();
  const author = params.principal;
  const [storyIds, setStoryIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const getIds = async () => {
    let ids = await storyMo.getUserStories(author);
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
    getIds();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!loaded) return <LoadingSpinner label="Fetching Stories..." />;
  return (
    <>
      <Container maxW={"7xl"} mt={{ base: -10, md: -2 }} mb={5}>
        {storyIds === "err" ? (
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

export default AuthorStories;
