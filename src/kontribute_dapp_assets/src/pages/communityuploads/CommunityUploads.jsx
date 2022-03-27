import React, { useContext, useState } from "react";
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
import { Link } from "../../../../../node_modules/react-router-dom/index";

const CommunityUploads = () => {
  const { signActor } = useContext(UserContext);

  const [storytitle, setTitle] = useState("");
  const [storygenre, setGenre] = useState("");
  const [storybody, setBody] = useState("");
  const [discord, setDiscord] = useState("");

  const [userId, setId] = useState("");

  const getStories = async () => {
    const user = await signActor();
    const result = await user.getAllStories(10);
    // for the second story:
    // setTitle(result[0][1][0][0][1].title);
    // setGenre(result[0][1][0][0][1].genre);
    // setBody(result[0][1][0][0][1].body);
    // setDiscord(result[0][1][0][0][1].user_discord)
    //// for the first story
    setTitle(result[0][0][1].title);
    setGenre(result[0][0][1].genre);
    setBody(result[0][0][1].body);

    // TODO: needs to show all story titles and userIds : need a loop
    setId(result[0][0][0].toString())
  };

  return (
    <div>
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
          {/* dynamic link */}
          <Link to={userId}>
          <Button >load story</Button>
          </Link>
        </Box>
        <Button onClick={() => getStories()}>load story</Button>
      </Center>
    </div>
  );
};

export default CommunityUploads;
