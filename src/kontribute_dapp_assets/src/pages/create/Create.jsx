import React, { useState, useContext, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Container,
  Textarea,
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Progress,
  Spinner,
  HStack,
} from "@chakra-ui/react";
import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

import { UserContext } from "../../Context";

const ModalButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Button
        onClick={onOpen}
        colorScheme="#f0e6d3"
        bg="#282828"
        rounded={"full"}
      >
        Read Prizes
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Community Story Challenge Prizes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <br></br>
            <b>Prizes for the 1st place Winner</b>
            <br></br>
            1. Story will be featured in its own section on Kontribute.
            <br></br>
            2. We will personally create some NFT art for your story and list it
            in "Community NFTs" on Kontribute (You will receive all proceeds
            from its sale, minus fees).
            <br></br>
            <b>Prizes for 3 runner ups</b>
            <br></br>1 Bonsai Warrior NFT each
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="black"
              color="black"
              variant="outline"
              mr={3}
              onClick={onClose}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const Create = () => {
  const { signActor } = useContext(UserContext);

  const [alert, setAlert] = useState(true);

  const toggleAlert = () => {
    setAlert(false);
  };

  // for toasts:
  const toast = useToast();

  const SuccessToast = () => {
    toast({
      title: `Success! Story posted`,
      status: "success",
      isClosable: true,
      position: "top-right",
      containerStyle: {
        marginTop: "5.5rem",
      },
    });
  };

  const FailedToast = () => {
    toast({
      title: `Failed! A field was invalid`,
      status: "error",
      isClosable: true,
      position: "top-right",
      containerStyle: {
        marginTop: "5.5rem",
      },
    });
  };

  const LoadingToast = () => {
    toast({
      title: ("Submitting..."),
      description: <Progress mt={2} colorScheme="gray" size="xs" isIndeterminate />,
      position: "top-right",
      isClosable: true,
      status: "warning",
      duration: 10000,
      containerStyle: {
        marginTop: "5.5rem",
      },
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // post story to backend
  const postStory = async () => {
    LoadingToast();
    const user = await signActor();
    const post = await user.uploadStory({
      title: Title.value,
      body: Body.value,
      genre: Genre.value,
      user_discord: Discord.value
    });
    toast.closeAll()
    if (post.toString() === "Story Created!") {
      return SuccessToast()
    } else {
      return FailedToast()
    }
  };

  return (
    <div>
      <Container>
        {alert ? (
          <Alert
            mt="3rem"
            status="warning"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="250px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Community Story Challenge
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              You may upload one story for the community story challenge. Please
              attach your Discord Handle to your story so we may contact the
              winner.
              <br></br>
              <ModalButton />
            </AlertDescription>
            <CloseButton
              position="absolute"
              right="8px"
              top="8px"
              onClick={() => toggleAlert()}
            />
          </Alert>
        ) : null}
        <Flex align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={2} px={6}>
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"} color="#c8aa6e">
                Web 3.0 Story Creation
              </Heading>
              <Text fontSize={"lg"} color="#f0e6d3">
                Write your own story ✍️
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow={"lg"}
              p={8}
            >
              <Stack spacing={4}>
                <HStack>
                  <Box>
                    <FormControl id="Title" isRequired>
                      <FormLabel>Story Title</FormLabel>
                      <Input type="text" placeholder="Bonsai Warriors" />
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl id="Genre" isRequired>
                      <FormLabel>Genre</FormLabel>
                      <Input type="text" placeholder="Fantasy" />
                    </FormControl>
                  </Box>
                </HStack>
                <FormControl id="Body" isRequired>
                  <FormLabel>Story Body</FormLabel>
                  <Textarea
                    placeholder="In the Celestial Empire, there are laws that must be obeyed, laws which bind all mankind into one great and inexhaustible force."
                    height="10rem"
                  />
                </FormControl>
                <Box>
                  <FormControl id="Discord" isRequired>
                    <FormLabel>Discord Handle</FormLabel>
                    <Input type="text" placeholder="#jes1" />
                  </FormControl>
                </Box>
                <Stack spacing={10} pt={2}>
                  <Button
                    loadingText="Submitting"
                    size="lg"
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{
                      bg: "blue.500",
                    }}
                    onClick={() => postStory()}
                  >
                    Post
                  </Button>
                </Stack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    *Stories may be deleted periodically
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </Container>
    </div>
  );
};

export default Create;
