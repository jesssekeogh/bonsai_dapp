import React, { useEffect, useState } from "react";
import { Usergeek } from "usergeek-ic-js";
import { AuthClient } from "@dfinity/auth-client";
import IcLogo from "../../../assets/ic-logo.png";
import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuGroup,
  MenuDivider,
  Tooltip,
  MenuItem,
  useClipboard,
  useDisclosure,
  Flex,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { CopyIcon, LockIcon } from "@chakra-ui/icons";
import { RiSendPlaneFill, RiPencilFill } from "react-icons/ri";
import { IoIosImages } from "react-icons/io";
import { CopyToast } from "../toasts/Toasts";
import { useDispatch, useSelector } from "react-redux";
import {
  useAnvilSelector,
  useAnvilDispatch,
  user_login,
} from "@vvv-interactive/nftanvil-react";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { setLogin, setLogout, setPrincipal } from "../../state/LoginSlice";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import SendingIcp from "./SendingIcp";

const Profile = () => {
  const [client, setClient] = useState();
  const dispatch = useDispatch();
  const anvilDispatch = useAnvilDispatch();
  const navigate = useNavigate();

  const loggedIn = useSelector((state) => state.Profile.loggedIn);
  const userId = useSelector((state) => state.Profile.principal);
  const address = useAnvilSelector((state) => state.user.address);
  const user_icp = e8sToIcp(useAnvilSelector((state) => state.user.icp));

  const { onCopy } = useClipboard(address);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const SignInFunctions = async (principal, identity) => {
    dispatch(setLogin());
    anvilDispatch(user_login());
    dispatch(setPrincipal(principal.toString()));
    Usergeek.setPrincipal(principal);
    Usergeek.trackSession();
    Usergeek.trackEvent("UserSignIn");
  };

  const initAuth = async () => {
    Usergeek.init({
      apiKey: "01B802010D2B6BF49CA5C24532F2D7DB",
    });

    const client = await AuthClient.create();

    const isAuthenticated = await client.isAuthenticated();

    setClient(client);

    if (isAuthenticated) {
      const identity = client.getIdentity();
      const principal = identity.getPrincipal();
      SignInFunctions(principal);
    }
  };

  const signIn = async () => {
    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "https://identity.ic0.app", //"http://rno2w-sqaaa-aaaaa-aaacq-cai.localhost:8000/",
        onSuccess: () => {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal();
          resolve({ identity, principal });
        },
        onError: reject,
        windowOpenerFeatures:
          `left=${window.screen.width / 2 - 525 / 2}, ` +
          `top=${window.screen.height / 2 - 705 / 2},` +
          `toolbar=0,location=0,menubar=0,width=525,height=705`,
      });
    });
    await SignInFunctions(principal);
  };

  const signOut = async () => {
    await client.logout();
    dispatch(setLogout());
    dispatch(setPrincipal(""));
    Usergeek.setPrincipal(undefined);
    navigate("/");
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <>
      {loggedIn ? (
        <Menu closeOnSelect={false} autoSelect={false}>
          <MenuButton as={Button} size={"md"}>
            <Flex align="center">
              {user_icp}
              &nbsp;
              <ChakraImage src={IcLogo} h={"20px"} w={"auto"} />
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuGroup title={"ICP Wallet"} />
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
              <SendingIcp
                onClose={onClose}
                isOpen={isOpen}
                user_icp={user_icp}
              />
            </MenuItem>
            <NavLink to="/inventory">
              <MenuItem closeOnSelect icon={<IoIosImages />}>
                Collectibles
              </MenuItem>
            </NavLink>
            <NavLink to={"/stories/create"}>
              <MenuItem closeOnSelect icon={<RiPencilFill />} maxW="240px">
                Create
              </MenuItem>
            </NavLink>
            <MenuDivider />
            <MenuItem icon={<LockIcon />} onClick={() => signOut()}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Menu>
          <MenuButton as={Button} size={"md"} onClick={() => signIn()}>
            <Flex align="center">
              Log In&nbsp;
              <ChakraImage src={IcLogo} h={"20px"} w={"auto"} />
            </Flex>
          </MenuButton>
        </Menu>
      )}
    </>
  );
};

export default Profile;
