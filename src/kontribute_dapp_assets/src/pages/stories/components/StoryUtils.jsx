import React, { useState, useEffect } from "react";
import {
  Container,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Hide,
  Text,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../../containers/colormode/Colors";
import { useLocation } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart, FaTwitter, FaDonate } from "react-icons/fa";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../../CanDBClient/client";
import { AvatarPic } from "./index";

const StoryUtils = ({
  storySortKey,
  likes,
  partitionKey,
  loggedIn,
  views,
  address,
  author,
}) => {
  const location = useLocation();
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [likesTotal, setLikesTotal] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const LikeStory = async () => {
    setIsLiked(true);
    setLikesTotal(likesTotal + 1);

    await storyServiceClient.update(partitionKey, "", (actor) =>
      actor.likeStory(storySortKey)
    );
  };

  const checkIfLiked = async () => {
    const hasLiked = await storyServiceClient.query(partitionKey, (actor) =>
      actor.checkIfLiked(storySortKey)
    );

    if (hasLiked[0].value) {
      setIsLiked(true);
    }
  };

  const incrementView = async () => {
    await storyServiceClient.update(partitionKey, "", (actor) =>
      actor.incrementView(storySortKey)
    );
  };

  useEffect(() => {
    setLikesTotal(likes);
    checkIfLiked();
    incrementView();
  }, []);

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Flex rounded={"lg"} m={3}>
      <Container
        bg={bgColor}
        color={textColor}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
      >
        <AvatarPic author={author} address={address} smallView={false} />
        <Flex align="center" gap={3} mt={3}>
          <Button
            bg={"none"}
            leftIcon={<ViewIcon />}
            _hover={{ bg: "none", cursor: "default" }}
          >
            {views}
          </Button>
          <Spacer />
          <Button
            leftIcon={isLiked ? <FaHeart /> : <FaRegHeart />}
            onClick={() => LikeStory()}
            isDisabled={isLiked ? true : false || !loggedIn}
          >
            {likesTotal.toString()}
          </Button>
          <Button leftIcon={<FaDonate />}>Tip</Button>
          <a
            href={`https://twitter.com/intent/tweet?text=Check out this story on Kontribute📜%0a&url=https://3ezq7-iqaaa-aaaal-aaacq-cai.raw.ic0.app${encodeURIComponent(
              location.pathname
            )}%0a&hashtags=Web3Storytelling`}
            data-show-count="false"
            target="_blank"
          >
            <Hide below="md">
              <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
                Share
              </Button>
            </Hide>
            <Hide above="md">
              <Button colorScheme="twitter">
                <FaTwitter />
              </Button>
            </Hide>
          </a>
        </Flex>
      </Container>
    </Flex>
  );
};

export default StoryUtils;
