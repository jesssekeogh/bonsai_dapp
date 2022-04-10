import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import React from "react";
import BonsaiNFT from "./bonsai_NFT/BonsaiNFT";
import CommunityNft from "./community_NFT/CommunityNft";
import anvillogo from "../../../assets/anvillogo.svg"; // get logo from site
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
  Heading,
  Hide,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import Purchase from "./nft_functions/Purchase";

const NFT = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let nftname = useParams();
  const [value, setValue] = useState("");

  const handleChange = (event) => setValue(event.target.value);

  useEffect(() => {
    if (Object.keys(nftname).length === 1) {
      setValue(nftname.nftname);
    } else {
      setValue("");
    }
  }, []);
  return (
    <div>
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
              <InputRightElement
                zIndex={1}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  setValue("");
                }}
                mt={1}
                children={
                  <CloseIcon _hover={{ opacity: "0.8" }} color={"#f0e6d3"} />
                }
              />
            </InputGroup>
          </GridItem>
          <Hide above="md">
            <ChakraImage ms={2} pt={2} src={anvillogo} h="40px" />
          </Hide>
          <Hide below="md">
            <GridItem colStart={4} ms={2}>
              <HStack w="220px">
                <Heading color="#f0e6d3" fontSize="xs">
                  Powered by{" "}
                  <Text
                    bgGradient="linear(to-t, #c61682, #ee670d)"
                    bgClip="text"
                    fontWeight={800}
                  >
                    NFT Anvil
                  </Text>
                </Heading>
                <ChakraImage src={anvillogo} h="40px" />
              </HStack>
            </GridItem>
          </Hide>
        </Grid>
      </Center>
      <Tabs variant="soft-rounded">
        <Center>
          <Purchase />
        </Center>
        <div className="sticky_tabs">
          <Center>
            <TabList>
              <Tab
                _selected={{ bgGradient: "linear(to-r, #6190E8, #A7BFE8)" }}
                color="white"
                bg="#282828"
                _hover={{ opacity: "0.8" }}
              >
                Newly Added
              </Tab>
              <Tab
                _selected={{ bgGradient: "linear(to-r, #6190E8, #A7BFE8)" }}
                bg="#282828"
                color="white"
                ms={3}
                _hover={{ opacity: "0.8" }}
              >
                Community Listed
              </Tab>
            </TabList>
          </Center>
        </div>
        <TabPanels>
          <TabPanel>
            <BonsaiNFT value={value} />
          </TabPanel>
          <TabPanel>
            <CommunityNft />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default NFT;
