import React from "react";
import "../assets/main.css";
import { NavBar, HomeList } from "./containers";

// needs a redesign
const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="bonsai__home">
        <HomeList />
      </div>
    </div>
  );
};

export default Home;
