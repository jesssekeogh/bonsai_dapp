import React, { useState } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
  nft_transfer,
  nft_set_price,
  nft_burn,
} from "@vvv-interactive/nftanvil-react";
import { tokenFromText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Button,
  Heading,
  Text,
  Container,
  Flex,
  Tooltip,
  useBreakpointValue,
  HStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  createStandaloneToast,
  useColorModeValue,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { RiSendPlaneFill } from "react-icons/ri";
import { MdSell, MdRemoveShoppingCart } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import {
  FailedToast,
  SendingToast,
  SuccessICPToast,
  SuccessToast,
} from "../../containers/toasts/Toasts";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";

const { toast } = createStandaloneToast();

const checkSupport = (address) => {
  if (address.toLowerCase().substring(0, 3) !== "a00") return true;
};

// shows if owned on large NFT view
const Owned = ({ tokenId, tokens, price }) => {
  if (!tokens.includes(tokenFromText(tokenId))) {
    return null;
  }
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Flex rounded={"lg"} w={{ base: "100%", md: "auto" }}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
        <Text
          fontWeight={600}
          fontSize={{ base: "md", md: "lg" }}
          color="#b2b8be"
          mb={2}
        >
          Owned
        </Text>
        <HStack align="center">
          <SellButton tokenId={tokenId} />
          <TransferButton tokenId={tokenId} />
        </HStack>
        <HStack align="center" mt={2}>
          <BurnButton tokenId={tokenId} />
          {price > 0 ? <DelistButton tokenId={tokenId} /> : null}
        </HStack>
      </Container>
    </Flex>
  );
};

const TransferButton = ({ tokenId }) => {
  const address = useAnvilSelector((state) => state.user.address);
  const [To, setTo] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAnvilDispatch();

  const sendNft = async () => {
    let send = { id: tokenId, toAddress: To };

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
        tokenId.substring(0, 6) + "..." + tokenId.substring(15, 20),
        To
      );
    }
  };
  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <>
      <Button
        leftIcon={<RiSendPlaneFill />}
        bg={buttonBgColor}
        color={buttonTextColor}
        size="lg"
        _hover={{ opacity: "0.8" }}
        isDisabled={address ? false : true}
        onClick={() => onOpen()}
      >
        Transfer
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="10%">
          <ModalHeader>
            <Center>Transfer NFT</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>To Address</FormLabel>
              <Input
                variant="filled"
                placeholder="a00fe60cfcc1ec....."
                onChange={(event) => setTo(event.target.value)}
              />
              <FormHelperText>
                Address must support NFTA{" "}
                <Tooltip label="popular dapps that support NFTA: kontribute.app and nftanvil.com">
                  <InfoIcon boxSize={5} viewBox="0 0 30 30" />
                </Tooltip>
              </FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<RiSendPlaneFill />}
              bg={buttonBgColor}
              color={buttonTextColor}
              mt={2}
              size={useBreakpointValue(["md", "lg"])}
              _hover={{ opacity: "0.8" }}
              width="100%"
              onClick={() => sendNft()}
            >
              Transfer
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const SellButton = ({ tokenId }) => {
  const address = useAnvilSelector((state) => state.user.address);
  const [Amount, setAmount] = useState();
  const { isOpen, onOpen, onClose } = useDisclosure();
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
      id: tokenId,
      price: {
        amount: AccountIdentifier.icpToE8s(Amount),
        marketplace: [
          {
            address: AccountIdentifier.TextToArray(
              "a008e74937e5f920f82b8697b26847f16ea8dc45e7d1ffa11a86e5348df44c35"
            ),
            share: 200,
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
          tokenId.substring(0, 6) + "..." + tokenId.substring(15, 20)
        } price set to ${Amount} ICP`
      );
    } catch (e) {
      toast.closeAll();
      FailedToast("Failed", e.toString());
    }
  };

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <>
      <Button
        leftIcon={<MdSell />}
        bg={buttonBgColor}
        color={buttonTextColor}
        size="lg"
        _hover={{ opacity: "0.8" }}
        isDisabled={address ? false : true}
        onClick={() => onOpen()}
      >
        Sell
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="10%">
          <ModalHeader>
            <Center>Sell NFT</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Amount</FormLabel>
              <Input
                variant="filled"
                placeholder="0.1"
                onChange={(event) => setAmount(event.target.value)}
              />
              <FormHelperText>+ 2% marketplace fee</FormHelperText>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<MdSell />}
              bg={buttonBgColor}
              color={buttonTextColor}
              mt={2}
              size={useBreakpointValue(["md", "lg"])}
              _hover={{ opacity: "0.8" }}
              width="100%"
              onClick={() => setPrice(tokenId)}
            >
              Sell
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const DelistButton = ({ tokenId }) => {
  const dispatch = useAnvilDispatch();
  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  const priceObj = {
    id: tokenId,
    price: {
      amount: AccountIdentifier.icpToE8s(0),
      marketplace: [
        {
          address: AccountIdentifier.TextToArray(
            "a00dcee3d64e4daaa34ebfa7b95fba5f095e234d32a4770958e3f8e8818cafe1"
          ),
          share: 50,
        },
      ],
    },
  };

  const updatePrice = async () => {
    try {
      SendingToast("Updating NFT...");
      await dispatch(nft_set_price(priceObj));
      toast.closeAll();
      SuccessToast(
        "Success",
        `${
          tokenId.substring(0, 6) + "..." + tokenId.substring(15, 20)
        } Delisted`
      );
    } catch (e) {
      toast.closeAll();
      FailedToast("Failed", e.toString());
    }
  };

  return (
    <Button
      bg={buttonBgColor}
      color={buttonTextColor}
      size="lg"
      leftIcon={<MdRemoveShoppingCart />}
      _hover={{ opacity: "0.8" }}
      onClick={() => updatePrice()}
    >
      Delist
    </Button>
  );
};

const BurnButton = ({ tokenId }) => {
  const address = useAnvilSelector((state) => state.user.address);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAnvilDispatch();
  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  const BurnNft = async () => {
    try {
      onClose();
      SendingToast("Burning NFT...");
      await dispatch(nft_burn({ id: tokenId }));
      toast.closeAll();
      SuccessToast(
        "Success",
        `${tokenId.substring(0, 6) + "..." + tokenId.substring(15, 20)} Burned`
      );
    } catch (e) {
      toast.closeAll();
      FailedToast("Failed", e.toString());
    }
  };

  return (
    <>
      <Button
        leftIcon={<AiFillFire />}
        bg={buttonBgColor}
        color={buttonTextColor}
        size="lg"
        _hover={{ opacity: "0.8" }}
        isDisabled={address ? false : true}
        onClick={() => onOpen()}
      >
        Burn
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="10%">
          <ModalHeader>
            <Center>Burn NFT</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              fontWeight={600}
              mb={2}
            >
              Item
              <Text casing={"uppercase"}>{tokenId}</Text>
            </Heading>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<AiFillFire />}
              bg={buttonBgColor}
              color={buttonTextColor}
              mt={2}
              size={useBreakpointValue(["md", "lg"])}
              _hover={{ opacity: "0.8" }}
              width="100%"
              onClick={() => BurnNft()}
            >
              Burn
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Owned;
