import React from "react";
import { SendingToast, SuccessToast } from "../../../containers/toasts/Toasts";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../../declarations/story";
import { MdDelete } from "react-icons/md";
import { Button, createStandaloneToast } from "@chakra-ui/react";

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

  return (
    <Button
      boxShadow="base"
      _hover={{
        boxShadow: "md",
      }}
      size={"md"}
      maxW={"150px"}
      mx={2}
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
