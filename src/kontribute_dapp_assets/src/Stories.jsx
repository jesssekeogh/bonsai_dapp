import React, { useEffect, useState } from "react";
import "../assets/main.css";
import bonsai_bg from "../assets/beauty_render3_5.png";
import { NavBar } from "./containers";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import { Spinner, Center } from "@chakra-ui/react";
// stories page will link in our stories here
const Stories = () => {
  //optimise image loading
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsReady(true);
    };
    img.src = bonsai_bg;
  }, []);
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
