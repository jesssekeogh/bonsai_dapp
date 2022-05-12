import React, { useState } from "react";
import { nft_purchase } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Tooltip,
  Button,
  Heading,
  Text,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  createStandaloneToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  FormControl,
  FormHelperText,
  useBreakpointValue,
} from "@chakra-ui/react";
import { BsBasketFill } from "react-icons/bs";
import { HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
  SuccessICPToast,
} from "../../containers/toasts/Toasts.jsx";
import { Link } from "react-router-dom";

const MarketplaceNftButton = ({ tokenId, price }) => {
  return (
    <>
      <Menu>
        <MenuButton
          size={useBreakpointValue({ base: "xs", md: "sm" })}
          backgroundColor={"#1e212b"}
          as={IconButton}
          icon={<HamburgerIcon />}
          color="#fff"
          colorScheme="#1e212b"
          variant="outline"
          _hover={{ opacity: "0.8" }}
        />
        <MenuList>
          <Link
            to={"/nft/" + tokenToText(tokenId)}
            state={{ prev: "/marketplace/" + process.env.MARKETPLACE_COLLECTION, showConfetti: false, totalNfts: 1 }}
          >
            <MenuItem icon={<ViewIcon />}>View NFT</MenuItem>
          </Link>
          <BuyNft tokenId={tokenId} price={price} />
        </MenuList>
      </Menu>
    </>
  );
};

const BuyNft = ({ tokenId, price }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <MenuItem icon={<BsBasketFill />} onClick={onOpen}>
        Buy NFT
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#141414" color="#fff" mx="10%">
          <ModalHeader
            as="kbd"
            bgGradient="linear(to-l, #ed1f79, #2dade2)"
            bgClip="text"
          >
            Buy:{" "}
            <Text
              as="kbd"
              bgGradient="linear(to-r, #ed1f79, #f15b25)"
              bgClip="text"
              casing="uppercase"
            >
              {tokenToText(tokenId)}
            </Text>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              color={"white"}
            >
              Are you sure you want to buy this NFT for{" "}
              <Text
                as="kbd"
                bgGradient="linear(to-r, #ed1f79, #f15b25)"
                bgClip="text"
              >
                {e8sToIcp(price)}
              </Text>{" "}
              <Text
                as="kbd"
                bgGradient="linear(to-l, #ed1f79, #2dade2)"
                bgClip="text"
              >
                ICP
              </Text>
              <FormControl>
                <FormHelperText>
                  This NFT will be transferred to your Kontribute inventory
                </FormHelperText>
              </FormControl>
            </Heading>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              rightIcon={<BsBasketFill />}
              mr={3}
              _hover={{ opacity: "0.8" }}
              //   onClick={() => Burn()}
            >
              Buy
            </Button>
            <Button
              colorScheme="black"
              color="#f0e6d3"
              variant="outline"
              _hover={{ opacity: "0.8" }}
              onClick={onClose}
            >
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default MarketplaceNftButton;
