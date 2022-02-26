import React from "react";
import { NavBar } from "../../../containers";
import "./BonsaiAll.css";
import { StoryBox } from "../../../containers/index";
import { Heading, Center } from "@chakra-ui/react";
import { Zoom } from "react-awesome-reveal";

const BonsaiAll = () => {
  return (
    <div>
      <NavBar />
      <Center>
        <div className="bonsai_all-heading">
          <Heading color="#a7884a">All Chapters</Heading>
        </div>
      </Center>
      <Zoom>
        <div className="bonsai_all-container">
          <StoryBox
            chapter={"prologue"}
            title={"Bonsai Warriors"}
            preview={"Character creation in the world of Bonsai Warriors"}
            link={"/bonsai-warriors-prologue"}
          />
        </div>
      </Zoom>
    </div>
  );
};

export default BonsaiAll;
