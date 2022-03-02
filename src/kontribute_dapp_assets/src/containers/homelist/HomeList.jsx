import React from "react";
import "./homelist.css";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Container,
  Text,
  Button,
  Stack,
  Icon,
  SimpleGrid,
  Flex,
  Center,
} from "@chakra-ui/react";
import {
  FcUpload,
  FcPicture,
  FcVoicePresentation,
  FcDown,
} from "react-icons/fc";
import { FaDiscord, FaTwitter, FaGithub, FaRedditAlien } from "react-icons/fa";

// the main home section of the dapp

// for the features
const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={"center"}
        justify={"center"}
        color={"white"}
        rounded={"full"}
        bg={"gray.100"}
        mb={1}
      >
        {icon}
      </Flex>
      <Text fontWeight={600} color="#c8aa6e">
        {title}
      </Text>
      <Text color="#f0e6d3">{text}</Text>
    </Stack>
  );
};

const HomeList = () => {
  return (
    <div>
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 36 }}
          mb="6"
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            Welcome to <br />
            <Text
              as={"span"}
              bgGradient="linear(to-t, #705025, #a7884a)"
              bgClip="text"
            >
              Kontribute
            </Text>
          </Heading>
          <Text color="#f0e6d3">
            Kontribute is an interactive dapp built on the Internet Computer
            Protocol (ICP). It allows users to interact with fun evolving lore
            stories. Check out the Bonsai Warriors story and accompanying NFT
            collection below:
          </Text>
          <Stack
            direction={"row"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link to="bonsai-all">
              <Button
                colorScheme="#17191e"
                bg="#17191e"
                rounded={"full"}
                px={6}
              >
                Bonsai Story
              </Button>
            </Link>
            <Link to="/nft">
              <Button
                colorScheme="#17191e"
                bg="#17191e"
                rounded={"full"}
                px={6}
              >
                Bonsai NFT
              </Button>
            </Link>
          </Stack>
        </Stack>
        <div className="bonsai__header">
          <Center>
            <FcDown />
          </Center>
        </div>
        {/* feature: */}
        <Box p={4}>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
            <Feature
              icon={<Icon as={FcUpload} w={10} h={10} />}
              title={"Community Stories"}
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
              }
            />
            <Feature
              icon={<Icon as={FcPicture} w={10} h={10} />}
              title={"NFT Integration"}
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
              }
            />
            <Feature
              icon={<Icon as={FcVoicePresentation} w={10} h={10} />}
              title={"Voting"}
              text={
                "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore..."
              }
            />
          </SimpleGrid>
        </Box>
      </Container>
      <div className="bonsai__footer">
        <div className="bonsai__footer-heading">
          <h1 className="gradient__text">Stay in touch with us!</h1>
        </div>
        <div className="bonsai__footer-icons">
          <a
            href="https://discord.gg/S3qRpq8R6e"
            target="_blank"
            rel="noreferrer"
          >
            <FaDiscord />
          </a>
          <a
            href="https://mobile.twitter.com/TeamBonsai_ICP"
            target="_blank"
            rel="noreferrer"
          >
            <FaTwitter />
          </a>
          <a
            href="https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/p/bonsai-warriors"
            target="_blank"
            rel="noreferrer"
          >
            <FaRedditAlien />
          </a>
          <a
            href="https://github.com/jesssekeogh/bonsai_dapp"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>

        <div className="bonsai__footer-copyright">
          <p>
            <i>Made by Team Bonsai</i>
          </p>
          <br />
          <p>©2022 Kontribute</p>
        </div>
      </div>
    </div>
  );
};

export default HomeList;
