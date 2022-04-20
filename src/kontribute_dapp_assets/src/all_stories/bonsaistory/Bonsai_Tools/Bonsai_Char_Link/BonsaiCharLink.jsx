import React, {useState} from "react";
import { NavLink } from "react-router-dom";
import { tokenUrl } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { Image as ChakraImage } from "@chakra-ui/react";
import {
  PopoverBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  useBreakpointValue,
  Stack,
  Text,
} from "@chakra-ui/react";

const BonsaiCharLink = ({ name }) => {
  const map = useAnvilSelector((state) => state.user.map);

  // loop through nfts and get id
  return (
    <>
      <Popover placement="top-end" isLazy>
        <PopoverTrigger>
          <u className="char__link">{name}</u>
        </PopoverTrigger>
        <PopoverContent width={"auto"} mx={2} backgroundColor={"#1e212b"}>
          <PopoverBody>
            <ChakraImage
              bg="#fff"
              rounded={"lg"}
              height={["200px", null, "300px"]}
              width={"auto"}
              objectFit={"cover"}
              src={tokenUrl(map.space, tokenId, "thumb")}
            />
          </PopoverBody>
          <Stack my={2} direction={"row"} align={"center"} justify="center">
            <NavLink to={`${"/nft/"}${name}`}>
              <Button
                size={useBreakpointValue(["xs", "md"])}
                fontSize={{ base: "0.6rem", sm: "xs", md: "md" }}
                // maxW={"50%"}
                rounded={"full"}
                color={"white"}
                bgGradient="linear(to-r, #6190E8, #A7BFE8)"
                _hover={{ opacity: "0.8", transform: "scale(1.05)" }}
              >
                <Text as="samp">Buy Now</Text>
              </Button>
            </NavLink>
          </Stack>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default BonsaiCharLink;
