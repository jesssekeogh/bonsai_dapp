import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  SlideFade,
  Image as ChakraImage,
  Text,
  HStack,
  Tag,
} from "@chakra-ui/react";

const CollectionThumb = ({
  colimg,
  title,
  description,
  tags,
  author,
  authorimg,
  link,
}) => {
  return (
    <>
      <SlideFade in={true} offsetY="20px">
        <Link to={link}>
          <Box spacing="30px" marginTop="5">
            <Box w="100%">
              <Box borderRadius="lg" overflow="hidden" mb={3}>
                <ChakraImage
                  transform="scale(1.0)"
                  bg={"#fff"}
                  src={colimg}
                  objectFit="contain"
                  transition="0.3s ease-in-out"
                  _hover={{
                    transform: "scale(1.05)",
                  }}
                />
              </Box>
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
              <Author name={author} img={authorimg} />
            </Box>
          </Box>
        </Link>
      </SlideFade>
    </>
  );
};

const Tags = (props) => {
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

const Author = (props) => {
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

export default CollectionThumb;
