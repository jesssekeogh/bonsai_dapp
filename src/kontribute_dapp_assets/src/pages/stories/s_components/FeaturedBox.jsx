import React from "react";
import { Box, Image as ChakraImage, Skeleton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const FeaturedBox = ({ author, img }) => {
  return (
    <NavLink to={"/stories/author/" + author}>
      <Box
        w={"full"}
        border={"double"}
        borderRadius="lg"
        backgroundColor="#16171b"
        boxShadow={"2xl"}
        overflow={"hidden"}
        height={["100px", null, "210px"]}
      >
        {" "}
        <ChakraImage
          transform="scale(1.0)"
          bg={"#fff"}
          src={img}
          fallback={
            <Skeleton
              height={{ base: "100px", md: "210px" }}
              width={{ base: "170px", md: "auto" }}
              borderRadius="lg"
            />
          }
          width={["170px", null, "auto"]}
          height={["100px", null, "210px"]}
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Box>
    </NavLink>
  );
};

export default FeaturedBox;
