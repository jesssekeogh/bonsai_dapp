import React, { useState } from 'react'
import "../assets/main.css";
import { NavBar, HomeList } from './containers';

// for the test:
import {
    Center
  } from '@chakra-ui/react';

const Home = props => {
    // test for getting principal from backend for specific user : WORKS
    const [userPrincipal, setPrincipal] = useState('')
    
    const gettingId = async () => {
        const user = await props.signActor()
        const userid = await user.whoami()
        setPrincipal(userid.toString())
    }

    return (
        <div>
        <NavBar userId={props.userId} signOutFunc={props.signOutFunc}/>
        <Center>
        <button style={{color : 'black', padding: '5px', background: 'lightgrey', borderRadius: '5px' }} onClick={() => gettingId()}>click to see how the backend sees you!</button>
        <br></br>
        <h1 style={{color : '#fff' }}>{userPrincipal}</h1>
        </Center>
        <div className="bonsai__home">
        <HomeList userId={props.userId} />
        </div>
        </div>
    )
}

export default Home
