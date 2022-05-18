import React from 'react'
import { Text, HStack, Tag } from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

export const Tags = (props) => {
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
    )
}

export const Author = (props) => {
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