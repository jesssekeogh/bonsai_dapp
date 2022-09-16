import React, { useEffect } from "react";
import {
  Container,
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Button,
  Box,
  Center,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { BsPen, BsImage } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import LaunchpadBanner from "./LaunchpadBanner";
import launchpadLogo from "../../../assets/pendragon_logo.png";
import pendragon from "../../../assets/pendragon.png";
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
import InterestingNFTs from "./InterestingNFTs";
import powered from "../../../assets/powered.dark.svg";
import SocialProof from "./SocialProof";

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box pb={28}>
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
      <PopularDrops />
      <InterestingNFTs />
      <SocialProof />
      <Center pt={20}>
        <ChakraImage w={"250px"} fit="cover" src={powered} />
      </Center>
    </Box>
  );
};

export default Home;

const HomeBanner = () => {
  return (
    <Container maxW={"7xl"} mt={"-3rem"}>
      <Stack
        align={"center"}
        spacing={{ base: 8, md: 10 }}
        pt={{ base: 20, md: 28 }}
        pb={20}
        direction={{ base: "column", md: "row" }}
      >
        <Stack flex={1} spacing={5}>
          <Heading
            lineHeight={1.1}
            fontWeight={"bold"}
            fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
            color={useColorModeValue(HeadingColorLight, HeadingColorDark)}
          >
            Discover stories and explore NFTs
          </Heading>
          <Text
            fontSize={{ base: "xl", md: "3xl" }}
            color={useColorModeValue(TextColorLight, TextColorDark)}
          >
            Kontribute is a web3 creators platform that brings fun and
            interesting use cases to NFTs
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
          link={
            "/marketplace/a00b8f555f7b02edaf9854ea727e83adb7e6b84cca023f784d70369e5223cfd5"
          }
          name={"Pendragon Quest is now trading on the marketplace!"}
        />
      </Stack>
    </Container>
  );
};
