import React from 'react';
import "../assets/main.css";
import { NavBar } from './containers';

// for the props:
import { useLocation } from 'react-router-dom';

const Stories = () => {
    // will change to useContext
    const location = useLocation()
    const from = location.state
    
    return (
        <div>
            <NavBar userId={from}/>
        <div className="bonsai__stories">
            <h1>stories go here</h1>
        </div>
        </div>
    )
}

export default Stories
