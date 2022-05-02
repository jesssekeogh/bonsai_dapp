import React, { useEffect } from "react";
import { Container, Center } from "@chakra-ui/react";
import { Fade } from "react-awesome-reveal";
import "../BonsaiStory.css";
import { BonsaiVote } from "../Bonsai_Tools";
import { BonsaiCharLink } from "../Bonsai_Tools/index";

const Option1Details = () => {
  return (
    <>
      Carved atop the icy peak of Mount Tai, this is the penultimate school of
      Sorcery within the Western March. Everyone that enters this school shall
      exit a hero.
      <br></br>
      <br></br>
      Specialty - Formations/Warding, The Starlight Array (Greatest work)
    </>
  );
};

const Option2Details = () => {
  return (
    <>
      The disciples of the greatest blade master to grace the Western March are
      trained here. To enter is to devote oneself to the sword, to live by the
      sword and die by the sword.
      <br></br>
      <br></br>
      Specialty - Swordsmanship, The Azure Blade Style (Greatest work)
    </>
  );
};
const Option3Details = () => {
  return (
    <>
      There are always enemies at the borders of humanity, the Iron Tide have
      always been there to fight them, using fist, body and mind in perfect
      unison to slay all beasts.
      <br></br>
      <br></br>
      Specialty - Hand-to-hand combat, The Final Word Style (Greatest work)
    </>
  );
};

const BonsaiWarriorsPrologueIII = () => {
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
          <h5>Prologue III</h5>
        </Center>
      </div>
      <Fade>
        <Container>
          <div className="bonsai__story">
            <i>
              The Final Part of character creation, this is the final step
              before two major things. Firstly, the arrival at the school you
              will now choose. Secondly, the first Interlude and first release
              of the Bonsai Warrior NFTs. An Interlude will not require any
              voting and will mark the points between different chapters by
              giving you a sneak peek into the lives of people around the world
              of Bonsai Warriors.
            </i>
            <br></br>
            <br></br>- - - - - - - - - - - - -<br></br>
            <br></br>
            Call it the lofty dreams of a child, or wild ambitions, but you
            always dreamed of becoming a great sorceress, wreathed in exotic
            magic spells as you lashed out and reshaped the world as you wished.
            Even for a daughter of the Tang clan, this seemed impossible, but
            you still dreamed of it.
            <br></br>
            <br></br>
            Pushing open the door with your tanned arm, burnt from years working
            out in the fields with your family, you announced yourself with a
            cheeky giggle to the crowded dinner table within.
            <br></br>
            <br></br>
            “The Sorceress of Destiny greets her loving subjects!”
            <br></br>
            <br></br>
            The exasperated look that your father fixes you with is the only
            answer, the rest of your siblings busy gorging themselves as your
            mother fusses around in the kitchen itself.
            <br></br>
            <br></br>
            “Tang Wei, good thing that you're finally back, I got the letters
            today.” Your father is both proud and sad, an emotion he’s been
            displaying ever since you got tested at the Summer Festival. After
            all, you are now a Talent, gifted with the powers you always dreamed
            of having. The only downside is that your father will lose his only
            daughter, departing for lands and places he will never visit
            himself. Today was the day that it all came together, you had known
            it was coming but you still felt shocked.
            <br></br>
            <br></br>
            “They sent you the options,” your father raised his hand, a tight
            bundle of letters in it. He gave a proud yet watery smile, “I’m sure
            you make us all proud.”
            <br></br>
            <br></br>
            You take them from him and begin to look through them…
          </div>
        </Container>
      </Fade>
      <BonsaiVote
        BackendVoteQuery={"user.getBonsaiVotesIII()"}
        Question={"Choose your School!"}
        Option1Title={"Starlight Sect"}
        Option1Details={Option1Details()}
        Option2Title={"Azure Blade Academy"}
        Option2Details={Option2Details()}
        Option3Title={"Iron Tide School"}
        Option3Details={Option3Details()}
        VoteEnded={true}
      />
    </div>
  );
};

export default BonsaiWarriorsPrologueIII;
