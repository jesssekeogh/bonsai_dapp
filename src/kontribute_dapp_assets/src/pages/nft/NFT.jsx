import React, { useState, useEffect } from "react";
import { NavBar } from "../../containers";
import anvillogo from "../../../assets/anvillogo.svg"; // get logo from site
import React from "react";

//images:
import bonsai_1 from "../../../assets/bonsai_nfts/bonsai_1.png";
import bonsai_2 from "../../../assets/bonsai_nfts/bonsai_2.png";
import bonsai_3 from "../../../assets/bonsai_nfts/bonsai_3.png";
import bonsai_4 from "../../../assets/bonsai_nfts/bonsai_4.png";
import bonsai_5 from "../../../assets/bonsai_nfts/bonsai_5.png";

import { Box, Stack, Heading, Text, Spinner } from "@chakra-ui/react";
import { Stack, Heading, Text } from "@chakra-ui/react";
import {
  Box,
  Center,
  useColorModeValue,
  Heading,
  Text,
  Stack,
  Button,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

// stories page css for spinner
import "../stories/stories.css";

const NFT = () => {
  // optimise image loading
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsReady(true);
    };
    img.src = bonsai_1;
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
        <Grid
          px={20}
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          <GridItem>
            {/* turn this into a component with names as props and the option to have a sold out button(true or false?) */}
            <Box
              role={"group"}
              p={6}
              maxW={"330px"}
              w={"full"}
              bg={useColorModeValue("white", "gray.800")}
              boxShadow={"2xl"}
              rounded={"lg"}
              pos={"relative"}
              zIndex={1}
            >
              <Box rounded={"lg"} mt={-12} pos={"relative"} height={"230px"}>
                <ChakraImage
                  rounded={"lg"}
                  height={230}
                  width={282}
                  objectFit={"cover"}
                  src={bonsai_1}
                />
              </Box>
              <Stack pt={10} align={"center"}>
                <Text
                  color={"gray.500"}
                  fontSize={"sm"}
                  textTransform={"uppercase"}
                >
                  Bonsai Warrior
                </Text>
                <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
                  Name here
                </Heading>
                <Stack direction={"row"} align={"center"}>
                  <Button
                    rounded={"full"}
                    color={"white"}
                    flex={"1 0 auto"}
                    bgGradient="linear(to-r, #c61682, #ee670d)"
                    _hover={{ opacity: "0.8" }}
                  >
                    Buy Now
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </GridItem>
        </Grid>
      ) : null}
    </div>
  );
};

export default NFT;
