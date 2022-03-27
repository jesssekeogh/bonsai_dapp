import React, { useContext, useState, useEffect } from "react";
import { CgInfinity } from "react-icons/cg";
import { MdHowToVote } from "react-icons/md";
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
} from "@chakra-ui/react";
import { CopyIcon, LockIcon, HamburgerIcon, EditIcon } from "@chakra-ui/icons";

// user context from auth
import { UserContext } from "../../Context.jsx";

const MenuLinks = () => (
  <>
    <NavLink
      className={(navData) => (navData.isActive ? "nav-active" : "")}
      to="/stories"
    >
      <p>STORIES</p>
    </NavLink>
    <NavLink
      to="/NFT"
      className={(navData) => (navData.isActive ? "nav-active" : "")}
    >
      <p>NFT</p>
    </NavLink>
    <NavLink
      to="/Create"
      className={(navData) => (navData.isActive ? "nav-active" : "")}
    >
      <p>CREATE</p>
    </NavLink>
  </>
);

const NavBar = () => {
  // context for the user profile
  const { principal, signOut, signActor } = useContext(UserContext);
  const { hasCopied, onCopy } = useClipboard(principal);

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
          <Menu>
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
              <Tooltip label="Your unique ID">
                <MenuGroup title="Principal ID" />
              </Tooltip>
              <MenuItem onClick={onCopy} icon={<CopyIcon />} maxW="240px">
                {hasCopied
                  ? "Copied to clipboard!"
                  : principal.substring(0, 20) + "..."}
              </MenuItem>
              <MenuDivider />
              <Tooltip label="Your recent vote selection">
                <MenuGroup title="Bonsai Warriors Vote History" />
              </Tooltip>
              <NavLink to="/stories/bonsai-warriors-prologueIII">
                <MenuItem
                  icon={<MdHowToVote />}
                  command={recentvoteIII}
                >
                  Prologue III:
                </MenuItem>
              </NavLink>
              <NavLink to="/stories/bonsai-warriors-prologueII">
                <MenuItem
                  icon={<MdHowToVote />}
                  command={recentvoteII}
                >
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
