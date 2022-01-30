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
    CloseButton,
  } from '@chakra-ui/react';

// the main home section of the dapp

function Feature({ title, ...rest }) {
  return (
    <Box p={5} shadow='md' borderWidth='1px' borderRadius='lg' {...rest}>
      <Heading bgGradient='linear(to-t, #705025, #a7884a)' bgClip='text'>{title}</Heading>
    </Box>
  )
}

function StackEx() {

  return (
    <Stack spacing={8}>
      <Link to="stories">
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


const HomeList = () => {
  const [alert, toggleAlert] = useState(true);

  if(alert === true){
    return(
      <div className="home__tabs">
      <Alert status='warning'>
      <AlertIcon />
      <Box flex='1'>
      <AlertTitle color='red' textDecoration='underline' >Development Mode!</AlertTitle>
      <AlertDescription display='block'>
        <p>Kontribute is still in heavy development and testing. Keep up to date with us on <a style={{color: '#5562ea', textDecoration: 'underline'}} href="https://discord.gg/S3qRpq8R6e" target="_blank" rel="noreferrer">Discord</a> and <a style={{color: '#5da9dd', textDecoration: 'underline'}} href="https://mobile.twitter.com/TeamBonsai_ICP" target="_blank" rel="noreferrer">Twitter</a></p>
      </AlertDescription>
      </Box>
      <CloseButton onClick={() => toggleAlert(false)} position='absolute' right='8px' top='8px' />
      </Alert>
      <br></br>
      <StackEx />
      </div>
      )
  }else{
    return (
      <div className="home__tabs">
        <StackEx />
      </div>
    )
  }
}

export default HomeList
