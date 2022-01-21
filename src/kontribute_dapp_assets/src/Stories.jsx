import React from 'react';
import "../assets/main.css";
import { NavBar } from './containers';

// for the props:
import { useLocation } from 'react-router-dom';

const Stories = () => {
    const location = useLocation()
    const from = location.state
    console.log(from)
    
    return (
        <div>
            <NavBar />
        <div className="bonsai__stories">
            <h1>stories go here</h1>
        </div>
        </div>
    )
}

export default Stories
