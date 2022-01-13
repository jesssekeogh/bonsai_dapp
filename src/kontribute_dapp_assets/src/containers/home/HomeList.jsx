import React from 'react'
import "./homelist.css";
import {
    Alert,
    AlertIcon,
    AlertDescription,
    AlertTitle,
    CloseButton,
    VStack, 
    Box, 
    StackDivider
  } from '@chakra-ui/react';

// the main home section of the dapp

const HomeList = () => {
    return (
    <div>
        <div className="home__alert">
    
        <Alert status='info' variant='left-accent'>
        <AlertIcon />
        <AlertTitle mr={2}>Kontribute is in heavy development mode!</AlertTitle>
        <AlertDescription>See our roadmap for information regarding launch.</AlertDescription>
        <CloseButton position='absolute' right='8px' top='8px' />
        </Alert>

        </div>
        <div className="home__tabs">
        <VStack
            divider={<StackDivider borderColor='gray.200' />}
            spacing={4}
            align='stretch'
            >
          <Box h='40px' bg='yellow.200'>
           1
          </Box>
          <Box h='40px' bg='tomato'>
          2
          </Box>
          <Box h='40px' bg='pink.100'>
          3
          </Box>
        </VStack>
        </div>
    </div>
    )
}

export default HomeList
