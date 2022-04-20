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
} from "@chakra-ui/react";
import { FcUpload, FcPicture, FcVoicePresentation } from "react-icons/fc";
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
    <div className="home_list_container">
      <Container maxW={"3xl"}>
        <Stack
          as={Box}
          textAlign={"center"}
          spacing={{ base: 8, md: 14 }}
          py={{ base: 20, md: 32 }}
          mb="6"
        >
          <Heading
            fontWeight={600}
            fontSize={{ base: "5xl", sm: "5xl", md: "6xl" }}
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
            Protocol (ICP). Kontribute brings readers, writers and NFTs
            together. Check out the Bonsai Warriors story and accompanying NFT collection
          </Text>
          <Stack
            direction={"row"}
            spacing={3}
            align={"center"}
            alignSelf={"center"}
            position={"relative"}
          >
            <Link to="stories/bonsai-all">
              <Button
                colorScheme="#282828"
                bg="#282828"
                rounded={"full"}
                px={6}
              >
                Bonsai Story
              </Button>
            </Link>
            <Link to="/nft/bonsai-nft">
              <Button
                colorScheme="#282828"
                bg="#282828"
                rounded={"full"}
                px={6}
              >
                Bonsai NFT
              </Button>
            </Link>
          </Stack>
        </Stack>
        {/* feature: */}
        <div className="bonsai_features">
          <Box p={4}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
              <Feature
                icon={<Icon as={FcUpload} w={10} h={10} />}
                title={"Community Stories"}
                text={
                  "Kontribute will allow users to upload their own non-fiction/fiction stories to the dapp. Stories will be all fully stored on the ICP blockchain."
                }
              />
              <Feature
                icon={<Icon as={FcPicture} w={10} h={10} />}
                title={"NFT Integration"}
                text={
                  "See characters, places or anything else that is mentioned in a story in the form of an NFT. Own a piece of your favorite story through our NFT Anvil integration."
                }
              />
              <Feature
                icon={<Icon as={FcVoicePresentation} w={10} h={10} />}
                title={"Voting"}
                text={
                  "Readers choose the future of stories through integrated voting on the next evolution. Choose the fate of your favourite character."
                }
              />
            </SimpleGrid>
          </Box>
        </div>
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
            href="https://github.com/teambonsai/bonsai_dapp"
            target="_blank"
            rel="noreferrer"
          >
            <FaGithub />
          </a>
        </div>

        <div className="bonsai__footer-copyright">
          <p>
            <i>by Team Bonsai</i>
          </p>
          <br />
          <p>©2022 Kontribute</p>
        </div>
      </div>
    </div>
  );
};

export default HomeList;
