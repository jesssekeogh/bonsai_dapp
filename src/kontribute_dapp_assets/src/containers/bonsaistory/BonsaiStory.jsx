import React, {useContext, useState, useContext, useEffect} from 'react';
import NavBar from '../nav/NavBar';

// Styling
import { Container, Center, Button } from '@chakra-ui/react';
import { Fade } from "react-awesome-reveal";
import "./BonsaiStory.css";

// user context from auth
import {UserContext} from '../../Context.jsx';

const BonsaiStory = () => {

    const { signActor } = useContext(UserContext)

    // the votes:
    const [vote1, setvote1] = useState('')
    const [vote2, setvote2] = useState('')
    const [vote3, setvote3] = useState('')
    
    const voteoption1 = async () => {
        const user = await signActor()
        const vote = await user.VoteOption1(true)
        console.log(vote)
    }

    const voteoption2 = async () => {
        const user = await signActor()
        const vote = await user.VoteOption2(true)
        console.log(vote)
    }

    const voteoption3 = async () => {
        const user = await signActor()
        const vote = await user.VoteOption3(true)
        console.log(vote)
    }

    // query the votes
    const getvote1 = async () => {
        const user = await signActor()
        const votes = await user.getVote1()
        setvote1(votes.toString())
    }

    const getvote2 = async () => {
        const user = await signActor()
        const votes = await user.getVote2()
        setvote2(votes.toString())
    }

    const getvote3 = async () => {
        const user = await signActor()
        const votes = await user.getVote3()
        setvote3(votes.toString())
    }

    useEffect(() => {
        getvote1()
        getvote2()
        getvote3()
    }, [])

    //for the buttons
    const [button1, setbutton1] = useState(true)
    const button1click = async () => {
        setbutton1(false)
    }

    return (
        <div>
            <NavBar />
            <div class="bonsai__story_heading">
            <Center>
                <h1>World of Bonsai</h1>
            </Center>
            <Center>
            <h5>Chapter 1</h5>
            </Center>
            </div>
            <Fade>
            <Container>
            <div class="bonsai__story">
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            Dolor amet eu occaecat excepteur do adipisicing cillum duis. Est ullamco ullamco sit ea irure consequat
            id do ex enim consectetur nisi duis elit. Qui mollit magna exercitation est sit.
            </div>
            </Container>
            </Fade>
            <Container>
            <button onClick={() => voteoption1()}>vote on option 1</button>
            <br></br>
            <button onClick={() => voteoption2()}>vote on option 2</button>
            <br></br>
            <button onClick={() => voteoption3()}>vote on option 3</button>
            <br></br>
            <p>{vote1}</p>
            <p>{vote2}</p>
            <p>{vote3}</p>
            </Container>

    </div>
    )
}

export default BonsaiStory
