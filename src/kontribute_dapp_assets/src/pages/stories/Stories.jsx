import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Heading,
  Avatar,
  Box,
  Center,
  SimpleGrid,
  Image,
  Flex,
  Text,
  Stack,
  HStack,
  Button,
  useColorModeValue,
  useBreakpointValue,
  Container,
  Spacer,
  Divider,
  Flex,
} from "@chakra-ui/react";
import { FaThumbsUp } from "react-icons/fa";
import { BsPenFill } from "react-icons/bs";

const Stories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container maxW={"7xl"} mt={{ base: -10, md: -2 }} mb={5}>
        <CreateStory />
        <PeakGrid heading={"Featured"} />
        <PeakGrid heading={"Most Liked"} />
        <PeakGrid heading={"Latest"} />
      </Container>
    </>
  );
};

export default Stories;

const PeakGrid = ({ heading }) => {
  return (
    <>
      <Heading my={1} bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
        {heading}
      </Heading>
      <Divider my={2} borderColor="#16171b" />
      <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
        <SingleStory />
        <SingleStory />
        <SingleStory />
        <SingleStory />
      </SimpleGrid>
      <ViewAllButton />
    </>
  );
};

const SingleStory = () => {
  // max 110 character count for short description
  return (
    <Link to={"/stories/" + "afryb3-greui" +"/" + "1"}>
      <Box
        w={"full"}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow={"2xl"}
        rounded={"md"}
        overflow={"hidden"}
      >
        <Box p={6}>
          <Stack spacing={0} align={"left"} mb={5}>
            <Heading fontSize={["md", null, "xl"]} fontWeight={600}>
              Title
            </Heading>
            <Text color={"gray.500"} fontSize={["7pt", null, "md"]}>
              Frontend Developer Frontend Developer Frontend Developer Frontend
              Developer Frontend Developer Frontend Develo
            </Text>
          </Stack>

          <Stack direction={"row"} align={"center"} spacing={2}>
            <Spacer />
            <Box color="#000">
              <FaThumbsUp />
            </Box>
            <Box
              borderRadius="md"
              bg="#0fbdde"
              color="black"
              fontWeight="semibold"
              px="1"
            >
              25
            </Box>
          </Stack>
        </Box>
      </Box>
    </Link>
  );
};

const ViewAllButton = () => {
  return (
    <Stack direction={"row"}>
      <Spacer />
      <Button
        mt={8}
        colorScheme="#282828"
        bg="#282828"
        rounded={"full"}
        px={5}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          opacity: "0.8",
        }}
      >
        View All
      </Button>
    </Stack>
  );
};

const CreateStory = () => {
  return (
    <Stack direction={"row"}>
      <Spacer />
      <Link to="/stories/create">
        <Button
          bg="#17191e"
          border="1px"
          size={useBreakpointValue(["sm", "md"])}
          borderColor="#9d8144"
          color="#f0e6d3"
          colorScheme="#17191e"
          _hover={{ opacity: "0.8" }}
          rightIcon={<BsPenFill />}
        >
          Create a Story
        </Button>
      </Link>
    </Stack>
  );
};
