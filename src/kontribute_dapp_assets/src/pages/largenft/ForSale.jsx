import React, { useState, useEffect } from "react";
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
  HStack,
  Spacer,
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
import {
  useAnvilSelector,
  nft_purchase,
} from "@vvv-interactive/nftanvil-react";
import {
  SendingToast,
  SuccessToast,
  FailedToast,
} from "../../containers/toasts/Toasts";
import {
  e8sToIcp,
  TextToArray,
} from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { Usergeek } from "usergeek-ic-js";

// coingecko API:
const CoinApi =
  "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd";

const ForSale = ({ Icp, tokenId, setConfetti }) => {
  const [usdPrice, setUsdPrice] = useState(0);

  const loadPrice = async () => {
    let resp = await fetch(CoinApi).then((x) => x.json());
    let price = resp["internet-computer"].usd;

    setUsdPrice((price * e8sToIcp(Icp)).toFixed(2));
  };

  useEffect(() => {
    loadPrice();
  }, []);

  return (
    <Flex bg={"gray.50"} rounded={"lg"}>
      <Container bg={"white"} boxShadow={"xl"} rounded={"lg"} p={4}>
        <Text
          fontWeight={600}
          fontSize={{ base: "md", md: "lg" }}
          color="#b2b8be"
          mb={2}
        >
          Current Price
        </Text>
        <HStack>
          <Heading color={"#353840"} fontSize={{ base: "lg", md: "xl" }}>
            <Flex align="center">
              <Tooltip label="ICP">
                <ChakraImage
                  src={IcLogo}
                  h={["18px", null, "25px"]}
                  w={"auto"}
                />
              </Tooltip>
              &nbsp;
              {e8sToIcp(Icp)}
              &nbsp;
            </Flex>
          </Heading>
          <Text size="sm" fontWeight="bold" color="gray.500">
            (${usdPrice})
          </Text>
          <Spacer />
          <BuyButton
            tokenId={tokenId}
            price={Icp}
            setConfetti={setConfetti}
            usd={usdPrice}
          />
        </HStack>
      </Container>
    </Flex>
  );
};

const { toast } = createStandaloneToast();

const BuyButton = ({ tokenId, price, usd }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const address = useAnvilSelector((state) => state.user.address);
  const dispatch = useAnvilDispatch();
  // 0.01icp= 001000000 e8s

  const PurchaseNft = async () => {
    onClose();
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
      <Button
        leftIcon={<MdOutlineAccountBalanceWallet />}
        bg={buttonBgColor}
        color={buttonTextColor}
        mt={2}
        size={useBreakpointValue(["md", "lg"])}
        _hover={{ opacity: "0.8" }}
        disabled={address ? false : true}
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
              <Text>(${usd})</Text>
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
