import React from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Skeleton,
  SkeletonText,
  Spacer,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import Bonsai from "../../../../assets/Bonsai_Warriors_Background_1.png"

const FeaturedBox = ({ author }) => {
  return (
    <NavLink to={"/stories/author/" + author}>
      <Box
        w={"full"}
        border={"double"}
        borderRadius="lg"
        backgroundColor="#16171b"
        boxShadow={"2xl"}
        overflow={"hidden"}
        height={"auto"}
      >
          {" "}
          <ChakraImage
            transform="scale(1.0)"
            bg={"#fff"}
            src={Bonsai}
            objectFit="contain"
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
