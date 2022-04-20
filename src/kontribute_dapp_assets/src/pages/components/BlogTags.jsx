import React from "react";
import { HStack, Tag } from "@chakra-ui/react";

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

export default BlogTags;
