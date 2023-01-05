import React, { useEffect } from "react";
import {
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Box,
  Center,
  Alert,
  AlertDescription,
  Link,
} from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  HeadingColorDark,
  HeadingColorLight,
} from "../../containers/colormode/Colors";
import TopNfts from "./TopNfts";
import TopAuthors from "./TopAuthors";
import TopStories from "./TopStories";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const textColor = useColorModeValue(HeadingColorLight, HeadingColorDark);
  return (
    <Box color={textColor} px={5} pb={12}>
      <Center my={{ base: 5, md: 10 }}>
        <Stack spacing={5} textAlign="center">
          <Heading
            lineHeight={1.1}
            fontWeight={"bold"}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            bgGradient={`linear(to-tl, #f9c051, #d0a85d)`}
            bgClip="text"
            transition="0.3s"
          >
            Discover stories and explore art
          </Heading>
          <Center>
            <Text fontSize={{ base: "xl", md: "2xl" }} maxW="2xl">
              Kontribute is a new web3 creators platform built on ICP that
              brings story writing and digital art collectibles together.
            </Text>
          </Center>
        </Stack>
      </Center>
      <TopAuthors />
      <TopStories />
      <TopNfts />
    </Box>
  );
};

export default Home;

const HomeAlert = () => {
  return (
    <Alert
      status="info"
      bg="radial-gradient(circle, rgba(208,168,93,1) 54%, rgba(249,190,82,1) 100%)"
      color="white"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      p={{ base: 3, lg: 5 }}
      mt={{ base: -1, lg: 0 }}
    >
      <AlertDescription>
        ✍️ Win digital collectibles by participating in the{" "}
        <Link
          fontWeight="bold"
          href={
            "https://3ezq7-iqaaa-aaaal-aaacq-cai.raw.ic0.app/stories/author_3d2q2-ce4z5-osah6-dibbj-secst-grfxj-q3f7x-ahuhz-gk5ma-rsgjo-lae_story_The%20Kontribute%20Writathon!_chapter_Web3%20Author%20Competition"
          }
        >
          Web3 Author Competition
          <ExternalLinkIcon mx="2px" />
        </Link>{" "}
        ✍️
      </AlertDescription>
    </Alert>
  );
};
