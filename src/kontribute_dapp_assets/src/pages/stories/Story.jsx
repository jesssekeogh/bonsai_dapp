import React from "react";
import { Link } from "react-router-dom";
import {
  SlideFade,
  Box,
  Heading,
  Text,
  Container,
  Stack,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

const Story = ({
  title,
  description,
  slideDelay,
  imgbg,
  author,
  authorimg,
  tags,
  link,
}) => {
  return (
    <SlideFade in={true} offsetY="20px">
      <Container maxW={"7xl"} p="10" pt="0">
        <Link to={link}>
          <Box
            marginTop={{ base: "1", sm: "5" }}
            display="flex"
            flexDirection={{ base: "column", sm: "row" }}
            justifyContent="space-between"
          >
            <Box
              display="flex"
              flex="1"
              marginRight="3"
              position="relative"
              alignItems="center"
            >
              <Box
                width={{ base: "100%", sm: "85%" }}
                marginLeft={{ base: "0", sm: "5%" }}
                marginTop="5%"
                overflow="hidden"
                borderRadius="lg"
              >
                <ChakraImage
                  transform="scale(1.0)"
                  src={imgbg}
                  objectFit="contain"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Box>
              <Box width="100%" position="absolute" height="100%" zIndex={-1}>
                <Box
                  bgGradient={"radial(blue.600 1px, transparent 1px)"}
                  backgroundSize="20px 20px"
                  opacity="0.4"
                  height="100%"
                />
              </Box>
            </Box>
            <Box
              display="flex"
              flex="1"
              flexDirection="column"
              justifyContent="center"
              marginTop={{ base: "3", sm: "0" }}
            >
              <Tags tags={tags} />
              <Heading
                marginTop="1"
                bgGradient="linear(to-t, #705025, #a7884a)"
                bgClip="text"
              >
                {title}
              </Heading>
              <Text
                as="p"
                marginTop="2"
                fontWeight={600}
                color="#f0e6d3"
                fontSize="lg"
              >
                {description}
              </Text>
              <Stack
                mt="1rem"
                direction={"row"}
                spacing="2rem"
                align={"center"}
                alignSelf={"start"}
                position={"relative"}
              >
                <Author name={author} img={authorimg} />
              </Stack>
            </Box>
          </Box>
        </Link>
      </Container>
    </SlideFade>
  );
};
export default Story;
