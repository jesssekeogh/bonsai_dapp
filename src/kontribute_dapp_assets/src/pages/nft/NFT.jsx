import React, { useState, useEffect } from "react";
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
  Text,
  HStack,
  Input,
  Grid,
  GridItem,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";

const NFT = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [value, setValue] = useState("");
  const handleChange = (event) => setValue(event.target.value);

  return (
    <div>
      <NavBar />
      <Center>
        <Grid templateColumns="repeat(4, 1fr)" mb={5}>
          <GridItem colStart={2} colSpan={2}>
            <InputGroup>
              <Input
                color="#f0e6d3"
                placeholder="NFT Search..."
                variant="outline"
                size="lg"
                value={value}
                onChange={handleChange}
              />
              <InputRightElement _hover={{ cursor: "pointer" }} onClick={() => {setValue("")}} mt={1} children={<CloseIcon color={"#f0e6d3"} />} />
            </InputGroup>
          </GridItem>
          <GridItem colStart={4} ms={2}>
            <HStack w="220px">
              <Text color="#f0e6d3" fontSize="xs">
                Powered by{" "}
                <Text
                  bgGradient="linear(to-t, #c61682, #ee670d)"
                  bgClip="text"
                  fontWeight={800}
                >
                  NFT Anvil
                </Text>
              </Text>
              <ChakraImage src={anvillogo} h="40px" />
            </HStack>
          </GridItem>
        </Grid>
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
            <BonsaiNFT value={value} />
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
