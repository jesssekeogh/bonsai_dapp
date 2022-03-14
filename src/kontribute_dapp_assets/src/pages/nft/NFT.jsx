import React, { useState, useEffect } from "react";
import { NavBar } from "../../containers";
import anvillogo from "../../../assets/anvillogo.svg";
import { Box, Center, Heading, Text, Stack } from "@chakra-ui/react";
import React from "react";

//images:
import bonsai_1 from "../../../assets/bonsai_nfts/bonsai_1.png";
import bonsai_2 from "../../../assets/bonsai_nfts/bonsai_2.png";
import bonsai_3 from "../../../assets/bonsai_nfts/bonsai_3.png";
import bonsai_4 from "../../../assets/bonsai_nfts/bonsai_4.png";
import bonsai_5 from "../../../assets/bonsai_nfts/bonsai_5.png";

import {
  Box,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
  Spinner,
} from "@chakra-ui/react";
import {
  Flex,
  Stack,
  Heading,
  Text,
  Input,
  Button,
  Icon,
  useColorModeValue,
  createIcon,
} from "@chakra-ui/react";

import { Image as ChakraImage } from "@chakra-ui/react";

// And react-slick as our Carousel Lib
import Slider from "react-slick";

// stories page css
import "../stories/stories.css";

// Settings for the slider
const settings = {
  dots: true,
  arrows: false,
  fade: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  autoplaySpeed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
};
// temporary until NFT anvil integration
const NFT = () => {
  // As we have used custom buttons, we need a reference variable to
  // change the state
  const [slider, setSlider] = useState(null);

  // These are the breakpoints which changes the position of the
  // buttons as the screen size changes
  const top = useBreakpointValue({ base: "90%", md: "50%" });
  const side = useBreakpointValue({ base: "30%", md: "40px" });

  // This list contains all the data for carousels
  // This can be static or loaded from a server
  const cards = [
    {
      title: "",
      text: "",
      image: bonsai_1,
    },
    {
      title: "",
      text: "",
      image: bonsai_2,
    },
    {
      title: "",
      text: "",
      image: bonsai_3,
    },
    {
      title: "",
      text: "",
      image: bonsai_4,
    },
    {
      title: "",
      text: "",
      image: bonsai_5,
    },
  ];
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
        <Container mt="-5rem">
          <Flex align={"center"} justify={"center"} p={1}>
            <Stack rounded={"xl"} p={10} spacing={8} align={"center"}>
              <Center>
                <ChakraImage
                  zIndex={2}
                  top="15%"
                  pos={"absolute"}
                  rounded={"lg"}
                  height={230}
                  width={282}
                  src={anvillogo}
                />
              </Center>
              <Box
                bg="#fff"
                border="solid 1px"
                borderColor="#9d8144"
                mb={"5rem"}
                borderRadius={"xl"}
                position={"relative"}
                height={"280px"}
                width={"280px"}
                overflow={"hidden"}
              >
                {/* CSS files for react-slick */}
                <link
                  rel="stylesheet"
                  type="text/css"
                  charSet="UTF-8"
                  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
                />
                <link
                  rel="stylesheet"
                  type="text/css"
                  href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
                />
                {/* Slider */}
                <Slider {...settings} ref={(slider) => setSlider(slider)}>
                  {cards.map((card, index) => (
                    <Box
                      key={index}
                      height={"6xl"}
                      position="relative"
                      backgroundPosition="50% 50%"
                      backgroundRepeat="no-repeat"
                      backgroundSize="none"
                      backgroundImage={`url(${card.image})`}
                    ></Box>
                  ))}
                </Slider>
              </Box>
              {/* the box content*/}
              <Stack align={"center"} spacing={2}>
                <Heading
                  textTransform={"uppercase"}
                  fontSize={"3xl"}
                  bgGradient="linear(to-t, #705025, #a7884a)"
                  bgClip="text"
                >
                  Bonsai Warriors
                </Heading>
                <Text fontSize={"lg"} color="#f0e6d3">
                  Purchase a Bonsai Warrior NFT now on NFT Anvil!
                </Text>
              </Stack>
              <Stack
                spacing={4}
                direction={{ base: "column", md: "row" }}
                w={"full"}
              >
                <Button
                  bg={"blue.400"}
                  rounded={"full"}
                  color={"white"}
                  flex={"1 0 auto"}
                  bgGradient="linear(to-r, #c61682, #ee670d)"
                  _hover={{ opacity: "0.8" }}
                >
                  Bonsai Warriors NFTs
                </Button>
              </Stack>
            </Stack>
          </Flex>
          {/* carousal */}
        </Container>
      ) : null}
    </div>
  );
};

export default NFT;
