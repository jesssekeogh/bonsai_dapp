import React from "react";
import { Box, Badge } from '@chakra-ui/react';
import "./StoryBox.css"
import { Link } from "react-router-dom";

const StoryBox = (props) => {
  return (
    <div>
      <Box maxW="sm" bg="#17191e" borderWidth="1px" borderRadius="lg" overflow="hidden" borderColor="#9d8144">
        <Box p="6">
          <Box display="flex" alignItems="baseline">
            <Badge borderRadius="full" px="2" colorScheme="teal">
              New
            </Badge>
            <Box
              color="white"
              fontWeight="semibold"
              letterSpacing="wide"
              fontSize="xs"
              textTransform="uppercase"
              ml="2"
            >
              {props.chapter}
            </Box>
          </Box>

          <Box
            mt="1"
            fontWeight="semibold"
            as="h4"
            lineHeight="tight"
            isTruncated
            color="#fff"
          >
            {props.title}
          </Box>

          <Box display="flex" mt="2" alignItems="center">
            <Box as="span" color="#fff" fontSize="sm">
              {props.preview}
            </Box>
          </Box>
          <Box mt="3" alignItems="center">
          <div className="bonsai__btn">
              <Link to={props.link}>
                <button type="button">Read Now</button>
              </Link>
            </div>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default StoryBox;
