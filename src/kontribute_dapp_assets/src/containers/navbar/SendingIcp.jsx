import React, { useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import {
  Button,
  Tooltip,
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
  InputGroup,
  InputRightElement,
  Text,
  FormControl,
  FormHelperText,
  createStandaloneToast,
} from "@chakra-ui/react";
import {
  useAnvilDispatch,
  user_transfer_icp,
} from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { SendingToast, FailedToast, SuccessICPToast } from "../toasts/Toasts";

const { toast } = createStandaloneToast();

const SendingIcp = ({ isOpen, onClose, user_icp }) => {
  //  1 icp= 100000000 e8s
  // 0.1icp= 010000000 e8s
  const anvilDispatch = useAnvilDispatch();
  const [To, setTo] = useState("");
  const [Amount, setAmount] = useState(0);

  const closePop = () => {
    onClose();
    setTo("");
    setAmount(0);
  };

  const checkAddress = (send) => {
    if (send.to.length !== 64) {
      return false;
    } else if (Number(send.amount) <= 0 || isNaN(Number(send.amount))) {
      return false;
    } else if (send.amount >= AccountIdentifier.icpToE8s(user_icp)) {
      return false;
    }
    return true;
  };

  const sendICP = async () => {
    let amounticp = AccountIdentifier.icpToE8s(Amount);
    let send = {
      to: To,
      amount: amounticp,
    };

    if (!checkAddress(send))
      return FailedToast("Transfer failed", "Invalid input");

    try {
      closePop();
      SendingToast("Sending ICP...");
      await anvilDispatch(user_transfer_icp(send));
      toast.closeAll();
      return SuccessICPToast(AccountIdentifier.e8sToIcp(send.amount), send.to);
    } catch (e) {
      return FailedToast("Transfer failed", e.toString());
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={closePop} isCentered>
      <ModalOverlay />
      <ModalContent bg="#141414" color="#fff" mx="10%">
        <ModalHeader
          as="kbd"
          bgGradient="linear(to-l, #ed1f79, #2dade2)"
          bgClip="text"
        >
          ICP:{" "}
          <Tooltip label="ICP Balance">
            <Text
              as="kbd"
              bgGradient="linear(to-r, #ed1f79, #f15b25)"
              bgClip="text"
            >
              {user_icp}
            </Text>
          </Tooltip>
          <FormControl>
            <FormHelperText>
              + 0.0001 ICP in transfer fees paid to IC
            </FormHelperText>
          </FormControl>
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>To Address</FormLabel>
            <Tooltip label="ICP Address (NOT PRINCIPAL ID)">
              <Input
                placeholder="8bc2fb98c39618....."
                onChange={(event) => setTo(event.target.value)}
              />
            </Tooltip>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Amount</FormLabel>
            <InputGroup>
              <Input
                value={Amount.toString().substring(0, 8)}
                onChange={(event) => setAmount(event.target.value)}
              />
              <InputRightElement width="4.5rem">
                <Button
                  _hover={{ opacity: "0.8" }}
                  colorScheme="#282828"
                  bg="#282828"
                  h="1.75rem"
                  size="sm"
                  onClick={() => {
                    if (user_icp > 0) setAmount(user_icp - 0.0001);
                  }}
                >
                  Max
                </Button>
              </InputRightElement>
            </InputGroup>
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
            onClick={() => sendICP()}
          >
            Transfer ICP
          </Button>
          <Button
            colorScheme="black"
            color="#f0e6d3"
            variant="outline"
            _hover={{ opacity: "0.8" }}
            onClick={closePop}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendingIcp;
