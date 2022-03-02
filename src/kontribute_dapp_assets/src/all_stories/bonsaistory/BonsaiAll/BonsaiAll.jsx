import React from "react";
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
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Delayed } from "../../../containers/index";

function Feature({ title, desc, link, ...rest }) {
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
      <Text mb="3" color="#f0e6d3" mt={4}>
        {desc}
      </Text>
      <div className="bonsai__button">
        <Link to={link}>
          <button type="button">Read Now</button>
        </Link>
      </div>
    </Box>
  );
}

function StackEx(props) {
  return (
    <Stack spacing={8}>
      <Feature title={props.title1} desc={props.body1} link={props.link1} />
    </Stack>
  );
}

const BonsaiAll = () => {
  return (
    <div>
      <NavBar />
      <Center>
        <div className="bonsai_all-heading">
          <Heading color="#a7884a">Bonsai Warriors</Heading>
        </div>
      </Center>
      <div className="bonsai_all-container">
        <Center>
          <Delayed>
            <SlideFade in={true}>
              <StackEx
                title1={"PROLOGUE"}
                body1={"Character creation in the world of Bonsai Warriors"}
                link1={"/bonsai-warriors-prologue"}
              />
            </SlideFade>
          </Delayed>
        </Center>
      </div>
    </div>
  );
};

export default BonsaiAll;
