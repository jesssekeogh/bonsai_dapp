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
  Stack,
  Spacer,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsPenFill } from "react-icons/bs";
import { StorySummary } from "./s_components";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import { Link } from "react-router-dom";

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
            <CreateStory />
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              pb={5}
              gap={3}
              mx={2}
            >
              {storyIds.map((item) => (
                <StorySummary key={item} storyId={item} />
              ))}
            </SimpleGrid>
          </Container>
        )}
      </Center>
    </>
  );
};

const CreateStory = () => {
  return (
    <Stack direction={"row"}>
      <Spacer />
      <Link to="/stories/create">
        <Button
          bg="#17191e"
          border="1px"
          size={useBreakpointValue(["sm", "md"])}
          borderColor="#9d8144"
          color="#f0e6d3"
          colorScheme="#17191e"
          _hover={{ opacity: "0.8" }}
          rightIcon={<BsPenFill />}
        >
          Create a Story
        </Button>
      </Link>
    </Stack>
  );
};
export default AuthorStories;
