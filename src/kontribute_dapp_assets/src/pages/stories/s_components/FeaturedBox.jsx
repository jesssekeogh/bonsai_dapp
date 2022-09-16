import React from "react";
import { Box, Image as ChakraImage, Skeleton, Heading } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const FeaturedBox = ({ mainImg, link, name }) => {
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
            height={["250px", null, "330px"]}
            width={"auto"}
            objectFit={"cover"}
            src={mainImg}
            fallback={<Skeleton height={["250px", null, "330px"]} />}
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

export default FeaturedBox;
