import React from "react";
import {
  SimpleGrid,
  Center,
  Heading,
  Box,
  Skeleton,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import galactic from "../../../assets/galactic_guardians.png";
import bonsai from "../../../assets/Bonsai_Warriors_Background_1.png";

const PopularDrops = () => {
  return (
    <>
      <Center pb={5}>
        <Heading
          fontWeight={"bold"}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
        >
          Popular Stories
        </Heading>
      </Center>
      <Center mt={1}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 2 }}
          gap={10}
          mx={2}
          maxW="1250px"
        >
          <PopularCard
            mainImg={galactic}
            link={"/stories/story/26"}
            name={"Galactic Guardians"}
          />
          <PopularCard
            mainImg={bonsai}
            link={"/stories/story/6"}
            name={"Bonsai Warriors"}
          />
        </SimpleGrid>
      </Center>
    </>
  );
};

const PopularCard = ({ mainImg, link, name }) => {
  return (
    <NavLink to={link}>
      <Box
        role={"group"}
        w={"auto"}
        backgroundColor={"#fff"}
        rounded={"lg"}
        boxShadow="lg"
      >
        <Box rounded={"lg"} pos={"relative"} overflow="hidden">
          <ChakraImage
            transform="scale(1.0)"
            bg="#fff"
            rounded={"lg"}
            height={["220px", null, "350px"]}
            width={"auto"}
            objectFit={"cover"}
            src={mainImg}
            fallback={<Skeleton height={["220px", null, "350px"]} />}
            transition="0.3s ease-in-out"
            _hover={{
              transform: "scale(1.05)",
            }}
          />
        </Box>
        <Heading
          pos={"absolute"}
          mt={-10}
          mx={5}
          fontSize={{ base: "md", sm: "md", md: "xl" }}
          color="white"
          as={"u"}
        >
          {name}
        </Heading>
      </Box>
    </NavLink>
  );
};

export default PopularDrops;
