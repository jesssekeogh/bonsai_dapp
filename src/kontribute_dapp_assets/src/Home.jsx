import React, { useState, useEffect } from 'react'
import "../assets/main.css";
import { NavBar, HomeList } from './containers';

const Home = props => {
    const [userId, setId] = useState('')

    const gettingId = async () => {

        const backendActor = await props.signActor()
        setId(backendActor)
    }

    return (
        <div>
        <NavBar userId={props.userId} signOutFunc={props.signOutFunc}/>
        <div className="bonsai__home">
            <h1>{userId}</h1>
            <button onClick={gettingId}>click for test</button>
        <HomeList />
        </div>
        </div>
    )
}

export default Home
