import React, { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  nft_burn,
  useAnvilDispatch,
  nft_fetch,
} from "@vvv-interactive/nftanvil-react";
import {
  tokenToText,
  tokenFromText,
  decodeTokenId,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { nftCanister } from "@vvv-interactive/nftanvil-canisters/cjs/nft.js";
import { PrincipalFromSlot } from "@vvv-interactive/nftanvil-tools/cjs/principal.js";
import {
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  createStandaloneToast,
  useDisclosure,
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
  FormControl,
} from "@chakra-ui/react";
import ViewNft from "./ViewNft.jsx";
import { ImPriceTag } from "react-icons/im";
import { AiFillFire } from "react-icons/ai";
import { FailedToast, SendingToast, SuccessToast } from "../../../containers/toasts/Toasts.jsx";

const toast = createStandaloneToast();

const InventoryNft = ({ tokenId }) => {
  const dispatch = useAnvilDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [Amount, setAmount] = useState(0);

  const Burn = async () => {
    let burned = await dispatch(nft_burn({ id: tokenToText(tokenId) }));
    console.log(burned);
    SuccessToast("NFT burned successfully!")
  };

  // set to Kontribute
  // let price = {
  //   amount: AccountIdentifier.icpToE8s(Amount),
  //   marketplace: [
  //     {
  //       address: AccountIdentifier.TextToArray(
  //         "a001c89f603f36aa5cba0d7f5f6ca9be2298c9e5f8309e2155767752916ef418"
  //       ),
  //       share: 50,
  //     },
  //   ],
  // };

  const SetPrice =
    ({ id, price }) =>
    async (dispatch, getState) => {
      SendingToast("Setting Price...")
      console.log(price);
      onClose()

      let s = getState();
      if (!s.user.map.account?.length) return null;
      let address = s.user.address;

      let identity = authentication.client.getIdentity();
      let tid = tokenFromText(id);
      let { slot } = decodeTokenId(tid);

      console.log("Setting price", id, { slot });

      let canister = PrincipalFromSlot(s.user.map.space, slot).toText();

      let nftcan = nftCanister(canister, {
        agentOptions: authentication.getAgentOptions(),
      });

      let subaccount = [
        AccountIdentifier.TextToArray(s.user.subaccount) || null,
      ].filter(Boolean);

      let t = await nftcan.set_price({
        user: { address: AccountIdentifier.TextToArray(address) },
        token: tid,
        price: price,
        subaccount,
      });

      if (!("ok" in t)) {
        toast.closeAll()
        FailedToast("Setting Price Failed!")
        throw t.err;
      }

      toast.closeAll()
      dispatch(nft_fetch(id));
      SuccessToast("NFT Price Set Successfully!")
    };

  return (
    <>
      <Menu>
        <MenuButton
          size={"sm"}
          backgroundColor={"#1e212b"}
          as={IconButton}
          aria-label="Options"
          icon={<HamburgerIcon />}
          color="#fff"
          colorScheme="#1e212b"
          variant="outline"
          me={0}
          ms={-5}
        />
        <MenuList>
          <MenuItem closeOnSelect={false}>
            <ViewNft tokenId={tokenId} />
          </MenuItem>
          <MenuItem icon={<ImPriceTag />} onClick={onOpen}>
            Sell NFT
          </MenuItem>
          <MenuItem icon={<AiFillFire />} onClick={() => Burn()}>Burn NFT</MenuItem>
        </MenuList>
      </Menu>
      {/* modal for setting price */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="#141414" color="#fff" mx="10%">
          <ModalHeader
            as="kbd"
            bgGradient="linear(to-l, #ed1f79, #2dade2)"
            bgClip="text"
          >
            Set Price
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl mt={4}>
              <FormLabel>Amount</FormLabel>
              <Input
                placeholder="0.1"
                onChange={(event) => setAmount(event.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
              mr={3}
              _hover={{ opacity: "0.8" }}
              onClick={() =>
                dispatch(
                  SetPrice({
                    id: tokenToText(tokenId),
                    price: {
                      amount: AccountIdentifier.icpToE8s(Amount),
                      marketplace: [
                        {
                          address: AccountIdentifier.TextToArray(
                            "8bc2fb99c396187cf54ea081b9055ea64c8f613ad70baf55426116da84733801"
                          ),
                          share: 50,
                        },
                      ],
                    },
                  })
                )
              }
            >
              Set for Sale
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

export default InventoryNft;
