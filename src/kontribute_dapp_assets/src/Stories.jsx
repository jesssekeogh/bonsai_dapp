import React, {useContext} from 'react';
import "../assets/main.css";
import {NavBar} from './containers';

// stories page will link in our stories here

const Stories = () => {

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
