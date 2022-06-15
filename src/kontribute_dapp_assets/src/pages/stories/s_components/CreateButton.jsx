import React from "react";
import {
  Stack,
  Spacer,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsPenFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const CreateButton = ({ author }) => {
  const user = useSelector((state) => state.Profile.principal);
  const isLogged = useSelector((state) => state.Profile.loggedIn);
  if (user !== author) return null;
  return (
    <Stack direction={"row"} mb={2}>
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
    </Stack>
  );
};

export default CreateButton;
