import React from 'react'
import "../assets/main.css";
import { NavBar, HomeList } from './containers';

const Home = props => {

    return (
        <div>
        <NavBar userId={props.userId} signOutFunc={props.signOutFunc}/>
        <div className="bonsai__home">
        <HomeList />
        </div>
        </div>
    )
}

export default Home
