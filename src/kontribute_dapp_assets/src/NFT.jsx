import React, { useState, useEffect } from "react";
import { NavBar } from "./containers";
import anvillogo from "../assets/anvillogo.svg";
import { Box, Center, Heading, Text, Stack, Image } from "@chakra-ui/react";
import React from "react";

//images:
import bonsai_1 from "../assets/bonsai_nfts/bonsai_1.png";
import bonsai_2 from "../assets/bonsai_nfts/bonsai_2.png";
import bonsai_3 from "../assets/bonsai_nfts/bonsai_3.png";
import bonsai_4 from "../assets/bonsai_nfts/bonsai_4.png";
import bonsai_5 from "../assets/bonsai_nfts/bonsai_5.png";

import {
  Box,
  IconButton,
  useBreakpointValue,
  Stack,
  Heading,
  Text,
  Container,
} from "@chakra-ui/react";

// And react-slick as our Carousel Lib
import Slider from "react-slick";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <NavBar />
      {/* the courousal */}
      <Container mt="-2rem">
        <Center>
          <Heading
            fontWeight={600}
            fontSize={{ base: "2xl", sm: "2xl", md: "2xl" }}
            lineHeight={"110%"}
            mb={"1rem"}
          >
            <Text
              as={"span"}
              bgGradient="linear(to-t, #705025, #a7884a)"
              bgClip="text"
            >
              Bonsai Warriors NFTs
            </Text>
          </Heading>
        </Center>
        <Stack align={"center"}>
          <Text color={"gray.500"} fontSize={"sm"} textTransform={"uppercase"}>
            via NFT Anvil
          </Text>
          <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
            (Coming Soon)
          </Heading>
          <Stack direction={"row"} align={"center"}></Stack>
        </Stack>
        <Box
          bg="#fff"
          border="solid 1px"
          borderColor="#9d8144"
          mb={"5rem"}
          borderRadius={"xl"}
          position={"relative"}
          height={"520px"}
          width={"full"}
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
                backgroundPosition="center"
                backgroundRepeat="no-repeat"
                backgroundSize="auto"
                backgroundImage={`url(${card.image})`}
              >
                <a
                  href="https://nftanvil.com/mint"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Center>
                    <Image
                      zIndex={2}
                      top="10%"
                      pos={"absolute"}
                      rounded={"lg"}
                      height={230}
                      width={282}
                      src={anvillogo}
                    />
                  </Center>
                </a>
                {/* This is the block you need to change, to customize the caption */}
                <Container
                  size="container.lg"
                  height="600px"
                  position="relative"
                >
                  <Stack
                    spacing={6}
                    w={"full"}
                    maxW={"lg"}
                    position="absolute"
                    top="50%"
                    transform="translate(0, -50%)"
                  >
                    <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
                      {card.title}
                    </Heading>
                    <Text fontSize={{ base: "md", lg: "lg" }} color="GrayText">
                      {card.text}
                    </Text>
                  </Stack>
                </Container>
              </Box>
            ))}
          </Slider>
        </Box>
      </Container>
    </div>
  );
};

export default NFT;
