import React, { useEffect } from "react";
import { NavBar } from "../../../containers";
import {
  Container,
  Center,
} from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import "../BonsaiStory.css";
import BonsaiVote from "../Bonsai_Vote_Func/BonsaiVote";

const Option1Details = () => {
  return (
    <>
      Child of a working family, owners of a fairly prosperous Spirit Herb farm,
      local to the academy. This will be the furthest you have ever traveled.
      <br></br>
      <br></br>
      Advantages:
      <br></br>
      Some resources, Average starting ability. Numerous miscellaneous skills.
      Above-average innate talent.
      <br></br>
      <br></br>
      Disadvantages:
      <br></br>
      No real disadvantages
    </>
  );
};

const Option2Details = () => {
  return (
    <>
      You are the child of a military family, more than commoners, less than
      nobles. You are proud of your heritage among the fighting men of the
      Empire and ready to prove your worth.
      <br></br>
      <br></br>
      Advantages:
      <br></br>
      Some resources, Higher physical ability. Begins with a weapon-based
      martial skill. Above-average talent.
      <br></br>
      <br></br>
      Disadvantages:
      <br></br>
      Lower mental ability. Lack of non-combat-related skills
    </>
  );
};
const Option3Details = () => {
  return (
    <>
      You have nothing and you are nothing. Child of a prostitute and an unknown
      father, you have always lived by your wits, stealing from others to
      survive day by day. Yet you were still discovered by an Agent as a budding
      talent, and now everything has changed.
      <br></br>
      <br></br>
      Advantages:
      <br></br>
      High innate talent, ‘practical’ skills, decent physical and mental
      abilities, Possible hidden ability?
      <br></br>
      <br></br>
      Disadvantages:
      <br></br>
      No resources. Very low social ability. Compulsory Military Service.
    </>
  );
};
const BonsaiWarriorsPrologue = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
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
            <b>Welcome to the start of Bonsai Warriors.</b>
            <br></br>
            <br></br>
            <i>
              This is the start of where you will take part in this
              ever-evolving world. This is an interactive story, every update to
              the story will come with a vote. As a group, you will decide the
              course of the story through your collective votes.
              <br></br>
              Bonsai Warrior’s story will start with all of you deciding who you
              will be playing as, consider it to be like character creation in
              RPGs. Over the next few updates, you will create your character.
              They will be a brand new student at an academy in the Celestial
              Empire of Man. Beyond that, it’s up to your votes to decide who
              this student will be.
              <br></br>
              <br></br>
              By the end of this story, you will have together carved a place in
              this world as a legend or died trying.
            </i>
            <br></br>
            <br></br>- - - - - - - - - - - - -<br></br>
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
      <BonsaiVote
        BackendVoteQuery={"user.getVotes()"}
        Question={"Who are you?"}
        Option1Title={"Artisan"}
        Option1Details={Option1Details()}
        Option2Title={"Soldier"}
        Option2Details={Option2Details()}
        Option3Title={"Street Rat"}
        Option3Details={Option3Details()}
        VoteEnded={true}
      />
    </div>
  );
};

export default BonsaiWarriorsPrologue;
