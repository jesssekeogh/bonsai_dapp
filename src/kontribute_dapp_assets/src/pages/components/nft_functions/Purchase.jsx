import React from "react";
import {
  Text,
  Heading,
  Button,
  useBreakpointValue,
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
  createStandaloneToast,
} from "@chakra-ui/react";
import { GiConfirmed } from "react-icons/gi";
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

const toast = createStandaloneToast();

// purchase component used in Launhpad for inital offering

const Purchase = ({ nfts, amount }) => {
  const dispatch = useAnvilDispatch();

  const navigate = useNavigate();

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
      return FailedToast("Transaction failed");
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
    let brez = await collection.buy_tx(txid, subaccount);
    console.log("buy_tx", brez);

    dispatch(user_refresh_balances());

    if ("err" in brez) {
      toast.closeAll();
      return FailedToast("Transaction failed");
    }

    toast.closeAll();
    SuccessToast("Congratulations! You got " + nfts + " NFT(s)");

    return navigate("/nft/" + tokenToText(brez.ok.map((x) => Number(x))[0]), {
      state: {
        prev: "/launchpad/bonsai-nft",
        showConfetti: true,
        totalNfts: nfts,
      },
    }); // returns the claimed token
  };

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button
        size={useBreakpointValue(["md", "lg"])}
        fontSize={{ base: "sm", sm: "sm", md: "md" }}
        rounded={"full"}
        color={"white"}
        bgGradient="linear(to-r, #c61682, #ee670d)"
        _hover={{ opacity: "0.8", transform: "scale(1.05)" }}
        mb={3}
        onClick={onOpen}
      >
        <Text as="kbd">Buy Now</Text>
      </Button>
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
              {AccountIdentifier.e8sToIcp(amount)} ICP
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
              You will be randomly allocated {nfts} Bonsai Warrior(s) from the
              collection!
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
              onClick={async () => {
                onClose();
                dispatch(buy(amount));
              }}
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

export default Purchase;
