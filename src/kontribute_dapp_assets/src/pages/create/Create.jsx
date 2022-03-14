import React, { useState, useContext } from "react";
import { NavBar } from "../../containers";
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
  useToast
} from "@chakra-ui/react";

import { UserContext } from "../../Context";

const Create = () => {
  const { signActor } = useContext(UserContext);

  const [alert, setAlert] = useState(true);

  const toggleAlert = () => {
    setAlert(false);
  };

  // for toasts:
  const toast = useToast();

  // post story to backend
  const postStory = async () => {
    const user = await signActor();
    const post = await user.uploadStory({
      title: Title.value,
      body: Body.value,
      chapter: Chapter.value,
    });
    if (post.toString() === "Story Created!") {
      toast({
        title: `Success! Story posted`,
        status: "success",
        isClosable: true,
        position: "top-right",
        containerStyle: {
          marginTop: "5.5rem",
        },
      });
    }else{
      toast({
        title: `Failed! A field was invalid`,
        status: "error",
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
    }
  };

  return (
    <div>
      <NavBar />
      <Container>
        {alert ? (
          <Alert
            mt="3rem"
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
            height="200px"
          >
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Create functionality is still in testing!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
              For now 1 user may upload 1 story, these will appear in community
              stories. Stories may be deleted as we upgrade the appearence and
              functionality of the create feature.
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
          <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
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
                    <FormControl id="Chapter" isRequired>
                      <FormLabel>Chapter</FormLabel>
                      <Input type="text" placeholder="Chapter 1" />
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
