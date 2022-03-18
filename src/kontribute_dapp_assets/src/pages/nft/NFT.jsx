import React, { useEffect } from "react";
import { NavBar } from "../../containers";
import React from "react";
import BonsaiNFT from "./bonsai_NFT/BonsaiNFT";
import CommunityNFT from "./community_NFT/communityNFT";

import anvillogo from "../../../assets/anvillogo.svg"; // get logo from site

//design
import "./NFT.css";
import {
  Center,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Heading,
  Text,
  Stack,
  Box,
  HStack,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

const NFT = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <NavBar />
      <Center>
        <Stack as={Box} textAlign={"center"} spacing={3} py={2} mb={5} mt="-2rem">
          <Heading
            fontWeight={600}
            fontSize={{ base: "3xl", sm: "4xl", md: "6xl" }}
            lineHeight={"110%"}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-t, #705025, #a7884a)"
              bgClip="text"
            >
              Kontribute NFTs
            </Text>
          </Heading>
          <Center>
            <HStack>
              <Text color="#f0e6d3">
                Powered by{" "}
                <Text
                  bgGradient="linear(to-t, #c61682, #ee670d)"
                  bgClip="text"
                  fontWeight={800}
                >
                  NFT Anvil
                </Text>
              </Text>
              <ChakraImage src={anvillogo} h="50px" />
            </HStack>
          </Center>
        </Stack>
      </Center>
      <Tabs variant="soft-rounded">
        <div className="sticky_tabs">
          <Center>
            <TabList>
              <Tab
                _selected={{ bgGradient: "linear(to-r, #6190E8, #A7BFE8)" }}
                color="white"
                bg="#282828"
              >
                Bonsai Warriors
              </Tab>
              <Tab
                _selected={{ bgGradient: "linear(to-r, #6190E8, #A7BFE8)" }}
                bg="#282828"
                color="white"
                ms={2}
              >
                Community
              </Tab>
            </TabList>
          </Center>
        </div>
        <TabPanels>
          <TabPanel>
            <BonsaiNFT />
          </TabPanel>
          <TabPanel>
            <CommunityNFT />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default NFT;
