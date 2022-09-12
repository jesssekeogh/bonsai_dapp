import { createStandaloneToast, Progress } from "@chakra-ui/react";
import React from "react";

const { toast } = createStandaloneToast();

// general success toast
export const SuccessToast = (msg, desc) => {
    return toast({
        title: msg,
        description: desc,
        status: "success",
        isClosable: true,
        position: "bottom-right",
      });
}

// general failed toast
export const FailedToast = (msg, err) => {
    return toast({
        title: msg,
        description: err,
        status: "error",
        isClosable: true,
        position: "bottom-right",
      });
};

export const CopyToast = () => {
    return toast({
      title: `Address Copied`,
      status: "info",
      isClosable: true,
      position: "bottom-right",
      duration: 1000,
    });
};

export const SendingToast = (msg) => {
  return toast({
    title: msg,
    description: (
      <Progress mt={2} colorScheme="gray" size="xs" isIndeterminate />
    ),
    status: "info",
    isClosable: true,
    position: "bottom-right",
    duration: null,
  });
};

export const SuccessICPToast = (amount, to) => {
  return toast({
    title: "Success",
    description:`${amount} sent to ${to.substring(0, 5)}...${to.substring(
      60,
      64
    )}`,
    status: "success",
    isClosable: true,
    position: "bottom-right",
  });
};
