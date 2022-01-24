import React, { useState } from 'react'
import "./homelist.css";
import { Link } from 'react-router-dom';
import {
    Heading, 
    Box, 
    Stack,
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    CloseButton
  } from '@chakra-ui/react';

// the main home section of the dapp

// text color

function Feature({ title, ...rest }) {
  return (
    <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' {...rest}>
      <Heading bgGradient='linear(to-t, #705025, #a7884a)' bgClip='text'>{title}</Heading>
    </Box>
  )
}

function StackEx(props) {
  return (
    <Stack spacing={8}>
      <Link to="world-of-bonsai" state={props.userId}>
      <Feature className="bonsai__box"
        title='Stories'
        />
      </Link>
      <Feature className="bonsai__box2"
        title='NFT'
      />
      <Feature className="bonsai__box2"
        title='Create'
      />
    </Stack>
  )
}


const HomeList = props => {
  const [alert, toggleAlert] = useState(true);

  if(alert === true){
    return(
      <div className="home__tabs">
      <Alert status='warning'>
      <AlertIcon />
      <Box flex='1'>
      <AlertTitle color='red' textDecoration='underline' >Development Mode!</AlertTitle>
      <AlertDescription display='block'>
        Kontribute is still in heavy development and testing. Keep up to date with us on Discord and Twitter.
      </AlertDescription>
      </Box>
      <CloseButton onClick={() => toggleAlert(false)} as='Button' position='absolute' right='8px' top='8px' />
      </Alert>
      <br></br>
      <StackEx userId={props.userId}/>
      </div>
      )
  }else{
    return (
      <div className="home__tabs">
        <StackEx userId={props.userId}/>
      </div>
    )
  }
}

export default HomeList
