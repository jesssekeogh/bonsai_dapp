import React, { useState, useEffect } from "react";
import { Button, useColorModeValue, Stack, Spinner } from "@chakra-ui/react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../../declarations/story";
import { FailedToast } from "../../../containers/toasts/Toasts";
import { useSelector } from "react-redux";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../../containers/colormode/Colors";

const LikeButton = ({ storyId }) => {
  const isLogged = useSelector((state) => state.Profile.loggedIn);
  let isMounted = true;
  const [likes, setLikes] = useState("0");
  const [liking, setLiking] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const checkIfLiked = async () => {
    if (!isLogged) return;

    let liked = await storyMo.getUserLikedStories();

    if (isMounted) {
      setIsLiked(liked.ok.includes(BigInt(storyId)));
    }
  };

  const loadLikes = async () => {
    let story = await storyMo.get(Number(storyId));
    let likes = story.ok.totalVotes.toString();
    if (isMounted) {
      setLikes(likes);
    }
  };

  const like = async () => {
    if (isMounted) {
      setLiking(true);
      let liked = await storyMo.like(Number(storyId));

      if ("err" in liked) {
        setLiking(false);
        return FailedToast("Failed!", liked.err.toString());
      }

      return setLiking(false);
    }
  };

  useEffect(() => {
    loadLikes();
    checkIfLiked();
    return () => {
      isMounted = false;
    };
  }, [liking]);

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  return (
    <>
      <Stack align={"center"} direction={"row"}>
        <Button
          size={"md"}
          maxW={"150px"}
          bg={buttonBgColor}
          color={buttonTextColor}
          _hover={{ opacity: "0.8" }}
          rightIcon={
            liking ? (
              <Spinner size="xs" />
            ) : isLiked ? (
              <FaHeart />
            ) : (
              <FaRegHeart />
            )
          }
          isDisabled={liking || !isLogged}
          onClick={() => {
            like();
          }}
        >
          Like
        </Button>
        <TotalLikes likes={likes} isLiked={isLiked} />
      </Stack>
    </>
  );
};

const TotalLikes = ({ likes, isLiked }) => {
  return (
    <Button
      maxW={"100px"}
      align={"center"}
      borderRadius="md"
      bg="#0fbdde"
      color="black"
      fontWeight="semibold"
      size={"xs"}
      fontSize={{ base: "xs", md: "sm" }}
      py={{ base: 0, md: 0.5 }}
      px={{ base: 1, md: 2 }}
      leftIcon={isLiked ? <FaHeart /> : <FaRegHeart />}
    >
      {likes}
    </Button>
  );
};
export default LikeButton;
