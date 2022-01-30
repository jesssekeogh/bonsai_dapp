import React, {useContext} from 'react';
import "../assets/main.css";

// user context from auth
import {useLocation} from 'react-router-dom';

const Stories = () => {
    const location = useLocation()
    console.log(location.state)

    return (
        <div>
        <div className="bonsai__stories">
            <h1>stories go here</h1>
        </div>
        </div>
    )
}

export default Stories
