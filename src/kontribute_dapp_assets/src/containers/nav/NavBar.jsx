import React, { useContext } from "react";
import { CgInfinity } from "react-icons/cg";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/kontribute_logo.png";
import motokologo from '../../..//assets/Motoko_logo_mark_-_black.png'

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
  Image
} from "@chakra-ui/react";
import {
  CopyIcon,
  LockIcon,
  HamburgerIcon,
  ExternalLinkIcon,
  NotAllowedIcon,
} from "@chakra-ui/icons";

// user context from auth
import { UserContext } from "../../Context.jsx";

const NavBar = () => {
  // context for the user profile
  const { principal, signOut } = useContext(UserContext);
  const { hasCopied, onCopy } = useClipboard(principal);

  return (
    <div className="bonsai__navbar">
      <div className="bonsai__navbar-links_logo">
        <Link to="/">
          <img src={logo} alt="Kontribute" />
        </Link>
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
            <MenuGroup title="Principal ID" />
            <MenuDivider />
            <MenuItem onClick={onCopy} icon={<CopyIcon />} maxW="200px">
              {hasCopied ? alert("Copied to clipboard!") : principal}
            </MenuItem>
            <MenuDivider />
            <MenuItem icon={<LockIcon />} onClick={signOut}>
              Sign Out
            </MenuItem>
          </MenuList>
        </Menu>
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
          <MenuGroup title="Links" />
          <MenuDivider />
            <a
              href="https://discord.gg/S3qRpq8R6e"
              target="_blank"
              rel="noreferrer"
            >
              <MenuItem icon={<ExternalLinkIcon />}>Discord</MenuItem>
            </a>
            <a
              href="https://mobile.twitter.com/TeamBonsai_ICP"
              target="_blank"
              rel="noreferrer"
            >
              <MenuItem icon={<ExternalLinkIcon />}>Twitter</MenuItem>
            </a>
            <a
              href="https://h5aet-waaaa-aaaab-qaamq-cai.raw.ic0.app/p/bonsai-warriors"
              target="_blank"
              rel="noreferrer"
            >
              <MenuItem icon={<ExternalLinkIcon />}>DSCVR</MenuItem>
            </a>
            <a
              href="https://github.com/jesssekeogh/bonsai_dapp"
              target="_blank"
              rel="noreferrer"
            >
              <MenuItem icon={<ExternalLinkIcon />} command={<Image src={motokologo} h='7' w='7'/>}>Source Code</MenuItem>
            </a>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
