import React, { useEffect } from "react";
import { Container, Center } from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import "../BonsaiStory.css";
import { BonsaiVote } from "../Bonsai_Tools";
import { BonsaiCharLink } from "../Bonsai_Tools/index";

const Option1Details = () => {
  return <>TODO?</>;
};

const Option2Details = () => {
  return <>TODO?</>;
};
const Option3Details = () => {
  return <>TODO?</>;
};

const BonsaiWarriorsC1 = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
      <div className="bonsai__story_heading">
        <Center>
          <h1>Bonsai Warriors</h1>
        </Center>
        <Center>
          <h5>Interlude</h5>
        </Center>
      </div>
      <Fade>
        <Container>
          <div className="bonsai__story">
            <b>Welcome to the Interlude.</b>
            <br></br>
            <br></br>
            <BonsaiCharLink
              name="The OG"
              link="/stories/bonsai-warriors-chapter-1"
            />{" "}
            The interlude TODO:
          </div>
        </Container>
      </Fade>
      <BonsaiVote
        BackendVoteQuery={"user.getBonsaiVotesIV()"}
        Question={"TODO?"}
        Option1Title={"TODO?"}
        Option1Details={Option1Details()}
        Option2Title={"TODO?"}
        Option2Details={Option2Details()}
        Option3Title={"TODO?"}
        Option3Details={Option3Details()}
        VoteEnded={false}
      />
    </div>
  );
};

export default BonsaiWarriorsC1;
