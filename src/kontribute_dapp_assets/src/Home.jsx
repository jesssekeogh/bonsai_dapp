import React from "react";
import "../assets/main.css";
import { NavBar, HomeList } from "./containers";
import Footer from "./Footer";

const Home = () => {
  return (
    <div>
      <NavBar />
      <div className="bonsai__home">
        <HomeList />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
