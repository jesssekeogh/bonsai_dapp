import React, { useState } from "react";
import { createItoActor } from "../../../../../declarations/ito.js";
import { base58ToBytes } from "@vvv-interactive/nftanvil-tools/cjs/data.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  Text,
  Button,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  createStandaloneToast,
  useDisclosure,
  Heading,
  Input,
} from "@chakra-ui/react";
import { GiConfirmed } from "react-icons/gi";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../../containers/toasts/Toasts.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const toast = createStandaloneToast();

const Airdrop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAnvilDispatch();
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.Profile.loggedIn);

  const airdrop_use = (key) => async (dispatch, getState) => {
    const s = getState();

    let address = AccountIdentifier.TextToArray(s.user.address);

    let ito = createItoActor({
      agentOptions: authentication.getAgentOptions(),
    });

    let brez = await ito.airdrop_use(address, base58ToBytes(key));

    console.log("airdrop_use", brez);
    if ("err" in brez) throw new Error(brez.err);

    return navigate("/nft/" + tokenToText(brez.ok.map((x) => Number(x))[0]), {
      state: {
        prev: "/launchpad/bonsai-nft",
        showConfetti: true,
        totalNfts: 1,
      },
    }); // returns the claimed token
  };

  const send_code = async (code) => {
    if (code.length < 1) {
      return FailedToast("Failed", "Airdrop code Invalid");
    }
    onClose();
    SendingToast("Claiming NFT...");

    try {
      await dispatch(airdrop_use(code));
      toast.closeAll();
      SuccessToast("Success", "Congratulations! You got 1 NFT");
    } catch (e) {
      toast.closeAll();
      return FailedToast("Failed", e.toString());
    }
  };

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
        isDisabled={!isLogged}
      >
        <Text as="kbd">Use Airdrop Code</Text>
      </Button>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#141414" color="#fff" mx="10%">
          <ModalHeader
            as="kbd"
            bgGradient="linear(to-l, #ed1f79, #2dade2)"
            bgClip="text"
          >
            Enter Airdrop Code
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Heading
              fontSize={{ base: "xs", sm: "xs", md: "md" }}
              color={"white"}
            >
              <FormControl>
                <Input
                  placeholder="2q3yzvCiraWf2vAR..."
                  onChange={(event) => setCode(event.target.value)}
                />
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
              rightIcon={<GiConfirmed />}
              mr={3}
              _hover={{ opacity: "0.8" }}
              onClick={() => send_code(code)}
            >
              Confirm Airdrop
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

export default Airdrop;
