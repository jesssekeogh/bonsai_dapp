import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Container,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Hide,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  Radio,
  RadioGroup,
  Input,
  Stack,
  IconButton,
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
import {
  useAnvilDispatch,
  user_transfer_icp,
} from "@vvv-interactive/nftanvil-react";
import { FailedToast } from "../../../containers/toasts/Toasts";
import ReactCanvasConfetti from "react-canvas-confetti";
import {
  e8sToIcp,
  icpToE8s,
} from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

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
        <Flex align="center" gap={2} mt={5}>
          <Button
            bg={"none"}
            leftIcon={<ViewIcon />}
            _hover={{ bg: "none", cursor: "default" }}
            p={1}
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
          <TipAuthor address={address} loggedIn={loggedIn} />
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

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const TipAuthor = ({ address, loggedIn }) => {
  const [amountToSend, setAmountToSend] = useState("10000000");
  const [sending, setSending] = useState(false);
  const [tipped, setTipped] = useState(false);
  const [custom, setCustom] = useState(false);
  const anvilDispatch = useAnvilDispatch();

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const sendTip = async () => {
    setSending(true);
    const send = {
      to: address,
      amount: Number(amountToSend),
    };

    try {
      await anvilDispatch(user_transfer_icp(send));
      setSending(false);
      fire();
      setTipped(true);
    } catch (e) {
      setSending(false);
      FailedToast("Failed", e.toString());
    }
  };

  return (
    <Popover>
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <PopoverTrigger>
        <Button leftIcon={<FaDonate />} isDisabled={!loggedIn}>
          Tip
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>
          {tipped ? "Author tipped!" : "Support this author..."}
        </PopoverHeader>
        <PopoverBody>
          {custom ? (
            <Input
              placeholder={e8sToIcp(Number(amountToSend))}
              onChange={(event) =>
                setAmountToSend(icpToE8s(event.target.value))
              }
            />
          ) : (
            <RadioGroup onChange={setAmountToSend} value={amountToSend}>
              <Stack my={2} spacing={5}>
                <Radio value={"10000000"}>0.1 ICP</Radio>
                <Radio value={"50000000"}>0.5 ICP</Radio>
                <Radio value={"100000000"}>1 ICP</Radio>
              </Stack>
            </RadioGroup>
          )}
          <Flex mt={3} gap={2}>
            <Spacer />
            <Button onClick={() => setCustom(!custom)}>
              {custom ? "X" : "Custom"}
            </Button>
            <Button
              leftIcon={<FaDonate />}
              isLoading={sending}
              onClick={() => sendTip()}
            >
              Send tip
            </Button>
          </Flex>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
export default StoryUtils;
