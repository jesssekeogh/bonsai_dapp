import React from "react";
import "../assets/main.css";
import bonsai_bg from "../assets/beauty_render3_5.png";
import { NavBar } from "./containers";
import { Link } from "react-router-dom";
import { Slide } from "react-awesome-reveal";
import { Image } from "@chakra-ui/react";

// stories page will link in our stories here
const Stories = () => {
  return (
    <div>
      <NavBar />
      <Slide>
        <div className="bonsai__card">
            <Image className="bonsai__image" src={bonsai_bg} />
          <div className="bonsai__card-content">
                <p>Chapter 1</p>
                <h3>The World of Bonsai</h3>
            </div>
          <div className="bonsai__card-btn">
                    <Link to="/world-of-bonsai">
                    <button type="button">Read Now</button>
                    </Link>
                </div>
        </div>
      </Slide>
    </div>
  );
};

export default Stories;
