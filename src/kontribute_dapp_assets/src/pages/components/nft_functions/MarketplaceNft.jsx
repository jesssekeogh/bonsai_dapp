import React from "react";
import {
  Text,
  Heading,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormHelperText,
  FormControl,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  createStandaloneToast,
} from "@chakra-ui/react";
import { BiPurchaseTag } from "react-icons/bi";
import { GiConfirmed } from "react-icons/gi";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  useAnvilDispatch,
  nft_purchase,
} from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import ViewNft from "./ViewNft";

const MarketplaceNft = ({ tokenId, price }) => {
  const dispatch = useAnvilDispatch();

  const buy = async () => {
    onClose();
    await dispatch(nft_purchase({ id: tokenToText(tokenId), amount: price }));
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Menu>
        <MenuButton
          size={"sm"}
          backgroundColor={"#1e212b"}
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          color="#fff"
          colorScheme="#1e212b"
          variant="outline"
          me={0}
          ms={-5}
        />
        <MenuList>
          <MenuItem closeOnSelect={false}>
            <ViewNft tokenId={tokenId} />
          </MenuItem>
          <MenuItem icon={<BiPurchaseTag />} onClick={onOpen}>
            Purchase NFT
          </MenuItem>
        </MenuList>
      </Menu>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#141414" color="#fff" mx="10%">
          <ModalHeader
            as="kbd"
            bgGradient="linear(to-l, #ed1f79, #2dade2)"
            bgClip="text"
          >
            Price:{" "}
            <Text
              as="kbd"
              bgGradient="linear(to-r, #ed1f79, #f15b25)"
              bgClip="text"
            >
              {AccountIdentifier.e8sToIcp(price)}
            </Text>
            <FormControl>
              <FormHelperText>
                + 0.0001 ICP in transfer fees paid to IC
              </FormHelperText>
            </FormControl>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {" "}
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              color={"white"}
            >
              You are about to purchase this NFT for{" "}
              <Text
                as="kbd"
                bgGradient="linear(to-r, #ed1f79, #f15b25)"
                bgClip="text"
              >
                {AccountIdentifier.e8sToIcp(price)}
              </Text>{" "}
              ICP
            </Heading>
          </ModalBody>
          <ModalFooter>
            <Button
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              rightIcon={<GiConfirmed />}
              mr={3}
              _hover={{ opacity: "0.8" }}
              onClick={() => buy()}
            >
              Confirm Payment
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

export default MarketplaceNft;
