import React, { useState, useEffect } from 'react';
import "../assets/main.css";
import { NavBar } from './containers';

// this is where a tab of available stories will be (thinking cards)
import { kontribute_dapp } from '../../declarations/kontribute_dapp/index';

const Stories = () => {

    const [userId, setuserId] = useState('')

    async function whoami() {
        let id = await kontribute_dapp.whoami()
        let user = id.toString()
        if(user === '2vxsx-fae'){
            setuserId('Anonymous')
        }
    }

    useEffect(() => {
        whoami()
    }, [])
        
    return (
        <div>
            <NavBar />
        <div className="bonsai__stories">
            <h1>Your Principal ID is: </h1>
            <h1>{userId}</h1>
        </div>
        </div>
    )
}

export default Stories
