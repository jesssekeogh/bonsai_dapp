import React, {useState, useContext} from 'react';
import "../assets/main.css";
import {NavBar} from './containers';

// user context from auth
import {UserContext} from './Context';

// for the test:
import {
    Center
  } from '@chakra-ui/react';

// stories page will link in our stories here
const Stories = () => {
    // context for the user profile
    const { signActor } = useContext(UserContext)

    // test for getting principal from backend for specific user : WORKS
    const [userPrincipal, setPrincipal] = useState('')
    
    const gettingId = async () => {
        const user = await signActor()
        const userid = await user.whoami()
        setPrincipal(userid.toString())
    }
    return (
        <div>
            <NavBar />
            <Center>
            <button style={{color : 'black', padding: '5px', background: 'lightgrey', borderRadius: '5px' }} onClick={() => gettingId()}>click to see how the backend sees you!</button>
            <br></br>
            <h1 style={{color : '#fff' }}>{userPrincipal}</h1>
            </Center>
            <div className="bonsai__stories">
                <h1>stories go here</h1>
            </div>
        </div>
    )
}

export default Stories
