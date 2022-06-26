import React from "react";
import {
  SendingToast,
  SuccessToast,
} from "../../../containers/toasts/Toasts";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../../declarations/story";
import { MdDelete } from "react-icons/md";
import {
  Button,
  useBreakpointValue,
  createStandaloneToast,
} from "@chakra-ui/react";

const toast = createStandaloneToast();

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

  return (
    <Button
      bg="#17191e"
      border="1px"
      size={useBreakpointValue(["sm", "md"])}
      maxW={"150px"}
      borderColor="#9d8144"
      mx={2}
      color="#f0e6d3"
      colorScheme="#17191e"
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
