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
  useColorModeValue,
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
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../colormode/Colors";

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

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <Modal isOpen={isOpen} onClose={closePop} isCentered>
      <ModalOverlay />
      <ModalContent mx="10%">
        <ModalHeader>
          ICP: {user_icp}
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
            <FormHelperText>
              + 0.0001 ICP in transfer fees paid to IC
            </FormHelperText>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            bg={buttonBgColor}
            color={buttonTextColor}
            rightIcon={<RiSendPlaneFill />}
            w={"full"}
            _hover={{ opacity: "0.8" }}
            onClick={() => sendICP()}
          >
            Transfer ICP
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default SendingIcp;
