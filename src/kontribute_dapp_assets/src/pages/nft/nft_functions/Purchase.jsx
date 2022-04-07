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
import { createCollectionActor } from "../../../../../declarations/collection.js";
import {
  user_pwr_transfer,
  user_refresh_balances,
  useAnvilDispatch,
} from "@vvv-interactive/nftanvil-react";
import { principalToAccountIdentifier } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {SendingToast, SuccessToast, FailedToast} from "../../../containers/toasts/Toasts"

const toast = createStandaloneToast();

const Purchase = () => {
  const dispatch = useAnvilDispatch();

  const buy = (amount) => async (dispatch, getState) => {
    SendingToast("Transferring ICP...")
    const s = getState();

    let address = AccountIdentifier.TextToArray(s.user.address);

    let subaccount = [
      AccountIdentifier.TextToArray(s.user.subaccount) || null,
    ].filter(Boolean);

    let destination = principalToAccountIdentifier(
      process.env.REACT_APP_COLLECTION_CANISTER_ID
    );
    // make pwr transfer and get tx
    let dres = await dispatch(
      user_pwr_transfer({ to: destination, amount, memo: [] }) // fails and traps if no balance --TODO show toast
    );
    toast.closeAll()
    console.log("user_pwr_transfer", dres);

    if ("err" in dres){
      return FailedToast("Insufficient funds");
    }

    let txid = dres.ok.transactionId;

    let collection = createCollectionActor({
      agentOptions: authentication.getAgentOptions(),
    });
    SendingToast("Purchasing NFT...")
    // send tx_id to our custom collection.mo contract
    let brez = await collection.buy_tx(txid, subaccount);
    console.log("buy_tx", brez);
    toast.closeAll()
    dispatch(user_refresh_balances());
    if( "err" in brez ){
      return FailedToast("Not enough NFTs, ICP refunded")
    }
    SuccessToast("1 NFT successfully added to inventory!")
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  // toast.closeAll();
  return (
    <>
      <Button
        size={useBreakpointValue(["md", "lg"])}
        fontSize={{ base: "xs", sm: "xs", md: "md" }}
        rounded={"full"}
        color={"white"}
        bgGradient="linear(to-r, #c61682, #ee670d)"
        _hover={{ opacity: "0.8", transform: "scale(1.05)" }}
        mb={3}
        onClick={onOpen}
      >
        <Text as="kbd">MINT BONSAI WARRIOR NFT: 0.0004 ICP</Text>
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          bg="#141414"
          color="#fff"
          mt={["40%", null, "10%"]}
          mx="10%"
        >
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
              0.0004
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
              You will be randomly allocated a 1 Bonsai Warrior from the the
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
                onClose()
                dispatch(buy(40000));
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
