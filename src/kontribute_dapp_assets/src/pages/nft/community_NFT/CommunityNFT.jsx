import React from "react";
import { Box, Heading, Text } from '@chakra-ui/react';
import { InfoIcon } from '@chakra-ui/icons';

const CommunityNFT = () => {
  return (
    <div>
    <Box textAlign="center" py={10} px={6} >
      <InfoIcon boxSize={'50px'} color={'white'} />
      <Heading color="white" size="xl" mt={6} mb={2}>
        Community NFTs will be listed here
      </Heading>
    </Box>
    </div>
  );
};

export default CommunityNFT;
