import React from "react";
import {
  Stack,
  Spacer,
  Button,
  useBreakpointValue,
  Text,
} from "@chakra-ui/react";
import { BsPenFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const HowTo = "https://medium.com";

const CreateButton = () => {
  const isLogged = useSelector((state) => state.Profile.loggedIn);
  return (
    <Stack direction={"row"} align={"center"}>
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
          disabled={!isLogged}
        >
          Create Story
        </Button>
      </Link>
      <a href={HowTo} target="_blank" rel="noreferrer">
        <Text
          color="#6495ED"
          _hover={{
            opacity: "0.8",
            textDecoration: "underline",
            cursor: "pointer",
          }}
        >
          How to?
        </Text>
      </a>
    </Stack>
  );
};

export default CreateButton;
