import React, { useState, useEffect } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  GridItem,
  Spinner,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import nftdata from "./nftdata.json";
// stories page css for spinner
import "../../stories/stories.css";

const GridComponent = ({ name, imgsrc, anvillink, value }) => {
  if (name.toLowerCase().match(value.toLowerCase())) {
    return (
      <GridItem>
        <Box
          role={"group"}
          p={4}
          maxW={"330px"}
          w={"full"}
          backgroundColor={"#1e212b"}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
        >
          <Box rounded={"lg"} pos={"relative"}>
            <ChakraImage
              bg="#fff"
              rounded={"lg"}
              height={"300px"}
              width={"auto"}
              objectFit={"cover"}
              src={require(`${imgsrc}`).default}
            />
          </Box>
          <Stack pt={3} align={"start"}>
            <Text
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "xs", md: "md" }}
            >
              Bonsai Warrior
            </Text>
          </Stack>
          <Stack
            pt={2}
            direction={"row"}
            align={"center"}
            justify="space-between"
          >
            <Heading
              fontSize={{ base: "lg", sm: "md", md: "lg" }}
              color={"white"}
            >
              {name}
            </Heading>
            <a href={anvillink} target="_blank" rel="noreferrer">
              <div className="nft_button_hover">
                <Button
                  onClick={() => BuyNFT()}
                  maxW="120px"
                  rounded={"full"}
                  color={"white"}
                  bgGradient="linear(to-r, #c61682, #ee670d)"
                  _hover={{ opacity: "0.8", transform: "scale(1.05)" }}
                >
                  Minting Soon
                </Button>
              </div>
            </a>
          </Stack>
        </Box>
      </GridItem>
    );
  } else {
    return null;
  }
};

// not all NFTs have been added
const BonsaiNFT = ({ value }) => {
  // optimise image loading
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    setTimeout(() => {setIsReady(true)}, 1000);
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!imageIsReady ? (
        <div className="bonsai__spinner">
          <Spinner
            mt="5rem"
            thickness="4px"
            speed="0.65s"
            emptyColor="#17191e"
            color="#9d8144"
            size="xl"
          />
        </div>
      ) : null}
      {imageIsReady ? (
        <Center>
          <SimpleGrid
            columns={[1, null, 4]}
            pb={5}
            px={10}
            gap={4}
            maxW="1500px"
          >
            {nftdata.map((item) => (
              <GridComponent {...item} value={value} />
            ))}
          </SimpleGrid>
        </Center>
      ) : null}
    </>
  );
};

export default BonsaiNFT;
