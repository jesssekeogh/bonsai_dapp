import React, { useState, useEffect } from "react";
import { NavBar } from "../../containers";
import anvillogo from "../../../assets/anvillogo.svg"; // get logo from site
import React from "react";
import { Box, Stack, Heading, Text, Spinner } from "@chakra-ui/react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  GridItem,
  Wrap
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

// get all the images
import IMAGES from '../../../assets/bonsai_nfts';
// optimise loading
import { LazyLoadComponent } from 'react-lazy-load-image-component';

// stories page css for spinner
import "../stories/stories.css";

const GridComponent = (props) => {
  return (
    <GridItem>
      {/* turn this into a component with names as props and the option to have a sold out button(true or false?) */}
      <Box
        role={"group"}
        p={4}
        maxW={"330px"}
        w={"full"}
        backgroundColor={"#1e212b"}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
      >
        <Box rounded={"lg"} pos={"relative"}>
          <ChakraImage
            rounded={"lg"}
            height={"300px"}
            width={"auto"}
            objectFit={"cover"}
            src={props.imgsrc}
          />
        </Box>
        <Stack pt={3} align={"start"}>
          <Text
            color={"gray.500"}
            fontSize={{ base: "sm", sm: "xs", md: "md" }}
          >
            Bonsai Warrior
          </Text>
          </Stack>
          <Stack pt={2} direction={"row"} align={"center"} justify="space-between">
            <Heading
              fontSize={{ base: "lg", sm: "md", md: "lg" }}
              color={"white"}
            >
              {props.name}
            </Heading>
            <a 
              href={props.anvillink} 
              target="_blank"
              rel="noreferrer">
            <Button
              maxW="120px"
              rounded={"full"}
              color={"white"}
              bgGradient="linear(to-r, #c61682, #ee670d)"
              _hover={{ opacity: "0.8" }}
            >
              Buy Now
            </Button>
            </a>
        </Stack>
      </Box>
    </GridItem>
  );
};

const NFT = () => {

  // optimise image loading
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsReady(true);
    };
    img.src = IMAGES.bonsai_1;
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <NavBar />
      {!imageIsReady ? (
        <div className="bonsai__spinner">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#17191e"
            color="#9d8144"
            size="xl"
          />
        </div>
      ) : null}
      {imageIsReady ? (
        <Center>
          {/* add in lazy load here test when deployed but remove nft link */}
        <SimpleGrid columns={[1, null, 4]} pb={5} px={10} gap={4} maxW="1500px">
          <GridComponent name="Demon General" imgsrc={IMAGES.bonsai_1} anvillink={}/>
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_2} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_3} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_4} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_5} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_6} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_7} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_8} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_9} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_10} />
          <GridComponent name="the name" imgsrc={IMAGES.bonsai_11} />
        </SimpleGrid>
        </Center>
      ) : null}
    </div>
  );
};

export default NFT;
