import React, { useContext, useState, useContext, useEffect } from "react";
import NavBar from "../nav/NavBar";
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
} from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { Fade, Bounce } from "react-awesome-reveal";
import "./BonsaiStory.css";

// user context from auth
import { UserContext } from "../../Context.jsx";

const BonsaiStory = () => {
  const { signActor } = useContext(UserContext);

  // the votes:
  const [vote1, setvote1] = useState("");
  const [vote2, setvote2] = useState("");
  const [vote3, setvote3] = useState("");

  const voteoption1 = async () => {
    setClick1(true);
    const user = await signActor();
    const vote = await user.VoteOption1();
    if (vote.toString() === "user has voted successfully on vote1") {
      setClick1(false);
      onClose1();
      return alert("Success! Thanks for voting");
    } else {
      setClick1(false);
      onClose1();
      return alert("Failed! You have already voted");
    }
  };

  const voteoption2 = async () => {
    setClick2(true);
    const user = await signActor();
    const vote = await user.VoteOption2();
    if (vote.toString() === "user has voted successfully on vote2") {
      setClick2(false);
      onClose2();
      return alert("Success! Thanks for voting");
    } else {
      setClick2(false);
      onClose2();
      return alert("Failed! You have already voted");
    }
  };

  const voteoption3 = async () => {
    setClick3(true);
    const user = await signActor();
    const vote = await user.VoteOption3();
    if (vote.toString() === "user has voted successfully on vote3") {
      setClick3(false);
      onClose3();
      return alert("Success! Thanks for voting");
    } else {
      setClick3(false);
      onClose3();
      return alert("Failed! You have already voted");
    }
  };

  // query the votes
  const getvote1 = async () => {
    const user = await signActor();
    const votes = await user.getVote1();
    setvote1(votes.toString());
  };

  const getvote2 = async () => {
    const user = await signActor();
    const votes = await user.getVote2();
    setvote2(votes.toString());
  };

  const getvote3 = async () => {
    const user = await signActor();
    const votes = await user.getVote3();
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
            Welcome to the tale of Bonsai Warriors - here you take part in the
            world that you shall in the future enjoy in other means. This is an
            interactive story. Together you decide the course of the story told
            as it unfolds. You will begin as a mere novice, a beginner. By the
            end of this tale, you shall have carved a place for yourself in this
            world as a legend or died trying.
            <br></br>
            <br></br>
            Let us now introduce you to where you shall begin this journey. The
            Celestial Empire of Man.
            <br></br>
            <br></br>
            In the Celestial Empire, there are laws that must be obeyed, laws
            which bind all mankind into one great and inexhaustible force. None
            can defeat the boundless spirit and drive of the peoples of this
            great empire. This is so because of the God-Emperor, praise be the
            Kangxi Emperor. May his rule last another thousand years yet.
            <br></br>
            <br></br>
            He is the guardian of the Eternal Bonsai, the greatest of all
            mankind and the most powerful of all the Celestial Empire. It is
            under his command that the legions and sects stand guard. It is his
            wishes that decide the fate of millions. It is all because of his
            power. Might makes right. In the Celestial Empire, only the Kangxi
            Emperor can be right.
            <br></br>
            <br></br>
            As for you, this is but the beginning of your journey in this world.
            You are just a lowly acolyte, freshly accepted to a prestigious
            academy. Here you shall learn how to harness the same powers that
            the Emperor and his most powerful Cultivators enjoy. You will learn
            sorcery and you will make a name for yourself.
            <br></br>
            <br></br>
            But for now, the most pressing question is...
          </div>
        </Container>
      </Fade>
      <div className="bonsai__vote">
        <Center>
          <h5>who are you?</h5>
        </Center>
      </div>
      <Container mt="4">
        <Flex mb="4">
          <Box p="2">
            <Heading size="md" color="#c8aa6e">
              Artisan
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
                <ModalHeader color="#c8aa6e">Artisan</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">
                    Child of a working family, owners of a fairly prosperous
                    Spirit Herb farm, local to the academy. This will be the
                    furthest you have ever traveled.
                    <br></br>
                    <br></br>
                    Advantages: Some resources, Average starting ability.
                    Numerous miscellaneous skills. Above-average innate talent.
                    <br></br>
                    <br></br>
                    Disadvantages: No real disadvantages
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
            >
              {vote1}
            </Box>
          </Box>
        </Flex>

        <Flex mb="4">
          <Box p="2">
            <Heading size="md" color="#c8aa6e">
              Soldier
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
                <ModalHeader color="#c8aa6e">Soldier</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">
                    You are the child of a military family, more than commoners,
                    less than nobles. You are proud of your heritage among the
                    fighting men of the Empire and ready to prove your worth.
                    <br></br>
                    <br></br>
                    Advantages: Some resources, Higher physical ability. Begins
                    with a weapon-based martial skill. Above-average talent.
                    <br></br>
                    <br></br>
                    Disadvantages: Lower mental ability. Lack of
                    non-combat-related skills
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
              Street Rat
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
                <ModalHeader color="#c8aa6e">Street Rat</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <div className="bonsai__story">
                    You have nothing and you are nothing. Child of a prostitute
                    and an unknown father, you have always lived by your wits,
                    stealing from others to survive day by day. Yet you were
                    still discovered by an Agent as a budding talent, and now
                    everything has changed.
                    <br></br>
                    <br></br>
                    Advantages: High innate talent, ‘practical’ skills, decent
                    physical and mental abilities, Possible hidden ability?
                    <br></br>
                    <br></br>
                    Disadvantages: No resources. Very low social ability.
                    Compulsory Military Service.
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
        <Link to="/stories">
          <button type="button">Go back</button>
        </Link>
      </div>
    </div>
  );
};

export default BonsaiStory;
