import React from "react";
import { SendingToast, SuccessToast } from "../../../containers/toasts/Toasts";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../../declarations/story";
import { MdDelete } from "react-icons/md";
import {
  Button,
  createStandaloneToast,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../../containers/colormode/Colors";

const { toast } = createStandaloneToast();

const DeleteButton = ({ storyId }) => {
  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const deleteStory = (storyId) => {
    SendingToast("Deleting Story...");

    storyMo.delete(Number(storyId));
    toast.closeAll();
    SuccessToast("Success!", `Story with ID ${storyId} deleted`);
  };

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  return (
    <Button
      bg={buttonBgColor}
      color={buttonTextColor}
      size={"md"}
      maxW={"150px"}
      mx={2}
      _hover={{ opacity: "0.8" }}
      rightIcon={<MdDelete />}
      onClick={() => {
        deleteStory(storyId);
      }}
    >
      Delete
    </Button>
  );
};

export default DeleteButton;
