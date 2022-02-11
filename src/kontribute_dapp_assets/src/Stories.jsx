import React from 'react';
import "../assets/main.css";
import {NavBar} from './containers';
import {Link} from 'react-router-dom';
import { Slide } from "react-awesome-reveal";
import Footer from './Footer';

// stories page will link in our stories here
const Stories = () => {

    return (
        <div>
            <NavBar />
             <Slide>
            <div className="bonsai__card">
            <div className="bonsai__card-content">
                <p>Chapter 1</p>
                <h3>The World of Bonsai</h3>
            </div>
                <div className="bonsai__card-btn">
                    <Link to="/world-of-bonsai">
                    <button type="button">Read Now</button>
                    </Link>
                </div>
            </div>
            </Slide>
            <Footer />
        </div>
    )
}

export default Stories
