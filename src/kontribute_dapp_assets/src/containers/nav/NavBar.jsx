import React, { useContext, useState, useEffect } from "react";
import IcLogo from "../../../assets/ic-logo.png";
import { MdPerson } from "react-icons/md";
import { FaBook, FaRocket } from "react-icons/fa";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosImages } from "react-icons/io";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/kontribute_logo.png";
import {
  Button,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuGroup,
  MenuDivider,
  useClipboard,
  IconButton,
  createStandaloneToast,
  Tooltip,
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
  Text,
  FormControl,
  FormHelperText,
  Flex,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import { CopyIcon, LockIcon, HamburgerIcon } from "@chakra-ui/icons";
import { UserContext } from "../../Context.jsx";
// Anvil tools:
import {
  useAnvilSelector,
  useAnvilDispatch,
  user_login,
  user_transfer_icp,
} from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  CopyToast,
  SendingToast,
  FailedToast,
  SuccessICPToast,
} from "../toasts/Toasts";

const MenuLinks = () => (
  <>
    <NavLink
      className={(navData) => (navData.isActive ? "nav-active" : "")}
      to="/stories"
    >
      <p>Stories</p>
    </NavLink>
    <NavLink
      to="/launchpad"
      className={(navData) => (navData.isActive ? "nav-active" : "")}
    >
      <p>Launchpad</p>
    </NavLink>
  </>
);

const toast = createStandaloneToast();

const NavBar = () => {
  // context for the user profile
  const { principal, signOut, signActor } = useContext(UserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  // NFT anvil tools
  const dispatch = useAnvilDispatch(); // anvil dispatch to initate login
  const address = useAnvilSelector((state) => state.user.address); // Retrieve NFT Anvil ICP address
  const user_icp = AccountIdentifier.e8sToIcp(
    useAnvilSelector((state) => state.user.icp) // Retrieve NFT Anvil Address ICP Balance
  );

  const { hasCopied, onCopy } = useClipboard(address);

  const [To, setTo] = useState("");
  const [Amount, setAmount] = useState(0);

  //  1 icp= 100000000 e8s
  // 0.1icp= 010000000 e8s

  const sendICP = async () => {
    let amounticp = AccountIdentifier.icpToE8s(Amount);
    let send = {
      to: To,
      amount: amounticp,
    };

    if (send.to.length !== 64) {
      return FailedToast("Transfer failed", "Invalid ICP address"); // verbose errors for the user
    } else if (Amount == 0 || isNaN(Amount)) {
      return FailedToast("Transfer failed","Invalid amount");
    } else if (Amount >= user_icp) {
      return FailedToast("Transfer failed","Insufficient funds");
    } else {
      onClose();
      SendingToast("Sending ICP...");
      await dispatch(user_transfer_icp(send));
      toast.closeAll();
      SuccessICPToast(Amount, To);
    }
  };

  useEffect(() => {
    dispatch(user_login());
  }, []);

  return (
    <div className="nav-container">
      <div className="bonsai__navbar">
        <div className="bonsai__navbar-links">
          <div className="bonsai__navbar-links_logo">
            <NavLink to="/">
              <img src={logo} alt="Kontribute" />
            </NavLink>
          </div>

          <div className="bonsai__navbar-links_container">
            <MenuLinks />
          </div>
        </div>

        {/* the profile button */}
        <div className="bonsai__navbar-sign">
          <Menu closeOnSelect={false} autoSelect={false}>
            <MenuButton
              as={Button}
              bg="#17191e"
              border="1px"
              borderColor="#9d8144"
              color="#f0e6d3"
              colorScheme="#17191e"
            >
              <Flex align="center">
                Profile&nbsp;
                <ChakraImage src={IcLogo} h={"20px"} w={"auto"} />
              </Flex>
            </MenuButton>
            <MenuList>
              <MenuGroup title="User Profile" />
              <Tooltip label="Your unique profile ID">
                <MenuItem icon={<MdPerson />} maxW="240px">
                  {principal.substring(0, 10) +
                    "......" +
                    principal.substring(54, 63)}
                </MenuItem>
              </Tooltip>
              <MenuDivider />
              <MenuGroup title="ICP Wallet" />
              <Tooltip label="Copy address">
                <MenuItem
                  closeOnSelect
                  onClick={() => {
                    onCopy(), CopyToast();
                  }}
                  icon={<CopyIcon />}
                  maxW="240px"
                >
                  {address
                    ? address.substring(0, 10) +
                      "......" +
                      address.substring(56, 64)
                    : null}
                </MenuItem>
              </Tooltip>
              <MenuItem
                icon={<RiSendPlaneFill />}
                command={user_icp}
                closeOnSelect
                onClick={onOpen}
              >
                Transfer ICP
              </MenuItem>
              <NavLink to="/inventory">
                <MenuItem closeOnSelect icon={<IoIosImages />}>
                  NFT Inventory
                </MenuItem>
              </NavLink>
              <MenuDivider />
              <MenuItem icon={<LockIcon />} onClick={signOut}>
                Sign Out
              </MenuItem>
            </MenuList>
          </Menu>
          <div className="bonsai__link-dropdown">
            <Menu>
              <MenuButton
                ms="2"
                as={IconButton}
                bg="#17191e"
                border="1px"
                borderColor="#9d8144"
                color="#f0e6d3"
                colorScheme="#17191e"
                icon={<HamburgerIcon />}
              ></MenuButton>
              <MenuList>
                {/* for mobile view */}
                <MenuGroup title="Kontribute" />
                <NavLink to="/stories">
                  <MenuItem icon={<FaBook />}>Stories</MenuItem>
                </NavLink>
                <NavLink to="/launchpad">
                  <MenuItem icon={<FaRocket />}>Launchpad</MenuItem>
                </NavLink>
                {/* <NavLink to="/marketplace">
                  <MenuItem icon={<GiShop />}>Marketplace</MenuItem>
                </NavLink> */}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
      {/* sending ICP UI */}
      <>
        <Modal isOpen={isOpen} onClose={onClose} isCentered>
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
                onClick={onClose}
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    </div>
  );
};

export default NavBar;
