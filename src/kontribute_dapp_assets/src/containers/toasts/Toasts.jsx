import { createStandaloneToast, Progress } from "@chakra-ui/react";
import React from "react";

const toast = createStandaloneToast();

// general success toast
export const SuccessToast = (msg) => {
    return toast({
        title: msg,
        status: "success",
        isClosable: true,
        duration: 2500,
        position: "top-right",
        containerStyle: {
          marginTop: "5.5rem",
        },
      });
}

// general failed toast
export const FailedToast = (msg) => {
    return toast({
        title: msg,
        status: "error",
        isClosable: true,
        position: "top-right",
        duration: 1500,
        containerStyle: {
          marginTop: "5.5rem",
        },
      });
};

export const CopyToast = () => {
    return toast({
      title: `Address Copied`,
      status: "info",
      isClosable: true,
      position: "top-right",
      duration: 1000,
      containerStyle: {
        marginTop: "5.5rem",
      },
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
    position: "top-right",
    duration: null,
    containerStyle: {
      marginTop: "5.5rem",
    },
  });
};

export const SuccessICPToast = (amount, to) => {
  return toast({
    title: `${amount} sent to ${to.substring(0, 5)}...${to.substring(
      60,
      64
    )}`,
    status: "success",
    isClosable: true,
    position: "top-right",
    containerStyle: {
      marginTop: "5.5rem",
    },
  });
};
