import React, { useEffect } from "react";
// import { OfferingPage } from "../lp_components";
import noblebrightLandscape from "../../../../assets/noblebright_landscape_v2.jpeg";
import { Airdrop } from "../../components/index";
import { Box, Center, Flex } from "@chakra-ui/react";

const NoblebrightNft = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Flex
        justifyContent="center"
        alignItems="center"
        mt={-2}
        minHeight="105vh"
        sx={{
          backgroundImage: noblebrightLandscape,
          backgroundSize: "cover",
          backgroundPosition: "top",
        }}
      >
        <Box>
          <Center>
            <Box
              bg="linear-gradient(0deg, rgba(0, 0, 0, 0.60), rgba(0, 0, 0, 0.60))"
              boxShadow="dark-lg"
              rounded="lg"
              p={5}
            >
              <Airdrop />
            </Box>
          </Center>
        </Box>
      </Flex>
    </>
  );
};

export default NoblebrightNft;
