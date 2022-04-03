import React from "react";
import { Delayed } from "../../containers";
import { Link } from "react-router-dom";
import {
  SlideFade,
  Box,
  Heading,
  Text,
  HStack,
  Tag,
  Container,
  Button,
  Stack,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

// genre tags
const BlogTags = (props) => {
    return (
      <HStack spacing={2}>
        {props.tags.map((tag) => {
          return (
            <Tag size={"md"} variant="solid" colorScheme="blue" key={tag}>
              {tag}
            </Tag>
          );
        })}
      </HStack>
    );
  };
  
  // Author image and name
  const BlogAuthor = (props) => {
    return (
      <HStack
        marginTop="2"
        spacing="2"
        display="flex"
        alignItems="center"
        color="#f0e6d3"
        fontStyle="italic"
      >
        <ChakraImage
          p="5px"
          borderRadius="5px"
          bg="#fff"
          boxSize="40px"
          src={props.img}
          alt={`Avatar of ${props.name}`}
        />
        <Text fontWeight="medium">{props.name}</Text>
      </HStack>
    );
  };
  
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
      <Delayed waitBeforeShow={slideDelay}>
        <SlideFade in={true} offsetY="20px">
          <Container maxW={"7xl"} p="10" pt="0">
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
                  zIndex="2"
                  marginLeft={{ base: "0", sm: "5%" }}
                  marginTop="5%"
                >
                  <ChakraImage
                    borderRadius="lg"
                    src={imgbg}
                    objectFit="contain"
                  />
                </Box>
                <Box zIndex="1" width="100%" position="absolute" height="100%">
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
                <BlogTags tags={tags} />
                <Heading
                  marginTop="1"
                  bgGradient="linear(to-t, #705025, #a7884a)"
                  bgClip="text"
                >
                  {title}
                </Heading>
                <Text as="p" marginTop="2" color="#f0e6d3" fontSize="lg">
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
                  <BlogAuthor name={author} img={authorimg} />
                  <Link to={link}>
                    <Button
                      w="100%"
                      mt="1rem"
                      colorScheme="#282828"
                      bg="#282828"
                      rounded={"full"}
                      px={6}
                      _hover={{ opacity: "0.8" }}
                    >
                      View All Chapters
                    </Button>
                  </Link>
                </Stack>
              </Box>
            </Box>
          </Container>
        </SlideFade>
      </Delayed>
    );
  };
export default Story
