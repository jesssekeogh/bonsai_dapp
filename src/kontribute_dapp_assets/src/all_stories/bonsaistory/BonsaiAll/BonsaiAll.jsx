import React from "react";
import { NavBar } from "../../../containers";
import "./BonsaiAll.css";
import { StoryBox } from "../../../containers/index";
import { Heading, Center } from "@chakra-ui/react";

const BonsaiAll = () => {
  return (
    <div>
      <NavBar />
      <Center>
        <div className="bonsai_all-heading">
          <Heading color="#a7884a">All Chapters</Heading>
        </div>
      </Center>
        <div className="bonsai_all-container">
          <StoryBox
            chapter={"prologue"}
            title={"Bonsai Warriors"}
            preview={"Character creation in the world of Bonsai Warriors"}
            link={"/bonsai-warriors-prologue"}
          />
        </div>
    </div>
  );
};

export default BonsaiAll;
