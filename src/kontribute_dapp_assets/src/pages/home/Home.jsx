import React, {useEffect} from "react";
import {
  Container,
  SimpleGrid,
  Flex,
  Heading,
  Text,
  Stack,
  StackDivider,
  Icon,
  useColorModeValue,
  Button,
  Center,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { BsPen, BsImage } from "react-icons/bs";
import IcLogo from "../../../assets/ic-logo.png";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./home.css";

const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])
  
  return (
    <>
      <div className="home_container">
        <Header />
      </div>
    </>
  );
};

export default Home;

// Header for home page:

const Header = () => {
  return (
    <Container maxW="7xl" mt={{ base: -10 }} px={{ base: 5, md: 12 }}>
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        pb={5}
        gap={2}
        mx={2}
        maxW="1250px"
      >
        <Stack spacing={4}>
          <Text
            textTransform={"uppercase"}
            fontWeight={600}
            fontSize={"lg"}
            p={2}
            alignSelf={"flex-start"}
            rounded={"md"}
          >
            Welcome to{" "}
            <Text
              as={"span"}
              bgGradient="linear(to-t, #705025, #a7884a)"
              bgClip="text"
            >
              Kontribute
            </Text>
          </Text>
          <Heading bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
            Web 3.0 storytelling with NFTs
          </Heading>
          <Stack
            spacing={5}
            divider={
              <StackDivider
                borderColor={useColorModeValue("gray.100", "gray.700")}
              />
            }
          >
            <Feature
              icon={<Icon as={BsPen} color={"gray.500"} w={5} h={5} />}
              iconBg={"#fff"}
              text={"Write your own story"}
            />
            <Feature
              icon={<Icon as={BsImage} color={"blue.500"} w={4} h={4} />}
              iconBg={"#fff"}
              text={"Sell NFTs from your story on the marketplace"}
            />
            <Feature
              icon={<ChakraImage src={IcLogo} h={"20px"} w={"auto"} />}
              iconBg={"#fff"}
              text={"Fully decentralised and powered by ICP"}
            />
          </Stack>
        </Stack>
        <Buttons />
      </SimpleGrid>
    </Container>
  );
};

const Feature = ({ text, icon, iconBg }) => {
  return (
    <Stack direction={"row"} align={"center"}>
      <Flex
        w={8}
        h={8}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={iconBg}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} color="#f0e6d3">
        {text}
      </Text>
    </Stack>
  );
};

// buttons for home page:

const Buttons = () => {
  const currentMarketplace = useSelector(
    (state) => state.Global.currentMarketplace
  );

  return (
    <Center my={12}>
      <Stack direction={"column"} spacing={10}>
        <Link to="/stories">
          <Button
            colorScheme="#282828"
            bg="#282828"
            rounded={"full"}
            rightIcon={<BsPen />}
            p={8}
            w={"200px"}
            _hover={{ opacity: "0.8" }}
            size={"lg"}
          >
            Explore Stories
          </Button>
        </Link>
        <Link to={"/marketplace/" + currentMarketplace}>
          <Button
            colorScheme="#282828"
            bg="#282828"
            rounded={"full"}
            rightIcon={<BsImage />}
            p={8}
            w={"200px"}
            _hover={{ opacity: "0.8" }}
            size={"lg"}
          >
            Explore NFTs
          </Button>
        </Link>
      </Stack>
    </Center>
  );
};
