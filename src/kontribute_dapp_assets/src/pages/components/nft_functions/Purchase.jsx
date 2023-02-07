import React from "react";
import {
  Text,
  Heading,
  Button,
  useBreakpointValue,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
  Tooltip,
  Center,
  useDisclosure,
  FormControl,
  FormHelperText,
  Image as ChakraImage,
  createStandaloneToast,
} from "@chakra-ui/react";
import IcLogo from "../../../../assets/ic-logo.png";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { createItoActor } from "../../../../../declarations/ito.js";
import {
  user_pwr_transfer,
  user_refresh_balances,
  useAnvilDispatch,
} from "@vvv-interactive/nftanvil-react";
import {
  principalToAccountIdentifier,
  tokenToText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  SendingToast,
  SuccessToast,
  FailedToast,
} from "../../../containers/toasts/Toasts";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../../containers/colormode/Colors.jsx";

const { toast } = createStandaloneToast();

// purchase component used in Launhpad for inital offering

const Purchase = ({ nfts, amount }) => {
  const dispatch = useAnvilDispatch();

  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.Profile.loggedIn);

  const buy = (amount) => async (dispatch, getState) => {
    SendingToast("Transferring ICP...");

    const s = getState();

    let address = AccountIdentifier.TextToArray(s.user.address);

    let subaccount = [
      AccountIdentifier.TextToArray(s.user.subaccount) || null,
    ].filter(Boolean);

    let destination = principalToAccountIdentifier(
      process.env.REACT_APP_ITO_CANISTER_ID
    );

    let dres;
    try {
      dres = await dispatch(
        user_pwr_transfer({ to: destination, amount, memo: [] }) // traps on error so we use catch
      );
    } catch (err) {
      toast.closeAll();
      return FailedToast("Failed", err.toString());
    }

    toast.closeAll();

    // make pwr transfer and get tx
    console.log("user_pwr_transfer", dres);

    let txid = dres.ok.transactionId;

    let collection = createItoActor({
      agentOptions: authentication.getAgentOptions(),
    });

    SendingToast("Purchasing NFT(s)...");

    // send tx_id to our custom collection.mo contract
    let brez = await collection.buy_tx( amount, txid, subaccount);
    console.log("buy_tx", brez);

    dispatch(user_refresh_balances());

    if ("err" in brez) {
      toast.closeAll();
      return FailedToast("Failed", brez.err.toString());
    }

    toast.closeAll();
    SuccessToast("Success", "Congratulations! You got " + nfts + " NFT(s)");

    return navigate("/nft/" + tokenToText(brez.ok.map((x) => Number(x))[0]), {
      state: {
        prev: "/noblebright",
        showConfetti: true,
        totalNfts: nfts,
      },
    }); // returns the claimed token
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <>
      <Button
        bg={buttonBgColor}
        color={buttonTextColor}
        mt={2}
        size={useBreakpointValue(["md", "lg"])}
        leftIcon={<MdOutlineAccountBalanceWallet />}
        _hover={{ opacity: "0.8" }}
        mb={3}
        onClick={onOpen}
        isDisabled={!isLogged}
      >
        <Text>Buy now</Text>
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
            >
              You will be randomly allocated {nfts} NFT(s) from the collection!
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
              {AccountIdentifier.e8sToIcp(amount)}
            </Flex>
            <FormControl>
              <FormHelperText>
                + 0.0001 ICP in transfer fees paid to IC
              </FormHelperText>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              leftIcon={<MdOutlineAccountBalanceWallet />}
              bg={buttonBgColor}
              color={buttonTextColor}
              size={useBreakpointValue(["md", "lg"])}
              width="100%"
              _hover={{ opacity: "0.8" }}
              onClick={async () => {
                onClose();
                dispatch(buy(amount));
              }}
            >
              Checkout
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Purchase;
