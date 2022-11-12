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
import pendragon from "../../../assets/pendragon.png";
import bonsai from "../../../assets/Bonsai_Warriors_Background_1.png";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const PopularDrops = () => {
  return (
    <>
      <Center pb={5}>
        <Heading
          fontWeight={"bold"}
          fontSize={{ base: "xl", sm: "2xl", lg: "3xl" }}
        >
          Popular art collections
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
            mainImg={pendragon}
            link={
              "/marketplace/a00b8f555f7b02edaf9854ea727e83adb7e6b84cca023f784d70369e5223cfd5"
            }
            name={"Pendragon Quest"}
          />
          <PopularCard
            mainImg={bonsai}
            link={
              "/marketplace/a006b7308ff262c78c50b3a20059229d30b818034a9f5186eec8e93a1dc15f77"
            }
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
        <Box
          pos={"relative"}
          mt={{ base: -8, md: -9 }}
          pb={3}
          zIndex={1}
          background={
            "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)"
          }
          rounded="lg"
        >
          <Heading
            mx={5}
            fontSize={{ base: "md", sm: "md", md: "xl" }}
            color="white"
          >
            {name} <ArrowForwardIcon />
          </Heading>
        </Box>
      </Box>
    </NavLink>
  );
};

export default PopularDrops;
