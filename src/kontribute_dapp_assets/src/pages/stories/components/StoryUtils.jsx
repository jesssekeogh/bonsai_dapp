import React from "react";
import {
  Container,
  Flex,
  Spacer,
  Button,
  useColorModeValue,
  Hide,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../../containers/colormode/Colors";
import { useLocation } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";
import { FaHeart, FaRegHeart, FaTwitter, FaDonate } from "react-icons/fa";

const StoryUtils = () => {
  const location = useLocation();

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  console.log(location);
  return (
    <Flex rounded={"lg"} m={3}>
      <Container
        bg={bgColor}
        color={textColor}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
      >
        <Flex align="center" gap={3}>
          <Button
            bg={"none"}
            leftIcon={<ViewIcon />}
            _hover={{ bg: "none", cursor: "default" }}
          >
            25
          </Button>
          <Spacer />
          <Button>
            <FaDonate />
          </Button>
          <Button leftIcon={<FaRegHeart />}>25</Button>
          <a
            href={`https://twitter.com/intent/tweet?text=Check out this story on Kontribute📜%0a&url=https://3ezq7-iqaaa-aaaal-aaacq-cai.raw.ic0.app${encodeURIComponent(
              location.pathname
            )}%0a&hashtags=Web3Storytelling`}
            data-show-count="false"
            target="_blank"
          >
            <Hide below="md">
              <Button colorScheme="twitter" leftIcon={<FaTwitter />}>
                Share
              </Button>
            </Hide>
            <Hide above="md">
              <Button colorScheme="twitter">
                <FaTwitter />
              </Button>
            </Hide>
          </a>
        </Flex>
      </Container>
    </Flex>
  );
};

export default StoryUtils;
