import React, { useEffect, useState, useContext } from "react";
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
  Spinner,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import { MdHowToVote } from "react-icons/md";
import { Link } from "react-router-dom";
import { Delayed } from "../../../containers/index";
// for calling user data
import { UserContext } from "../../../Context";

function Feature({ title, desc, latest, link, total, ...rest }) {
  return (
    <Link to={link}>
      <Box
        p={5}
        shadow="md"
        border={"double"}
        borderRadius="5px"
        backgroundColor="#16171b"
        maxW="400px"
        {...rest}
      >
        <Heading color="#a7884a" fontSize="xl">
          {title}{" "}
          {latest ? (
            <Badge mb={1} borderRadius="md" colorScheme="green">
              New
            </Badge>
          ) : null}
        </Heading>
        <Text mb="3" fontWeight={600} color="#f0e6d3" mt={4}>
          {desc}
        </Text>
        <Grid templateColumns="repeat(5, 1fr)">
          <GridItem colStart={3} rowSpan={2} colSpan={1}>
            <div className="bonsai__button">
              <button type="button">Read Now</button>
            </div>
          </GridItem>
          <GridItem colStart={5} h="10">
            <HStack spacing="5px" mt="10px">
              <Box color="#fff">
                <MdHowToVote />
              </Box>
              <Tooltip label="Total Votes">
                <Box
                  borderRadius="md"
                  bg="#0fbdde"
                  color="black"
                  fontWeight="semibold"
                  px="1"
                >
                  {total}
                </Box>
              </Tooltip>
            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </Link>
  );
}

function StackEx(props) {
  return (
    <Stack spacing={8}>
      <Feature
        latest={props.latest}
        title={props.title1}
        desc={props.body1}
        link={props.link1}
        total={props.total1}
      />
    </Stack>
  );
}

const BonsaiAll = () => {
  let isMounted = true; // memory leak fix
  const { signActor } = useContext(UserContext);

  // state for total votes
  const [totalPrologue, setPrologue] = useState(<Spinner size="xs" />);
  const [totalPrologueII, setPrologueII] = useState(<Spinner size="xs" />);
  const [totalPrologueIII, setPrologueIII] = useState(<Spinner size="xs" />);
  const [totalInterlude, setInterlude] = useState(<Spinner size="xs" />);

  // async promise, returns votes from API calls only if component is mounted
  const getAllTotals = async () => {
    const user = await signActor();
    await Promise.all([
      (async () => {
        await user.getBonsaiVotes().then((result) => {
          if (isMounted) {
            setPrologue(result.total.toString());
          }
        });
      })(),
      (async () => {
        await user.getBonsaiVotesII().then((result) => {
          if (isMounted) {
            setPrologueII(result.total.toString());
          }
        });
      })(),
      (async () => {
        await user.getBonsaiVotesIII().then((result) => {
          if (isMounted) {
            setPrologueIII(result.total.toString());
          }
        });
      })(),
      (async () => {
        await user.getBonsaiVotesIV().then((result) => {
          if (isMounted) {
            setInterlude(result.total.toString());
          }
        });
      })(),
    ]);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAllTotals();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      <Center>
        <Heading color="#a7884a">Bonsai Warriors</Heading>
      </Center>
      <div className="bonsai_all-container">
        {/* <ChapterBox
          latest
          wait={100}
          title={"INTERLUDE"}
          body={"The Interlude"}
          link={"/stories/bonsai-warriors-chapter-1"}
          total={totalInterlude}
        /> */}
        <ChapterBox
          wait={200}
          title={"PROLOGUE III"}
          body={
            "Now we must choose our school, the place of learning that Tang Wei shall study at."
          }
          link={"/stories/bonsai-warriors-prologueIII"}
          total={totalPrologueIII}
        />
        <ChapterBox
          wait={300}
          title={"PROLOGUE II"}
          body={"You are an Artisan, now you must vote to choose your name"}
          link={"/stories/bonsai-warriors-prologueII"}
          total={totalPrologueII}
        />
        <ChapterBox
          wait={400}
          title={"PROLOGUE"}
          body={
            "Introduction and character creation in the Bonsai Warriors story"
          }
          link={"/stories/bonsai-warriors-prologue"}
          total={totalPrologue}
        />
      </div>
    </div>
  );
};

const ChapterBox = ({ wait, title, body, link, total,latest }) => {
  return (
    <Center mb="1rem">
      <Delayed waitBeforeShow={wait}>
        <SlideFade in={true}>
          <StackEx latest={latest} title1={title} body1={body} link1={link} total1={total} />
        </SlideFade>
      </Delayed>
    </Center>
  );
};

export default BonsaiAll;
