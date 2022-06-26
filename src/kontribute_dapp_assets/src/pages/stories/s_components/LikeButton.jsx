import React, { useState, useEffect } from "react";
import {
  Button,
  useBreakpointValue,
  createStandaloneToast,
  Box,
  Stack,
  Spinner,
} from "@chakra-ui/react";
import { FaHeart } from "react-icons/fa";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../../declarations/story";
import { FailedToast, SuccessToast } from "../../../containers/toasts/Toasts";
import { useSelector } from "react-redux";

const toast = createStandaloneToast();

const LikeButton = ({ storyId }) => {
  const isLogged = useSelector((state) => state.Profile.loggedIn);
  let mounted = true;
  const [likes, setLikes] = useState("0");
  const [liking, setLiking] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const loadLikes = async () => {
    let story = await storyMo.get(Number(storyId));
    let likes = story.ok.totalVotes.toString();
    if (mounted) {
      setLikes(likes);
    }
  };

  const like = async () => {
    setLiking(true);
    let liked = await storyMo.like(Number(storyId));

    if ("err" in liked) {
      toast.closeAll();
      setLiking(false)
      return FailedToast("Failed!", liked.err.toString());
    }

    toast.closeAll();
    setLiking(false)
    return SuccessToast("Success!", liked.ok.toString());
  };

  useEffect(() => {
    loadLikes();
    return () => {
      mounted = false;
    };
  }, [liking]);

  return (
    <>
      <Stack align={"center"} direction={"row"}>
        <Button
          bg="#17191e"
          border="1px"
          size={useBreakpointValue(["sm", "md"])}
          maxW={"150px"}
          borderColor="#9d8144"
          color="#f0e6d3"
          colorScheme="#17191e"
          _hover={{ opacity: "0.8" }}
          rightIcon={liking ? <Spinner size="xs" /> : <FaHeart />}
          isDisabled={liking || !isLogged}
          onClick={() => {
            like();
          }}
        >
          Like
        </Button>
        <TotalLikes likes={likes} />
      </Stack>
    </>
  );
};

const TotalLikes = ({ likes }) => {
  return (
    <Box
      maxW={"100px"}
      align={"center"}
      size={useBreakpointValue({ base: "sm", md: "md" })}
      borderRadius="md"
      bg="#0fbdde"
      color="black"
      fontWeight="semibold"
      p={1}
    >
      {likes}
    </Box>
  );
};
export default LikeButton;
