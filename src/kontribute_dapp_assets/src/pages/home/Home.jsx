import React, {useEffect} from "react";
import "../../../assets/main.css";
import { HomeList } from "../../containers";
import LaunchAlert from "../components/LaunchAlert";

// needs a redesign
const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <div>
      <div className="bonsai__home">
        <HomeList />
      </div>
    </div>
  );
};

export default Home;
