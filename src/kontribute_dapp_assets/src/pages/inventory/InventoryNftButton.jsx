import React, { useState } from "react";
import { HamburgerIcon, ViewIcon } from "@chakra-ui/icons";
import {
  nft_burn,
  useAnvilDispatch,
  nft_transfer,
  nft_set_price,
} from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
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
import { RiSendPlaneFill } from "react-icons/ri";
import { AiFillFire } from "react-icons/ai";
import { MdSell } from "react-icons/md";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
  SuccessICPToast,
} from "../../containers/toasts/Toasts.jsx";
import { Link } from "react-router-dom";
import { ViewIcon, InfoIcon } from "@chakra-ui/icons";

const { toast } = createStandaloneToast();

const checkSupport = (address) => {
  if (address.toLowerCase().substring(0, 3) !== "a00") return true;
};

const InventoryNftButton = ({ tokenId }) => {
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
            state={{ prev: "/inventory", showConfetti: false, totalNfts: 1 }}
          >
            <MenuItem icon={<ViewIcon />}>View NFT</MenuItem>
          </Link>
          <TransferNft tokenId={tokenId} />
          <SellNft tokenId={tokenId} />
          <BurnNft tokenId={tokenId} />
        </MenuList>
      </Menu>
    </>
  );
};

const TransferNft = ({ tokenId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [To, setTo] = useState("");
  const dispatch = useAnvilDispatch();

  const sendNft = async () => {
    let send = { id: tokenToText(tokenId), toAddress: To };

    if (send.toAddress.length !== 64) {
      return FailedToast("Failed", "Invalid ICP address"); // verbose errors for the user
    } else {
      if (checkSupport(send.toAddress))
        return FailedToast("Failed", "Address does not support NFTA");
      onClose();
      SendingToast("Sending NFT...");

      await dispatch(nft_transfer(send));
      toast.closeAll();
      SuccessICPToast(
        tokenToText(tokenId).substring(0, 6) +
          "..." +
          tokenToText(tokenId).substring(15, 20),
        To
      );
    }
  };

  return (
    <>
      <MenuItem icon={<RiSendPlaneFill />} onClick={onOpen}>
        Transfer NFT
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#141414" color="#fff" mx="10%">
          <ModalHeader
            as="kbd"
            bgGradient="linear(to-l, #ed1f79, #2dade2)"
            bgClip="text"
          >
            Transfer:{" "}
            <Text
              as="kbd"
              bgGradient="linear(to-r, #ed1f79, #f15b25)"
              bgClip="text"
              casing="uppercase"
            >
              {tokenToText(tokenId)}
            </Text>
            <FormControl>
              <FormHelperText>
                Address must support NFTA{" "}
                <Tooltip label="dapps that support NFTA: kontribute.app and nftanvil.com">
                  <InfoIcon boxSize={5} viewBox="0 0 30 30" />
                </Tooltip>
              </FormHelperText>
            </FormControl>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>To Address</FormLabel>
              <Tooltip label="ICP Address (NOT PRINCIPAL ID)">
                <Input
                  placeholder="a00fe60cfcc1ec....."
                  onChange={(event) => setTo(event.target.value)}
                />
              </Tooltip>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              rightIcon={<RiSendPlaneFill />}
              mr={3}
              _hover={{ opacity: "0.8" }}
              onClick={() => sendNft()}
            >
              Transfer NFT
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

const BurnNft = ({ tokenId }) => {
  const dispatch = useAnvilDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const Burn = async () => {
    onClose();
    SendingToast("Burning NFT...");
    try {
      await dispatch(nft_burn({ id: tokenToText(tokenId) }));
      toast.closeAll();
      SuccessToast(
        "Success",
        `${
          tokenToText(tokenId).substring(0, 6) +
          "..." +
          tokenToText(tokenId).substring(15, 20)
        } burned successfully`
      );
    } catch (e) {
      FailedToast("Failed", e.toString());
    }
  };

  return (
    <>
      <MenuItem icon={<AiFillFire />} onClick={onOpen}>
        Burn NFT
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#141414" color="#fff" mx="10%">
          <ModalHeader
            as="kbd"
            bgGradient="linear(to-l, #ed1f79, #2dade2)"
            bgClip="text"
          >
            Burn:{" "}
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
              Are you sure you want to burn this NFT?
              <FormControl>
                <FormHelperText>This is irreversible</FormHelperText>
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
              rightIcon={<AiFillFire />}
              mr={3}
              _hover={{ opacity: "0.8" }}
              onClick={() => Burn()}
            >
              Burn
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

const SellNft = ({ tokenId }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Amount, setAmount] = useState();
  const dispatch = useAnvilDispatch();

  const checkAmount = (amount) => {
    if (Number(amount) < 0 || isNaN(Number(amount))) {
      return false;
    }
    return true;
  };

  const setPrice = async () => {
    if (!checkAmount(Amount)) return FailedToast("Failed", "Invalid amount");
    onClose();

    SendingToast("Setting price...");

    let priceObj = {
      id: tokenToText(tokenId),
      price: {
        amount: AccountIdentifier.icpToE8s(Amount),
        marketplace: [
          {
            address: AccountIdentifier.TextToArray(
              process.env.KONTRIBUTE_ADDRESS
            ),
            share: 50,
          },
        ],
      },
    };

    try {
      await dispatch(nft_set_price(priceObj));
      toast.closeAll();
      SuccessToast(
        "Success",
        `${
          tokenToText(tokenId).substring(0, 6) +
          "..." +
          tokenToText(tokenId).substring(15, 20)
        } price set to ${Amount} ICP`
      );
    } catch (e) {
      toast.closeAll();
      FailedToast("Failed", e.toString());
    }
  };

  return (
    <>
      <MenuItem icon={<MdSell />} onClick={onOpen}>
        Sell NFT
      </MenuItem>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#141414" color="#fff" mx="10%">
          <ModalHeader
            as="kbd"
            bgGradient="linear(to-l, #ed1f79, #2dade2)"
            bgClip="text"
          >
            Sell:{" "}
            <Text
              as="kbd"
              bgGradient="linear(to-r, #ed1f79, #f15b25)"
              bgClip="text"
              casing="uppercase"
            >
              {tokenToText(tokenId)}
            </Text>
            <FormControl>
              <FormHelperText>
                This NFT will be listed on the Kontribute Marketplace{" "}
                <Tooltip label="Supported collections: Badbot Ninja">
                  <InfoIcon boxSize={5} viewBox="0 0 30 30" />
                </Tooltip>
              </FormHelperText>
            </FormControl>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="0.1"
                onChange={(event) => setAmount(event.target.value)}
              />
              <FormHelperText>
                + 0.05% marketplace fee
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              mr={3}
              rightIcon={<MdSell />}
              _hover={{ opacity: "0.8" }}
              onClick={() => setPrice(tokenToText(tokenId))}
            >
              Sell
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
export default InventoryNftButton;
