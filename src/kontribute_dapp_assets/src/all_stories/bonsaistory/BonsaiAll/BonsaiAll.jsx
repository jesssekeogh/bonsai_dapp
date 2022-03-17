import React, { useEffect, useState, useContext } from "react";
import { NavBar } from "../../../containers";
import "./BonsaiAll.css";
import {
  Heading,
  Center,
  Box,
  Text,
  Stack,
  Feature,
  SlideFade,
  Grid,
  GridItem,
  HStack,
  Spinner
} from "@chakra-ui/react";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";
import { Delayed } from "../../../containers/index";

// for calling user data
import { UserContext } from "../../../Context";

function Feature({ title, desc, link, total, ...rest }) {
  return (
    <Box
      p={5}
      shadow="md"
      borderWidth="1px"
      borderColor="#9d8144"
      borderRadius="5px"
      bgColor="#16171b"
      maxW="400px"
      {...rest}
    >
      <Heading color="#a7884a" fontSize="xl">
        {title}
      </Heading>
      <Text mb="3" fontWeight={600} color="#f0e6d3" mt={4}>
        {desc}
      </Text>
      <Grid templateColumns="repeat(5, 1fr)">
        <GridItem colStart={3} rowSpan={2} colSpan={1}>
          <div className="bonsai__button">
            <Link to={link}>
              <button type="button">Read Now</button>
            </Link>
          </div>
        </GridItem>
        <GridItem colStart={5} h="10">
          <HStack spacing="5px" mt="10px">
            <Box color="#fff">
              <MdHowToVote />
            </Box>
            <Box
              as="button"
              borderRadius="md"
              bg="#0fbdde"
              color="black"
              fontWeight="semibold"
              px="1"
            >
              {total}
            </Box>
          </HStack>
        </GridItem>
      </Grid>
    </Box>
  );
}

function StackEx(props) {
  return (
    <Stack spacing={8}>
      <Feature
        title={props.title1}
        desc={props.body1}
        link={props.link1}
        total={props.total1}
      />
    </Stack>
  );
}

const BonsaiAll = () => {
  const { signActor } = useContext(UserContext);

  // state for total votes
  const [totalPrologue, setPrologue] = useState(<Spinner size="xs" />);
  const [totalPrologueII, setPrologueII] = useState(<Spinner size="xs" />);

  const getAllPrologue = async () => {
    const user = await signActor();
    const allVotesPrologue = await user.getAll();
    setPrologue(allVotesPrologue.toString());
  };

  const getAllPrologueII = async () => {
    const user = await signActor();
    const allVotesPrologue = await user.getAllII();
    setPrologueII(allVotesPrologue.toString());
  };

  useEffect(() => {
    getAllPrologueII();
    getAllPrologue();
  }, []);

  return (
    <div>
      <NavBar />
        <Center>
          <Heading color="#a7884a">Bonsai Warriors</Heading>
        </Center>
        <div className="bonsai_all-container">
          <Center>
            <Delayed>
              <SlideFade in={true}>
                <StackEx
                  title1={"PROLOGUE II"}
                  body1={
                    "You are an Artisan, now you must vote to choose your name"
                  }
                  link1={"/bonsai-warriors-prologueII"}
                  total1={totalPrologueII}
                />
              </SlideFade>
            </Delayed>
          </Center>
          <Center mt="2rem">
            <Delayed waitBeforeShow={200}>
              <SlideFade in={true}>
                <StackEx
                  title1={"PROLOGUE"}
                  body1={
                    "Introduction and character creation in the Bonsai Warriors story"
                  }
                  link1={"/bonsai-warriors-prologue"}
                  total1={totalPrologue}
                />
              </SlideFade>
            </Delayed>
          </Center>
        </div>
      </div>
  );
};

export default BonsaiAll;
