import React, { useEffect } from "react";
import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  Text,
  Center,
  SimpleGrid,
  SlideFade,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { BlogTags, BlogAuthor } from "../components";
import logo from "../../../assets/Bonsai-Team-ICON-Black.png";
import bonsailogo from "../../../assets/BonsaiWarriors.png";

const NFT = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Center>
        <SimpleGrid columns={[1, null, 3]} pb={5} gap={5} maxW="1250px" mx="5">
          <SlideFade in={true} offsetY="20px">
            <Collection
              colimg={bonsailogo}
              title={"Bonsai Warriors NFTs"}
              description={
                "A collection of 1200 hand drawn NFTs from the Bonsai Warrior Story"
              }
              tags={["Fantasy", "Adventure"]}
              author={"Team Bonsai"}
              authorimg={logo}
              link={"/nft/bonsai-nft"}
            />
          </SlideFade>
        </SimpleGrid>
      </Center>
    </div>
  );
};

const Collection = ({
  colimg,
  title,
  description,
  tags,
  author,
  authorimg,
  link,
}) => {
  return (
    <Box spacing="30px" marginTop="5">
      <Box w="100%">
        <Link to={link}>
          <Box borderRadius="lg" overflow="hidden" mb={3}>
            <ChakraImage
              transform="scale(1.0)"
              bg={"#fff"}
              p={2}
              src={colimg}
              objectFit="contain"
              width="100%"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
        </Link>
        <BlogTags tags={tags} />
        <Link to={link}>
          <Heading
            marginTop="1"
            bgGradient="linear(to-t, #705025, #a7884a)"
            bgClip="text"
          >
            {title}
          </Heading>
        </Link>
        <Text
          as="p"
          marginTop="2"
          fontWeight={600}
          color="#f0e6d3"
          fontSize="lg"
        >
          {description}
        </Text>
        <BlogAuthor name={author} img={authorimg} />
      </Box>
    </Box>
  );
};
export default NFT;
