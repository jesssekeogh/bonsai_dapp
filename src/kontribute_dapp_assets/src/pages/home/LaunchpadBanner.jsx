import React from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  VStack,
  Skeleton,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  HeadingColorLight,
} from "../../containers/colormode/Colors";

const LaunchpadBanner = ({ mainImg, logoImg, link, name }) => {
  return (
    <NavLink to={link}>
      <Flex
        flex={1}
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"auto"}
      >
        <Box
          role={"group"}
          w={"auto"}
          backgroundColor={"#fff"}
          rounded={"lg"}
          boxShadow="md"
        >
          <Box rounded={"lg"} pos={"relative"} overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              bg="#fff"
              rounded={"lg"}
              height={["220px", null, "350px"]}
              width={"auto"}
              objectFit={"cover"}
              src={mainImg}
              fallback={<Skeleton height={["220px", null, "350px"]} />}
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
          <Flex p={2} align="center">
            <ChakraImage
              src={logoImg}
              h={["30px", null, "50px"]}
              w={"auto"}
              rounded="full"
            />
            <VStack px={3} align={"start"} justify={"space-between"}>
              <Text
                color={HeadingColorLight}
                casing={"uppercase"}
                fontSize={{ base: "6pt", sm: "xs", md: "xs" }}
                mb={-2}
              >
                Latest NFT Collection
              </Text>
              <Heading
                fontSize={{ base: "xs", sm: "xs", md: "md" }}
                as="u"
                color={HeadingColorLight}
              >
                {name}
              </Heading>
            </VStack>
          </Flex>
        </Box>
      </Flex>
    </NavLink>
  );
};

export default LaunchpadBanner;
