import React, { useCallback, useRef } from "react";
import {
  Button,
  Box,
  Heading,
  FormControl,
  FormHelperText,
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
} from "../../../containers/colormode/Colors";
import IcLogo from "../../../../assets/ic-logo.png";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { nft_purchase } from "@vvv-interactive/nftanvil-react";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../../containers/toasts/Toasts";
import {
  e8sToIcp,
  TextToArray,
} from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { Usergeek } from "usergeek-ic-js";
import ReactCanvasConfetti from "react-canvas-confetti";

const { toast } = createStandaloneToast();

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  top: 0,
  left: 0,
};

const BuySingle = ({ tokenId, price, setShowQuickBuy, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
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
    closeModal();
    fire();
    let buyObj = {
      id: tokenId,
      amount: Number(price),
      payment_token_kind : {normal:null},
      payment_token: 1,
      affiliate: [
        {
          address: TextToArray(
            "a008e74937e5f920f82b8697b26847f16ea8dc45e7d1ffa11a86e5348df44c35"
          ),
          amount: 200,
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

  const closeModal = () => {
    onClose();
    if (setShowQuickBuy) {
      setShowQuickBuy(false);
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
      <Box onClick={() => onOpen()}>{children}</Box>
      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent mx="10%">
          <ModalHeader>
            <Center>Complete Checkout</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={3}>
            <Heading
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              textDecoration="underline"
            >
              Item:
            </Heading>
            <Heading
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
              mb={2}
              textTransform="uppercase"
            >
              {tokenId}
            </Heading>
            <Heading
              textDecoration="underline"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight={600}
            >
              Price:
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
            </Flex>
            <FormControl>
              <FormHelperText>includes 2% marketplace fee</FormHelperText>
            </FormControl>
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

export default BuySingle;
