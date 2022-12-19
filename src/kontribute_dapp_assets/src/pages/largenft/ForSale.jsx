import React, { useState, useEffect, useCallback, useRef } from "react";
import {
  Button,
  Heading,
  Text,
  Container,
  Flex,
  Image as ChakraImage,
  Tooltip,
  useBreakpointValue,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Center,
  createStandaloneToast,
} from "@chakra-ui/react";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";
import IcLogo from "../../../assets/ic-logo.png";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { nft_purchase } from "@vvv-interactive/nftanvil-react";
import {
  SendingToast,
  SuccessToast,
  FailedToast,
} from "../../containers/toasts/Toasts";
import {
  e8sToIcp,
  TextToArray,
} from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { tokenFromText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { useSelector } from "react-redux";
import { Usergeek } from "usergeek-ic-js";
import IcpToDollars from "../components/IcpToDollars";
import ReactCanvasConfetti from "react-canvas-confetti";

const ForSale = ({ Icp, tokenId, tokens }) => {
  const [usdPrice, setUsdPrice] = useState(0);

  const loadPrice = async () => {
    setUsdPrice(await IcpToDollars(Icp));
  };

  useEffect(() => {
    loadPrice();
  }, []);

  return (
    <Flex bg={"gray.50"} rounded={"lg"} w={{ base: "100%", md: "60%" }}>
      <Container bg={"white"} boxShadow={"xl"} rounded={"lg"} p={4}>
        <Text
          fontWeight={600}
          fontSize={{ base: "md", md: "lg" }}
          color="#b2b8be"
          mb={2}
        >
          Current Price
        </Text>
        <Flex align="baseline" gap={1}>
          <Heading color={"#353840"} fontSize={{ base: "xl", md: "3xl" }}>
            {Number(e8sToIcp(Icp)).toFixed(2)}
          </Heading>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            color={"#353840"}
          >
            ICP
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            color="gray.500"
          >
            &nbsp;{usdPrice}
          </Text>
        </Flex>
        {!tokens.includes(tokenFromText(tokenId)) ? (
          <BuyButton tokenId={tokenId} price={Icp} usd={usdPrice} />
        ) : null}
      </Container>
    </Flex>
  );
};

const { toast } = createStandaloneToast();

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const BuyButton = ({ tokenId, price, usd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const loggedIn = useSelector((state) => state.Profile.loggedIn);
  const dispatch = useAnvilDispatch();
  // 0.01icp= 001000000 e8s

  const refAnimationInstance = useRef(null);

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      });
  }, []);

  const fire = useCallback(() => {
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    });

    makeShot(0.2, {
      spread: 60,
    });

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    });

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }, [makeShot]);

  const PurchaseNft = async () => {
    onClose();
    fire();
    let buyObj = {
      id: tokenId,
      amount: Number(price),
      affiliate: [
        {
          address: TextToArray(
            "a00dcee3d64e4daaa34ebfa7b95fba5f095e234d32a4770958e3f8e8818cafe1"
          ),
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
          tokenId.substring(0, 6) + "..." + tokenId.substring(15, 20)
        } bought for ${e8sToIcp(price)} ICP`
      );
      Usergeek.trackEvent("NftPurchase");
    } catch (e) {
      console.log(e);
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
      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      <Button
        leftIcon={<MdOutlineAccountBalanceWallet />}
        bg={buttonBgColor}
        color={buttonTextColor}
        mt={3}
        w="full"
        size="lg"
        _hover={{ opacity: "0.8" }}
        disabled={loggedIn ? false : true}
        onClick={() => onOpen()}
      >
        Buy Now
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="10%">
          <ModalHeader>
            <Center>Complete Checkout</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              fontWeight={600}
              mb={2}
            >
              Item
              <Text casing={"uppercase"}>{tokenId}</Text>
            </Heading>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              fontWeight={600}
            >
              Price
            </Heading>
            <Flex align="center" fontWeight={600}>
              <Tooltip label="ICP">
                <ChakraImage
                  src={IcLogo}
                  h={["18px", null, "25px"]}
                  w={"auto"}
                />
              </Tooltip>
              &nbsp;
              {e8sToIcp(price)}
              &nbsp;
              <Text>{usd}</Text>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button
              leftIcon={<MdOutlineAccountBalanceWallet />}
              bg={buttonBgColor}
              color={buttonTextColor}
              mt={2}
              size={useBreakpointValue(["md", "lg"])}
              _hover={{ opacity: "0.8" }}
              width="100%"
              onClick={() => PurchaseNft()}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default ForSale;
