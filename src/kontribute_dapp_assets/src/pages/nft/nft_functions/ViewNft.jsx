import React, {useEffect} from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { tokenUrl, tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useAnvilSelector, nft_fetch, useAnvilDispatch, } from "@vvv-interactive/nftanvil-react";
import { LoadingSpinner } from "../../../containers/index";

const ViewNft = ({tokenId}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const map = useAnvilSelector((state) => state.user.map);
  const dispatch = useAnvilDispatch();
  const meta = useAnvilSelector((state) => state.nft[tokenId]);

//   useEffect(() => {
//     dispatch(nft_fetch(tokenId));
//   }, [tokenId, dispatch]);

//   if (!meta) return null;

//   console.log("META", meta);

//   let nft = [
//     tokenFromText(tokenId),
//     meta.quality,
//     meta.name,
//     meta.lore,
//     meta.attributes,
//     meta.tags,
//   ];

useEffect(async () => {
    const meta = await dispatch(nft_fetch(tokenToText(tokenId))) //gets the NFT meta data
    console.log(meta)
}, [])
  return (
    <>
      <Button
        size={useBreakpointValue(["xs", "md"])}
        fontSize={{ base: "xs", sm: "xs", md: "md" }}
        maxW="120px"
        rounded={"full"}
        color={"white"}
        bgGradient="linear(to-r, #6190E8, #A7BFE8)"
        _hover={{ opacity: "0.8", transform: "scale(1.05)" }}
        onClick={onOpen}
      >
        View NFT
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mt={["40%", null, "10%"]} mx="10%">
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          <ChakraImage
              bg="#fff"
              rounded={"lg"}
              height={["300px", null, "400px"]}
              width={"auto"}
              objectFit={"cover"}
              src={tokenUrl(map.space, tokenId, "content")}
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewNft;
