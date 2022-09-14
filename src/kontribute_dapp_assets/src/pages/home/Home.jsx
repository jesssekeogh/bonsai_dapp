import React, { useEffect } from "react";
import {
  Container,
  SimpleGrid,
  Box,
  Flex,
  Heading,
  Text,
  Stack,
  VStack,
  StackDivider,
  Icon,
  useColorModeValue,
  useBreakpointValue,
  Button,
  Center,
  Image as ChakraImage,
  Skeleton,
} from "@chakra-ui/react";
import { BsPen, BsImage } from "react-icons/bs";
import IcLogo from "../../../assets/ic-logo.png";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LaunchpadBanner from "./LaunchpadBanner";
import launchpadLogo from "../../../assets/pendragon_logo.png";
import pendragon from "../../../assets/pendragon.png";
import {
  ButtonColorDark,
  ButtonColorLight,
  HeadingColorDark,
  HeadingColorLight,
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <ChakraImage
        w={"full"}
        h="80%"
        fit="cover"
        src={pendragon}
        pos={"absolute"}
        sx={{
          maskImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.05), rgba(0,0,0,0))",
        }}
      />
      <HomeBanner />
    </>
  );
};

export default Home;

const HomeBanner = () => {
  return (
    <Container maxW={"7xl"} mt={"-3rem"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        py={{ base: 20, md: 28 }}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={{ base: 5, md: 5 }}>
          <Heading
            lineHeight={1.1}
            fontWeight={"bold"}
            fontSize={{ base: "3xl", sm: "4xl", lg: "5xl" }}
            color={useColorModeValue(HeadingColorLight, HeadingColorDark)}
          >
            Discover stories, collect, sell and explore NFTs
          </Heading>
          <Text
            fontSize={{ base: "xl", md: "3xl" }}
            color={useColorModeValue(TextColorLight, TextColorDark)}
          >
            Kontribute is a web3 writing platfrom that brings fun and
            interesting use cases to NFTs
          </Text>
          <Stack
            spacing={{ base: 4, sm: 6 }}
            direction={{ base: "column", md: "row" }}
          >
            <NavLink to={"/stories"}>
              <Button
                bg={useColorModeValue(ButtonColorLight, ButtonColorDark)}
                color={useColorModeValue(TextColorDark, TextColorLight)}
                boxShadow="base"
                size={"lg"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                rightIcon={<BsPen />}
              >
                Discover Stories
              </Button>
            </NavLink>
            <NavLink to={"/marketplace"}>
              <Button
                bg="white"
                boxShadow="base"
                color={TextColorLight}
                size={"lg"}
                colorScheme="pink.400"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
                rightIcon={<BsImage />}
              >
                Trade NFTs
              </Button>
            </NavLink>
          </Stack>
        </Stack>
        <LaunchpadBanner
          mainImg={pendragon}
          logoImg={launchpadLogo}
          link={"/launchpad/pendragon-nft"}
          name={"Pendragon Quest"}
        />
      </Stack>
    </Container>
  );
};
