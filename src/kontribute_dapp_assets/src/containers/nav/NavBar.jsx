import React, { useContext, useState, useEffect } from "react";
import { CgInfinity } from "react-icons/cg";
import { MdHowToVote, MdPerson } from "react-icons/md";
import { FaBook, FaImages } from "react-icons/fa";
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
  Spinner,
  Tooltip,
  createStandaloneToast,
} from "@chakra-ui/react";
import { CopyIcon, LockIcon, HamburgerIcon, EditIcon } from "@chakra-ui/icons";
import { UserContext } from "../../Context.jsx";
// Anvil tools:
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

const toast = createStandaloneToast();
const CopyToast = () => {
  return toast({
    title: `Copied to clipboard!`,
    status: "info",
    isClosable: true,
    position: "top-right",
    duration: 1500,
    containerStyle: {
      marginTop: "5.5rem",
    },
  });
};
const MenuLinks = () => (
  <>
    <NavLink
      className={(navData) => (navData.isActive ? "nav-active" : "")}
      to="/stories"
    >
      <p>STORIES</p>
    </NavLink>
    <NavLink
      to="/nft"
      className={(navData) => (navData.isActive ? "nav-active" : "")}
    >
      <p>NFT</p>
    </NavLink>
    <NavLink
      to="/create"
      className={(navData) => (navData.isActive ? "nav-active" : "")}
    >
      <p>CREATE</p>
    </NavLink>
    {/* for anvil test */}
    <NavLink
      to="/anvil"
      className={(navData) => (navData.isActive ? "nav-active" : "")}
    >
      <p>ANVIL</p>
    </NavLink>
  </>
);

const NavBar = () => {
  // context for the user profile
  const { principal, signOut, signActor } = useContext(UserContext);

  // NFT anvil tools
  const address = useAnvilSelector((state) => state.user.address); // Retrieve NFT Anvil ICP address
  const icp = AccountIdentifier.e8sToIcp( // Retrieve NFT Anvil Address ICP Balance
    useAnvilSelector((state) => state.user.icp)
  );

  const { hasCopied, onCopy } = useClipboard(address);
  // for the recent votes in the Profile
  const [recentvoteII, setrecentvoteII] = useState(<Spinner size="xs" />);
  const [recentvoteIII, setrecentvoteIII] = useState(<Spinner size="xs" />);

  const readVotesII = async () => {
    const user = await signActor();
    const result = await user.getVotesII();
    if (result.userOption.whichOption.toString() === "vote1") {
      setrecentvoteII("Option 1");
    } else if (result.userOption.whichOption.toString() === "vote2") {
      setrecentvoteII("Option 2");
    } else if (result.userOption.whichOption.toString() === "vote3") {
      setrecentvoteII("Option 3");
    } else {
      setrecentvoteII("No Vote");
    }
  };

  const readVotesIII = async () => {
    const user = await signActor();
    const result = await user.getVotesIII();
    if (result.userOption.whichOption.toString() === "vote1") {
      setrecentvoteIII("Option 1");
    } else if (result.userOption.whichOption.toString() === "vote2") {
      setrecentvoteIII("Option 2");
    } else if (result.userOption.whichOption.toString() === "vote3") {
      setrecentvoteIII("Option 3");
    } else {
      setrecentvoteIII("No Vote");
    }
  };

  useEffect(() => {
    readVotesII();
    readVotesIII();
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
              rightIcon={<CgInfinity />}
            >
              Profile
            </MenuButton>
            <MenuList>
              <MenuGroup title="User Profile" />
              <Tooltip label="Your unique profile ID">
                <MenuItem icon={<MdPerson />} maxW="240px">
                  {principal.substring(0, 20) + "..."}
                </MenuItem>
              </Tooltip>
              <MenuDivider />
              <MenuGroup title="ICP Address" />
              <Tooltip label="Send ICP to this address">
                <MenuItem
                  closeOnSelect
                  onClick={() => {
                    onCopy(), CopyToast();
                  }}
                  icon={<CopyIcon />}
                  maxW="240px"
                >
                  {address ? address.substring(0, 20) + "..." : null}
                </MenuItem>
              </Tooltip>
              <MenuItem command={icp}>Send ICP</MenuItem>
              <MenuDivider />
              <Tooltip label="Your recent vote selection">
                <MenuGroup title="Bonsai Warriors Vote History" />
              </Tooltip>
              <NavLink to="/stories/bonsai-warriors-prologueIII">
                <MenuItem icon={<MdHowToVote />} command={recentvoteIII}>
                  Prologue III:
                </MenuItem>
              </NavLink>
              <NavLink to="/stories/bonsai-warriors-prologueII">
                <MenuItem icon={<MdHowToVote />} command={recentvoteII}>
                  Prologue II:
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
                <NavLink to="/nft">
                  <MenuItem icon={<FaImages />}>NFT</MenuItem>
                </NavLink>
                <NavLink to="/create">
                  <MenuItem icon={<EditIcon />}>Create</MenuItem>
                </NavLink>
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
