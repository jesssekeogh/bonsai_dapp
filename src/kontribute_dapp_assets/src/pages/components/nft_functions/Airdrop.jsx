import React, { useState } from "react";
import { createItoActor } from "../../../../../declarations/ito.js";
import { base58ToBytes } from "@vvv-interactive/nftanvil-tools/cjs/data.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  Button,
  useBreakpointValue,
  useColorModeValue,
  Center,
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
import { FaParachuteBox } from "react-icons/fa";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../../containers/toasts/Toasts.jsx";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../../containers/colormode/Colors.jsx";

const { toast } = createStandaloneToast();

const Airdrop = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useAnvilDispatch();
  const [code, setCode] = useState("");
  const navigate = useNavigate();
  const isLogged = useSelector((state) => state.Profile.loggedIn);

  const airdrop_use = () => async (dispatch, getState) => {
    const s = getState();

    let address = AccountIdentifier.TextToArray(s.user.address);

    let subaccount = [
      AccountIdentifier.TextToArray(s.user.subaccount) || null,
    ].filter(Boolean);

    let ito = createItoActor({
      agentOptions: authentication.getAgentOptions(),
    });

    let stats = await ito.stats();
    console.log(stats)
    
    let brez = await ito.airdrop_use(address);

    console.log("airdrop_use", brez);
    if ("err" in brez) throw new Error(brez.err);

    let tid = brez.ok.map((x) => Number(x))[0];

    await ito.claim(address, subaccount, tid);

    return navigate("/nft/" + tokenToText(tid), {
      state: {
        prev: "/noblebright",
        showConfetti: true,
        totalNfts: 1,
      },
    }); // returns the claimed token

    // let promises = [];
    // for (let token of brez.ok.map((x) => Number(x))) {
    //   ito.claim(address, subaccount, token);
    // }

    // await Promise.allSettled(promises.map(async (claimed) => await claimed));
  };

  const send_code = async () => {
    onClose();
    SendingToast("Claiming NFT...");

    try {
      await dispatch(airdrop_use());
      toast.closeAll();
      SuccessToast("Success", "Congratulations! You got 1 NFT");
    } catch (e) {
      toast.closeAll();
      return FailedToast("Failed", e.toString());
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
        bg={buttonBgColor}
        color={buttonTextColor}
        leftIcon={<FaParachuteBox />}
        size={useBreakpointValue(["md", "lg"])}
        _hover={{ opacity: "0.95" }}
        boxShadow="lg"
        onClick={onOpen}
        isDisabled={!isLogged}
      >
        Claim airdrop
      </Button>
      {/* modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent mx="10%">
          <ModalHeader>
            <Center>Claim Airdrop</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
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
              You will be randomly allocated 1 NFT from the collection!
            </Heading>
            {/* <Heading fontSize={{ base: "xs", sm: "xs", md: "md" }}>
              <FormControl>
                <Input
                  placeholder="2q3yzvCiraWf2vAR..."
                  onChange={(event) => setCode(event.target.value)}
                />
              </FormControl>
            </Heading> */}
          </ModalBody>
          <ModalFooter>
            <Button
              bg={buttonBgColor}
              color={buttonTextColor}
              size={useBreakpointValue(["md", "lg"])}
              width="100%"
              _hover={{ opacity: "0.8" }}
              leftIcon={<FaParachuteBox />}
              onClick={() => send_code()}
            >
              Confirm Airdrop
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Airdrop;
