import React, { useEffect } from "react";
import {
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  Box,
  Flex,
  Center,
  Image as ChakraImage,
  Alert,
  AlertDescription,
  Link,
} from "@chakra-ui/react";
import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { NavLink } from "react-router-dom";
import LaunchpadBanner from "./LaunchpadBanner";
import anvLogo from "../../../assets/anvillogo.svg";
import ratokoBG from "../../../assets/ratokoBG.png";
import santaHat from "../../../assets/Santa_hat.png";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
  HeadingColorDark,
  HeadingColorLight,
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import PopularDrops from "./PopularDrops";
import powered from "../../../assets/powered.dark.svg";
import SocialProof from "./SocialProof";
import Snowfall from "react-snowfall";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box>
      <Snowfall />
      <HomeAlert />
      <ChakraImage
        w={"full"}
        h="80%"
        fit="cover"
        src={ratokoBG}
        pos={"absolute"}
        sx={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0))",
        }}
      />
      <HomeBanner />
      <PopularDrops />
      <SocialProof />
      <Center mt={20} pb={20}>
        <ChakraImage w={"250px"} fit="cover" src={powered} />
      </Center>
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

const HomeBanner = () => {
  return (
    <Container maxW={"7xl"} mt={"-3rem"} px={5}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        pb={20}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={5} position="relative">
          <Flex
            position="absolute"
            left={{ base: -5, lg: -8 }}
            top={2}
            transform="rotate(-30deg)"
            py={2}
            justifyContent="center"
            alignItems="center"
          >
            <ChakraImage src={santaHat} height={{ base: "24px", lg: "40px" }} />
          </Flex>
          <Heading
            lineHeight={1.1}
            fontWeight={"bold"}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            color={useColorModeValue(HeadingColorLight, HeadingColorDark)}
          >
            Discover stories and explore art
          </Heading>
          <Text
            fontSize={{ base: "xl", md: "3xl" }}
            color={useColorModeValue(TextColorLight, TextColorDark)}
          >
            Kontribute is a web3 creators platform that brings story writing and
            digital art collectibles together
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", md: "row" }}
          >
            <NavLink to={"/stories"}>
              <Button
                bg={useColorModeValue(ButtonColorLight, ButtonColorDark)}
                color={useColorModeValue(
                  ButtonTextColorlight,
                  ButtonTextColorDark
                )}
                boxShadow="base"
                size={"lg"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                rightIcon={<ArrowForwardIcon />}
              >
                Discover Stories
              </Button>
            </NavLink>
            <NavLink to={"/marketplace"}>
              <Button
                bg={useColorModeValue(ButtonColorLight, ButtonColorDark)}
                color={useColorModeValue(
                  ButtonTextColorlight,
                  ButtonTextColorDark
                )}
                boxShadow="base"
                size={"lg"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                rightIcon={<ArrowForwardIcon />}
              >
                Trade art
              </Button>
            </NavLink>
          </Stack>
        </Stack>
        <LaunchpadBanner
          mainImg={ratokoBG}
          logoImg={anvLogo}
          link={
            "/marketplace/bbd87200973033cb69bc0aee03e90df1a1de01e28aa0246bb175baabfd071754"
          }
          name={"Ratoko is now trading on the marketplace!"}
        />
      </Stack>
    </Container>
  );
};
