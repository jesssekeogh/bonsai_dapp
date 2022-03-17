import React, { useContext, useState } from "react";
import { NavBar } from "../../containers";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  useColorModeValue,
  Button,
} from "@chakra-ui/react";

import { UserContext } from "../../Context";

const CommunityUploads = () => {
  const { signActor } = useContext(UserContext);

  const [storytitle, setTitle] = useState("");
  const [storygenre, setGenre] = useState("");
  const [storybody, setBody] = useState("");
  const [discord, setDiscord] = useState("");

  const getStories = async () => {
    const user = await signActor();
    const result = await user.getAllStories(10);
    // for the second story:
    setTitle(result[0][1][0][0][1].title);
    setGenre(result[0][1][0][0][1].genre);
    setBody(result[0][1][0][0][1].body);
    setDiscord(result[0][1][0][0][1].user_discord)
    //// for the first story
    // setTitle(result[0][0][1].title);
    // setChapter(result[0][0][1].chapter);
    // setBody(result[0][0][1].body);

    console.log(result[0][1][0][0][1])
  };

  return (
    <div>
      <NavBar />
      <Center py={6}>
        <Box
          maxW={"445px"}
          w={"full"}
          bg={useColorModeValue("white", "gray.900")}
          boxShadow={"2xl"}
          rounded={"md"}
          p={6}
          overflow={"hidden"}
        >
          <Stack>
            <Text
              color={"green.500"}
              textTransform={"uppercase"}
              fontWeight={800}
              fontSize={"sm"}
              letterSpacing={1.1}
            >
              {storygenre}
            </Text>
            <Heading
              color={useColorModeValue("gray.700", "white")}
              fontSize={"2xl"}
              fontFamily={"body"}
            >
              {storytitle}
            </Heading>
            <Text color={"gray.500"}>{storybody}</Text>
          </Stack>
          <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
            <Avatar
              src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
              alt={"Author"}
            />
            <Stack direction={"column"} spacing={0} fontSize={"sm"}>
              <Text fontWeight={600}>{discord}</Text>
              <Text color={"gray.500"}>Feb 08, 2021 · 6min read</Text>
            </Stack>
          </Stack>
        </Box>
        <Button onClick={() => getStories()}>load story</Button>
      </Center>
    </div>
  );
};

export default CommunityUploads;
