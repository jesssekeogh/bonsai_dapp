import React from "react";
import { nft_purchase } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import {
  e8sToIcp,
  TextToArray,
} from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
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
} from "../../containers/toasts/Toasts.jsx";
import { Link, useNavigate } from "react-router-dom";

const toast = createStandaloneToast();

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
            state={{
              prev: "/marketplace/" + process.env.MARKETPLACE_COLLECTION,
              showConfetti: false,
              totalNfts: 1,
            }}
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
  const dispatch = useAnvilDispatch();
  const navigate = useNavigate();

  // 0.01icp= 001000000 e8s

  const PurchaseNft = async () => {
    onClose();
    let buyObj = {
      id: tokenToText(tokenId),
      amount: Number(price),
      affiliate: [
        {
          address: TextToArray(process.env.KONTRIBUTE_ADDRESS),
          amount: 100000,
        },
      ],
    };

    try {
      SendingToast("Buying NFT...");
      await dispatch(nft_purchase(buyObj));
      toast.closeAll();
      SuccessToast(
        "Success",
        `${
          tokenToText(tokenId).substring(0, 6) +
          "..." +
          tokenToText(tokenId).substring(15, 20)
        } bought for ${e8sToIcp(price)} ICP`
      );
      return navigate("/nft/" + tokenToText(tokenId), {
        state: {
          prev: "/marketplace/" + process.env.MARKETPLACE_COLLECTION,
          showConfetti: true,
          totalNfts: 1,
        },
      });
    } catch (e) {
      console.log(e);
      toast.closeAll();
      FailedToast("Failed", e.toString());
    }
  };

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
              onClick={() => PurchaseNft()}
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
