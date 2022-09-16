import React from "react";
import {
  Stack,
  Spacer,
  Button,
  useBreakpointValue,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { BsPenFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../../containers/colormode/Colors";

const HowTo = "https://medium.com/@teambonsai.icp/c5c2cc3c404b";

const CreateButton = () => {
  const isLogged = useSelector((state) => state.Profile.loggedIn);

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <Stack direction={"row"} align={"center"} py={3}>
      <Spacer />
      <Link to="/stories/create">
        <Button
          size={useBreakpointValue(["md", "lg"])}
          _hover={{ opacity: "0.8" }}
          bg={buttonBgColor}
          color={buttonTextColor}
          rightIcon={<BsPenFill />}
          disabled={!isLogged}
          boxShadow="base"
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
