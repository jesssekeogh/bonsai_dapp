import React from "react";
import {
  Flex,
  Container,
  Text,
  HStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import IcLogo from "../../../assets/ic-logo.png";
import AnvLogo from "../../../assets/anvillogo.svg";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const ChainAndStandard = () => {
  const bgColor = useColorModeValue("white", "#111111");
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  return (
    <Flex rounded={"lg"}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
        <HStack align="center" spacing={5}>
          <Flex align="center">
            <Text
              fontWeight={600}
              fontSize={{ base: "md", md: "lg" }}
              color="#b2b8be"
            >
              Chain:
            </Text>
            <Text
              fontWeight={500}
              fontSize={{ base: "md", md: "lg" }}
              color={textColor}
            >
              &nbsp;ICP&nbsp;
            </Text>
            <ChakraImage src={IcLogo} h={"20px"} w={"auto"} />
          </Flex>
          <Flex align="center">
            <Text
              fontWeight={600}
              fontSize={{ base: "md", md: "lg" }}
              color="#b2b8be"
            >
              Standard:
            </Text>
            <Text
              fontWeight={500}
              fontSize={{ base: "md", md: "lg" }}
              color={textColor}
            >
              &nbsp;NFTA&nbsp;
            </Text>
            <ChakraImage src={AnvLogo} h={"20px"} w={"auto"} />
          </Flex>
        </HStack>
      </Container>
    </Flex>
  );
};

export default ChainAndStandard;
