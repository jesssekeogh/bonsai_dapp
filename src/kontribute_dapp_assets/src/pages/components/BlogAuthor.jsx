import React from "react";
import { Text, HStack } from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

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

export default BlogAuthor;
