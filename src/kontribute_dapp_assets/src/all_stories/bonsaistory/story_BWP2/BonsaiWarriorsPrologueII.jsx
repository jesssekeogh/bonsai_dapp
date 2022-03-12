import React, { useContext, useState, useContext, useEffect } from "react";
import { NavBar } from "../../../containers";
import { Link } from "react-router-dom";

// Styling
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
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Fade, Bounce } from "react-awesome-reveal";
import "../BonsaiStory.css";

// user context from auth
import { UserContext } from "../../../Context.jsx";

const BonsaiWarriorsPrologueII = () => {
  const { signActor } = useContext(UserContext);

  // for toasts:
  const toast = useToast();

  // the votes:
  const [vote1, setvote1] = useState("");
  const [vote2, setvote2] = useState("");
  const [vote3, setvote3] = useState("");

  const voteoption1 = async () => {
    setClick1(true);
    const user = await signActor();
    const vote = await user.VoteOption1();
    if (vote.toString() === "user has voted successfully on vote1") {
      getvote1();
      setClick1(false);
      onClose1();
      return toast({
        title: `Success! Thanks for voting`,
        status: "success",
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
    } else {
      setClick1(false);
      onClose1();
      return toast({
        title: `Failed! You have already voted`,
        status: "error",
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
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
      return toast({
        title: `Success! Thanks for voting`,
        status: "success",
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
    } else {
      setClick2(false);
      onClose2();
      return toast({
        title: `Failed! You have already voted`,
        status: "error",
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
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
      return toast({
        title: `Success! Thanks for voting`,
        status: "success",
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
    } else {
      setClick3(false);
      onClose3();
      return toast({
        title: `Failed! You have already voted`,
        status: "error",
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
    }
  };

  // query the votes
  const getvote1 = async () => {
    const user = await signActor();
    const votes = await user.getVote1II();
    setvote1(votes.toString());
  };

  const getvote2 = async () => {
    const user = await signActor();
    const votes = await user.getVote2II();
    setvote2(votes.toString());
  };

  const getvote3 = async () => {
    const user = await signActor();
    const votes = await user.getVote3II();
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
  }, []);

  // button state for clicks
  const [isClicked1, setClick1] = useState(false);
  const [isClicked2, setClick2] = useState(false);
  const [isClicked3, setClick3] = useState(false);

  return (
    <div>
      <NavBar />
      <div className="bonsai__story_heading">
        <Center>
          <h1>Bonsai Warriors</h1>
        </Center>
        <Center>
          <h5>Prologue</h5>
        </Center>
      </div>
      <Fade>
        <Container>
          <div className="bonsai__story">
            <b>Welcome to the start of Character Creation.</b>
            <br></br>
            <br></br>
            <i>
              The winning vote was Artisan, so now we will be introduced to our
              character and their life. You can consider this a part of the
              prologue as well, an introduction to the world and story for all.
            </i>
            <br></br>
            <br></br>- - - - - - - - - - - - -<br></br>
            <br></br>
            The sun is good company on this warm summer's day. You walk along
            with an upbeat swing to your steps, passing by the terraces of your
            family’s herb farm. Walking down the little groove of dirt that
            marks the path to your family’s home, it’s a great day. Your
            father’s pride, his mulberry trees are in full bloom, their
            multitude of sweet berries bending the branches down in your way.
            You take full advantage of it, snagging some of them to snack on as
            you reach the final stretch to your home. The path exited the
            terraced farmland and spilled out onto the flat grasslands below.
            <br></br>
            <br></br>
            Your father is the last in a long line of farmers, together your
            family carved over a dozen generations carved this place out of the
            wilderness. The family home reflects this, with the dozen-odd
            buildings that sprawl along, the barns, work sheds, and the house
            itself. To a more critical eye, it would be a rich peasant’s idea of
            wealth, for you, it's much simpler, its home.
            <br></br>
            <br></br>
            Above the homestead there is a faint curl of smoke, escaping from
            the kitchen’s chimney. It’s almost lunchtime and you are starving.
            The final stretch of the journey gets eaten up fast and the entry
            into the kitchen is fairly dramatic.
            <br></br>
            <br></br>
            Bounding through the door with a confident grin and a cheeky
            declaration…
          </div>
        </Container>
      </Fade>
      <div className="bonsai__vote">
        <Center>
          <h5>Who is your name?</h5>
        </Center>
      </div>
      <Container mt="4">
        <Flex mb="4">
          <Box p="2">
            <Heading size="md" color="#c8aa6e">
              Jiang Zhe
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button onClick={onOpen1} mr="2" colorScheme="#f0e6d3" bg="#282828">
              Read Option 1&nbsp;
            </Button>
            <Modal isOpen={isOpen1} onClose={onClose1}>
              <ModalOverlay />
              <ModalContent bg="#0a0a0d">
                <ModalHeader color="#c8aa6e">
                  Jiang Zhe - The Battle God!
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">
                    Age: 16
                    <br></br>
                    <br></br>
                    Gender: Male
                    <br></br>
                    <br></br>
                    Advantages:
                    <br></br>
                    Melee Talent, you will more easily learn the close range and
                    physical combat arts with both weapon and fist.
                  </div>
                </ModalBody>

                <ModalFooter>
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
              onClick={() => getvote1()}
            >
              {vote1}
            </Box>
          </Box>
        </Flex>

        <Flex mb="4">
          <Box p="2">
            <Heading size="md" color="#c8aa6e">
              Tang Wei
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button onClick={onOpen2} mr="2" colorScheme="#f0e6d3" bg="#282828">
              Read Option 2
            </Button>
            <Modal isOpen={isOpen2} onClose={onClose2}>
              <ModalOverlay />
              <ModalContent bg="#0a0a0d">
                <ModalHeader color="#c8aa6e">
                  Tang Wei - The Sorceress of Destiny!
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">
                    Age: 17
                    <br></br>
                    <br></br>
                    Gender: Female
                    <br></br>
                    <br></br>
                    Advantages:
                    <br></br>
                    Support/Exotic Talent, you will more easily learn skills
                    that enhance or weaken others, as well as more exotic
                    effects.
                  </div>
                </ModalBody>

                <ModalFooter>
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
              Han Li
            </Heading>
          </Box>
          <Spacer />
          <Box>
            <Button onClick={onOpen3} mr="2" colorScheme="#f0e6d3" bg="#282828">
              Read Option 3
            </Button>
            <Modal isOpen={isOpen3} onClose={onClose3}>
              <ModalOverlay />
              <ModalContent bg="#0a0a0d">
                <ModalHeader color="#c8aa6e">
                  Han Li - The Fastest Bow in Zunyi!
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">
                    Age: 15
                    <br></br>
                    <br></br>
                    Gender: Male
                    <br></br>
                    <br></br>
                    Advantages
                    <br></br>
                    Ranged Talent, you will more easily learn ranged weapons and
                    martial arts, both mundane and mystical.
                  </div>
                </ModalBody>

                <ModalFooter>
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
        <Link to="/bonsai-all">
          <button type="button">Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default BonsaiWarriorsPrologueII;
