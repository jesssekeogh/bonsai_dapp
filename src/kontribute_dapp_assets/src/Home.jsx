import React, {useEffect} from "react";
import "../assets/main.css";
import { NavBar, HomeList } from "./containers";

// needs a redesign
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
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
