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
      Age: 16
      <br></br>
      <br></br>
      Gender: Male
      <br></br>
      <br></br>
      Advantages:
      <br></br>
      Melee Talent, you will more easily learn the close range and physical
      combat arts with both weapon and fist.
    </>
  );
};

const Option2Details = () => {
  return (
    <>
      Age: 17
      <br></br>
      <br></br>
      Gender: Female
      <br></br>
      <br></br>
      Advantages:
      <br></br>
      Support/Exotic Talent, you will more easily learn skills that enhance or
      weaken others, as well as more exotic effects.
    </>
  );
};
const Option3Details = () => {
  return (
    <>
      Age: 15
      <br></br>
      <br></br>
      Gender: Male
      <br></br>
      <br></br>
      Advantages
      <br></br>
      Ranged Talent, you will more easily learn ranged weapons and martial arts,
      both mundane and mystical.
    </>
  );
};

const BonsaiWarriorsPrologueII = () => {
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
          <h5>Prologue II</h5>
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
            family over a dozen generations, carved this place out of the
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
      <BonsaiVote
        BackendVoteQuery={"user.getVotesII()"}
        Question={"What is your name?"}
        Option1Title={"Jiang Zhe"}
        Option1Details={Option1Details()}
        Option2Title={"Tang Wei"}
        Option2Details={Option2Details()}
        Option3Title={"Han Li"}
        Option3Details={Option3Details()}
        VoteEnded={true}
      />
    </div>
  );
};

export default BonsaiWarriorsPrologueII;
