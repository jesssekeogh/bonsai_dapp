import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import {
  Container,
  Center,
  Button,
  Flex,
  Box,
  Heading,
  Spacer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Bounce } from "react-awesome-reveal";
import { UserContext } from "../../../Context.jsx";

/* This component is used for dynamic voting on the bonsai story, 
The Vote options funcs stay the same as these are updated on the backend
as new chapters roll out, only query votes are updated by props
It does not need to be updated and props may be passed to it in the following form:
<BonsaiVote
BackendVoteQuery1={"user.getVote1II()"} -- getVote*name of chapter* - comes from the backend
BackendVoteQuery2={"user.getVote2II()"}
BackendVoteQuery3={"user.getVote2II()"}
Question={"What is your name?"} -- The question for the options (string)
Option1Title={"Jiang Zhe"} -- The option title (string)
Option1Details={Option1Details()} -- The option details defined in the story component (function)
Option2Title={"Tang Wei"}
Option2Details={Option2Details()}
Option3Title={"Han Li"}
Option3Details={Option3Details()}
VoteEnded={false} -- Has the voted ended ? will automatically update depending
/> */

const BonsaiVote = (props) => {
  // the votes:
  const [vote1, setvote1] = useState(<Spinner size="xs" />);
  const [vote2, setvote2] = useState(<Spinner size="xs" />);
  const [vote3, setvote3] = useState(<Spinner size="xs" />);

  const { signActor } = useContext(UserContext);
  const toast = useToast();
  // for toasts:
  const SuccessToast = () => {
    return toast({
      title: `Success! Thanks for voting`,
      status: "success",
      isClosable: true,
      position: "top-right",
      containerStyle: {
        marginTop: "5.5rem",
      },
    });
  }

  const FailedToast = () => {
    return toast({
      title: `Failed! You have already voted`,
      status: "error",
      isClosable: true,
      position: "top-right",
      containerStyle: {
        marginTop: "5.5rem",
      },
    });
  }

  const voteoption1 = async () => {
    setClick1(true);
    const user = await signActor();
    const vote = await user.VoteOption1();
    if (vote.toString() === "user has voted successfully on vote1") {
      getvote1();
      setClick1(false);
      onClose1();
      return SuccessToast()
    } else {
      setClick1(false);
      onClose1();
      return FailedToast()
    }
  };

  const voteoption2 = async () => {
    setClick2(true);
    const user = await signActor();
    const vote = await user.VoteOption2();
    if (vote.toString() === "user has voted successfully on vote2") {
      getvote2();
      setClick2(false);
      onClose2();
      return SuccessToast()
    } else {
      setClick2(false);
      onClose2();
      return FailedToast()
    }
  };

  const voteoption3 = async () => {
    setClick3(true);
    const user = await signActor();
    const vote = await user.VoteOption3();
    if (vote.toString() === "user has voted successfully on vote3") {
      getvote3();
      setClick3(false);
      onClose3();
      return SuccessToast()
    } else {
      setClick3(false);
      onClose3();
      return FailedToast()
    }
  };

  // query the votes
  // get the specific vote from backend motoko query (with prop)
  const getvote1 = async () => {
    const user = await signActor();
    const votes = await eval(props.BackendVoteQuery1);
    setvote1(votes.toString());
  };

  const getvote2 = async () => {
    const user = await signActor();
    const votes = await eval(props.BackendVoteQuery2);
    setvote2(votes.toString());
  };

  const getvote3 = async () => {
    const user = await signActor();
    const votes = await eval(props.BackendVoteQuery3);
    setvote3(votes.toString());
  };

  // for modals
  const {
    isOpen: isOpen1,
    onOpen: onOpen1,
    onClose: onClose1,
  } = useDisclosure();
  const {
    isOpen: isOpen2,
    onOpen: onOpen2,
    onClose: onClose2,
  } = useDisclosure();
  const {
    isOpen: isOpen3,
    onOpen: onOpen3,
    onClose: onClose3,
  } = useDisclosure();

  useEffect(() => {
    getvote1();
    getvote2();
    getvote3();
    window.scrollTo(0, 0);
  }, []);

  // button state for clicks
  const [isClicked1, setClick1] = useState(false);
  const [isClicked2, setClick2] = useState(false);
  const [isClicked3, setClick3] = useState(false);

  const VoteButton1 = () => {
    return (
      <>
        {!isClicked1 ? (
          <Button
            onClick={() => voteoption1()}
            rightIcon={<PlusSquareIcon />}
            bg="#17191e"
            border="1px"
            borderColor="#9d8144"
            color="#f0e6d3"
            colorScheme="#17191e"
            mr="4"
          >
            Place Vote
          </Button>
        ) : null}
        {isClicked1 ? (
          <Bounce>
            <Button
              isLoading
              onClick={() => voteoption1()}
              rightIcon={<PlusSquareIcon />}
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              mr="4"
            >
              Place Vote
            </Button>
          </Bounce>
        ) : null}
      </>
    );
  };

  const VoteButton2 = () => {
    return (
      <>
        {!isClicked2 ? (
          <Button
            onClick={() => voteoption2()}
            rightIcon={<PlusSquareIcon />}
            bg="#17191e"
            border="1px"
            borderColor="#9d8144"
            color="#f0e6d3"
            colorScheme="#17191e"
            mr="4"
          >
            Place Vote
          </Button>
        ) : null}
        {isClicked2 ? (
          <Bounce>
            <Button
              isLoading
              onClick={() => voteoption2()}
              rightIcon={<PlusSquareIcon />}
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              mr="4"
            >
              Place Vote
            </Button>
          </Bounce>
        ) : null}
      </>
    );
  };
  const VoteButton3 = () => {
    return (
      <>
        {!isClicked3 ? (
          <Button
            onClick={() => voteoption3()}
            rightIcon={<PlusSquareIcon />}
            bg="#17191e"
            border="1px"
            borderColor="#9d8144"
            color="#f0e6d3"
            colorScheme="#17191e"
            mr="4"
          >
            Place Vote
          </Button>
        ) : null}
        {isClicked3 ? (
          <Bounce>
            <Button
              isLoading
              onClick={() => voteoption3()}
              rightIcon={<PlusSquareIcon />}
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              mr="4"
            >
              Place Vote
            </Button>
          </Bounce>
        ) : null}
      </>
    );
  };
  return (
    <div>
      {props.VoteEnded ? (
        <Container mb="-2rem" mt="2rem">
          <Center>
            <Alert status="warning" mb="2rem" borderRadius="10px">
              <AlertIcon />
              Voting for this chapter has ended!
            </Alert>
          </Center>
        </Container>
      ) : null}
      <div className="bonsai__vote">
        <Center>
          <h5>{props.Question}</h5>
        </Center>
      </div>
      <Container mt="4">
        <Flex mb="4">
          <Box p="2">
            <Heading size="md" color="#c8aa6e">
              {props.Option1Title}
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button
              onClick={onOpen1}
              mr="2"
              colorScheme="#f0e6d3"
              bg="#282828"
              rounded={"full"}
            >
              Read Option 1&nbsp;
            </Button>
            <Modal isOpen={isOpen1} onClose={onClose1}>
              <ModalOverlay />
              <ModalContent bg="#0a0a0d">
                <ModalHeader color="#c8aa6e">{props.Option1Title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">{props.Option1Details}</div>
                </ModalBody>

                <ModalFooter>
                  {!props.VoteEnded ? <VoteButton1 /> : null}
                  <Button
                    colorScheme="black"
                    color="#f0e6d3"
                    variant="outline"
                    mr={3}
                    onClick={onClose1}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Box
              as="button"
              borderRadius="md"
              bg="#0fbdde"
              color="black"
              fontWeight="semibold"
              px={4}
              h={8}
            >
              {vote1}
            </Box>
          </Box>
        </Flex>

        <Flex mb="4">
          <Box p="2">
            <Heading size="md" color="#c8aa6e">
              {props.Option2Title}
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button
              onClick={onOpen2}
              mr="2"
              colorScheme="#f0e6d3"
              bg="#282828"
              rounded={"full"}
            >
              Read Option 2
            </Button>
            <Modal isOpen={isOpen2} onClose={onClose2}>
              <ModalOverlay />
              <ModalContent bg="#0a0a0d">
                <ModalHeader color="#c8aa6e">{props.Option2Title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">{props.Option2Details}</div>
                </ModalBody>

                <ModalFooter>
                  {!props.VoteEnded ? <VoteButton2 /> : null}
                  <Button
                    colorScheme="black"
                    color="#f0e6d3"
                    variant="outline"
                    mr={3}
                    onClick={onClose2}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Box
              as="button"
              borderRadius="md"
              bg="#0fbdde"
              color="black"
              fontWeight="semibold"
              px={4}
              h={8}
            >
              {vote2}
            </Box>
          </Box>
        </Flex>

        <Flex mb="4">
          <Box p="2">
            <Heading size="md" color="#c8aa6e">
              {props.Option3Title}
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button
              onClick={onOpen3}
              mr="2"
              colorScheme="#f0e6d3"
              bg="#282828"
              rounded={"full"}
            >
              Read Option 3
            </Button>
            <Modal isOpen={isOpen3} onClose={onClose3}>
              <ModalOverlay />
              <ModalContent bg="#0a0a0d">
                <ModalHeader color="#c8aa6e">{props.Option3Title}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">{props.Option3Details}</div>
                </ModalBody>

                <ModalFooter>
                  {!props.VoteEnded ? <VoteButton3 /> : null}
                  <Button
                    colorScheme="black"
                    color="#f0e6d3"
                    variant="outline"
                    mr={3}
                    onClick={onClose3}
                  >
                    Close
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>

            <Box
              as="button"
              borderRadius="md"
              bg="#0fbdde"
              color="black"
              fontWeight="semibold"
              px={4}
              h={8}
            >
              {vote3}
            </Box>
          </Box>
        </Flex>
      </Container>
      <div className="bonsai__story_back-button">
        <Link to="/stories/bonsai-all">
          <button type="button">Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default BonsaiVote;
