import React, { useEffect, useState } from "react";
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
import bonsailogo from "../../../assets/Bonsai_Warriors_Background_1.png";
import { LoadingSpinner } from "../../containers";

const LaunchPad = () => {
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsReady(true);
    };
    img.src = bonsailogo;
    window.scrollTo(0, 0);
  }, []);

  if (!imageIsReady) return <LoadingSpinner />;
  return (
    <div>
      <Center>
        <SimpleGrid columns={[1, null, 3]} pb={5} gap={5} maxW="1250px" mx="5">
          <SlideFade in={true} offsetY="20px">
            <Collection
              colimg={bonsailogo}
              title={"Bonsai Warrior NFTs"}
              description={
                "A collection of 1100 hand crafted NFTs from the Bonsai Warriors story"
              }
              tags={["Fantasy", "Adventure"]}
              author={"Team Bonsai"}
              authorimg={logo}
              link={"/launchpad/bonsai-nft"}
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
    <Link to={link}>
      <Box spacing="30px" marginTop="5">
        <Box w="100%">
          <Box borderRadius="lg" overflow="hidden" mb={3}>
            <ChakraImage
              transform="scale(1.0)"
              bg={"#fff"}
              src={colimg}
              objectFit="contain"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
            />
          </Box>
          <BlogTags tags={tags} />
          <Heading
            marginTop="1"
            bgGradient="linear(to-t, #705025, #a7884a)"
            bgClip="text"
          >
            {title}
          </Heading>
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
    </Link>
  );
};
export default LaunchPad;
