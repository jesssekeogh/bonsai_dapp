import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import { Link, useLocation } from "react-router-dom";
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
  useColorModeValue,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { BsImage } from "react-icons/bs";
import { LikeButton, DeleteButton } from "./s_components";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import { useScroll, motion } from "framer-motion";

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

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  return (
    <>
      <ReadingProgress />
      <Container minW={{ md: "2xl" }} pt={10} pb={12}>
        {loaded ? (
          <>
            <Center>
              <Heading mb={2} as={"h2"} color={textColor}>
                {story.story.title}
              </Heading>
            </Center>
            <Text
              lineHeight={1.5}
              fontSize={"21px"}
              color={textColor}
              fontFamily="Times New Roman"
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
    </>
  );
};

const AuthorInfo = ({ authorPrincipal, authorAddress, storyId }) => {
  const viewer = useSelector((state) => state.Profile.principal);
  let show = false;

  if (viewer == authorPrincipal) {
    show = true;
  }

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  return (
    <>
      <Stack direction="row" align="center">
        <Stack direction={"column"} my={5}>
          <Link to={"/marketplace/" + authorAddress}>
            <Button
              bg={buttonBgColor}
              color={buttonTextColor}
              size={useBreakpointValue(["sm", "md"])}
              rightIcon={<BsImage />}
              px={4}
              _hover={{
                opacity: "0.8",
              }}
              disabled={authorAddress.length !== 64}
            >
              Authors NFTs
            </Button>
          </Link>
          <Link to={"/stories/author/" + authorPrincipal}>
            <Button
              bg={buttonBgColor}
              color={buttonTextColor}
              size={useBreakpointValue(["sm", "md"])}
              px={4}
              _hover={{
                opacity: "0.8",
              }}
            >
              {`Authors Stories`}
            </Button>
          </Link>
        </Stack>
        <Spacer />
        <Stack direction="column">
          <LikeButton storyId={storyId} />
          {show ? <DeleteButton storyId={storyId} /> : null}
        </Stack>
      </Stack>
      <BackButton />
    </>
  );
};

const BackButton = () => {
  const path = useLocation();
  let prevLink = "/stories";

  if (path.state) {
    prevLink = path.state.prev;
  }

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  return (
    <Link to={prevLink}>
      <Button
        bg={buttonBgColor}
        color={buttonTextColor}
        px={5}
        my={3}
        size="sm"
        _hover={{ opacity: "0.8" }}
      >
        <Text as="kbd">Go Back</Text>
      </Button>
    </Link>
  );
};

const ReadingProgress = () => {
  const { scrollYProgress } = useScroll();

  return (
    <Box mt={{ base: -1, md: -1, lg: 2.5}} position="fixed" width="100%" zIndex="2" bg={"#282828"} sx={{opacity: 0.7}}>
      <motion.div
        style={{
          scaleX: scrollYProgress,
          height: "10px",
          background: "#12bdde",
          transformOrigin: "0%",
        }}
      />
    </Box>
  );
};

export default Story;
