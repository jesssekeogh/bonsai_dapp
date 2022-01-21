import React from 'react'
import "../assets/main.css";
import { NavBar, HomeList } from './containers';

const Home = props => {
    
    const gettingId = async () => {
        const user = await props.signActor()
        const userid = await user.whoami()
        console.log(userid.toString())
    }

    return (
        <div>
        <NavBar userId={props.userId} signOutFunc={props.signOutFunc}/>
        <div className="bonsai__home">
            <button onClick={() => gettingId()}>click for test</button>
        <HomeList />
        </div>
        </div>
    )
}

export default Home
