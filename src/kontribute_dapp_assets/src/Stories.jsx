import React from 'react';
import "../assets/main.css";
import { NavBar } from './containers';

// this is where a tab of available stories will be (thinking cards)

const Bonsai = () => {
    return (
        <div>
            <NavBar />
        <div className="bonsai__story">
            <h1>world of bonsai</h1>
        </div>
        </div>
    )
}

export default Bonsai;
