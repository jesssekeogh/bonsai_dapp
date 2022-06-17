import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import { Link } from "react-router-dom";
import {
  Container,
  Center,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  Stack,
  Spacer,
  Button,
  useBreakpointValue,
  createStandaloneToast,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../containers/toasts/Toasts";

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
    window.scrollTo(0, 0);
    loadStory();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Container minW={{ md: "2xl" }} mt={{ base: -10, md: -2 }}>
      {loaded ? (
        <>
          <Center>
            <Heading
              mb={2}
              as={"h2"}
              bgGradient="linear(to-t, #705025, #a7884a)"
              bgClip="text"
            >
              {story.story.title}
            </Heading>
          </Center>
          <Text
            fontWeight={600}
            color="#f0e6d3"
            dangerouslySetInnerHTML={{
              __html: decodeURIComponent(story.story.story),
            }}
          />{" "}
          <AuthorInfo
            authorAddress={story.story.address[0]}
            authorPrincipal={story.author}
            storyId={params.storyId}
          />
        </>
      ) : null}
      {!loaded ? (
        <>
          <Skeleton height="40px" />
          <SkeletonText mt="4" noOfLines={2} spacing="4" />
        </>
      ) : null}
    </Container>
  );
};
const toast = createStandaloneToast();

const AuthorInfo = ({ authorPrincipal, authorAddress, storyId }) => {
  const viewer = useSelector((state) => state.Profile.principal);
  let show = false

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  if(viewer == authorPrincipal){
    show = true
  }

  const deleteStory = (storyId) => {
    SendingToast("Deleting Story...");
    try {
      storyMo.delete(Number(storyId));
      toast.closeAll();
      SuccessToast("Success!", `Story with ID ${storyId} deleted`);
    } catch (e) {
      toast.closeAll();
      FailedToast("Failed!", e.toString());
    }
  };

  return (
    <Stack direction={"row"} my={5}>
      <Spacer />
      <Link to={"/stories/author/" + authorPrincipal}>
        <Button
          colorScheme="#282828"
          bg="#282828"
          rounded={"full"}
          size={useBreakpointValue(["sm", "md"])}
          px={5}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
            opacity: "0.8",
          }}
        >
          Authors Stories
        </Button>
      </Link>
      <Link to={"/marketplace/" + authorAddress}>
        <Button
          colorScheme="#282828"
          bg="#282828"
          rounded={"full"}
          size={useBreakpointValue(["sm", "md"])}
          px={5}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
            opacity: "0.8",
          }}
          disabled={authorAddress.length !== 64}
        >
          Authors NFTs
        </Button>
      </Link>
      {show ? (
        <Button
          colorScheme="#282828"
          bg="darkred"
          rounded={"full"}
          size={useBreakpointValue(["sm", "md"])}
          px={5}
          _hover={{
            transform: "translateY(-2px)",
            boxShadow: "lg",
            opacity: "0.8",
          }}
          onClick={() => {
            deleteStory(storyId);
          }}
        >
          Delete
        </Button>
      ) : null}
    </Stack>
  );
};
export default Story;
