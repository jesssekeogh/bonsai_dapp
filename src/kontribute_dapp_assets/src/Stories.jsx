import React, { useEffect, useState, useContext } from "react";
import "../assets/main.css";
import bonsai_bg from "../assets/beauty_render3_5.png";
import { NavBar } from "./containers";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
//styles:
import { Spinner } from "@chakra-ui/react";
import {
  Stat,
  StatLabel,
  StatArrow,
  StatGroup,
} from "@chakra-ui/react";

// user context from auth
import { UserContext } from "./Context.jsx";

// stories page will link in our stories here
const Stories = () => {
  //optimise image loading
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsReady(true);
      queryAll();
    };
    img.src = bonsai_bg;
  }, []);

  // get the total votes:
  const { signActor } = useContext(UserContext);

  // get all the votes
  const [allVotes, setAllVotes] = useState("0");

  const queryAll = async () => {
    const user = await signActor();
    const all = await user.getAllVotes();
    setAllVotes(all.toString());
  };

  return (
    <div>
      <NavBar />
      {!imageIsReady ? (
        <div className="bonsai__spinner">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="#17191e"
            color="#9d8144"
            size="xl"
          />
        </div>
      ) : null}
      {imageIsReady ? (
        <Slide>
          <div className="bonsai__card">
            <img className="bonsai__image" src={bonsai_bg} />
            <div className="bonsai__card-content">
              <p>Prologue</p>
              <h3>Bonsai Warriors</h3>
              <StatGroup pb="5" color="#fff">
                <Stat>
                  <StatLabel>
                    Total Votes:{" "}
                      <StatArrow type="increase" />
                      {allVotes}
                  </StatLabel>
                </Stat>
              </StatGroup>
            </div>
            <div className="bonsai__card-btn">
              <Link to="/bonsai-warriors">
                <button type="button">Read Now</button>
              </Link>
            </div>
          </div>
        </Slide>
      ) : null}
    </div>
  );
};

export default Stories;
