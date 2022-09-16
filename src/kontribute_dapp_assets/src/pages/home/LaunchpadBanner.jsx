import React from "react";
import {
  Flex,
  Text,
  Heading,
  Box,
  VStack,
  Skeleton,
  Image as ChakraImage,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const LaunchpadBanner = ({ mainImg, logoImg, link, name }) => {
  const bgColor = useColorModeValue("White", "#1d1d20");
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
          backgroundColor={bgColor}
          rounded={"lg"}
          boxShadow="md"
        >
          <Box rounded={"lg"} pos={"relative"} overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              bg={bgColor}
              rounded={"lg"}
              height={["250px", null, "350px"]}
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
                casing={"uppercase"}
                fontSize={{ base: "6pt", sm: "xs", md: "xs" }}
                mb={-2}
              >
                Latest NFT Collection
              </Text>
              <Heading fontSize={{ base: "xs", sm: "xs", md: "md" }} as="u">
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
