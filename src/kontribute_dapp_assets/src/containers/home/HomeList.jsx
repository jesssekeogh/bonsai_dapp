import React from 'react'
import "./homelist.css";
import { Link } from 'react-router-dom';
import {
    Heading, 
    Box, 
    Stack,
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

function StackEx() {
  return (
    <Stack spacing={8}>
      <Link to="world-of-bonsai">
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
    return (
        <div className="home__tabs">
        <StackEx />
        </div>
    )
}

export default HomeList
