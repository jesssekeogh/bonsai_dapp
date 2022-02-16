import React, { useContext, useState, useEffect } from "react";
import { CgInfinity } from "react-icons/cg";
import { MdHowToVote } from "react-icons/md";
import "./NavBar.css";
import { Link } from "react-router-dom";
import logo from "../../../assets/kontribute_logo.png";
import motokologo from "../../..//assets/Motoko_logo_mark_-_black.png";
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
  Image,
  Spinner,
} from "@chakra-ui/react";
import {
  CopyIcon,
  LockIcon,
  HamburgerIcon,
  ExternalLinkIcon,
} from "@chakra-ui/icons";

// user context from auth
import { UserContext } from "../../Context.jsx";

const NavBar = () => {
  // context for the user profile
  const { principal, signOut, signActor } = useContext(UserContext);
  const { hasCopied, onCopy } = useClipboard(principal);

  // for loading spinner while fetching vote
  const [isReady, setReady] = useState(false);

  // for the recent votes in the Profile
  const [recentvote, setrecentvote] = useState("");
  const readVotes = async () => {
    const user = await signActor();
    const result = await user.readVotes();

    if (result.WhichOption.toString() === "vote1") {
      setReady(true);
      setrecentvote("Option 1");
    } else if (result.WhichOption.toString() === "vote2") {
      setReady(true);
      setrecentvote("Option 2");
    } else if (result.WhichOption.toString() === "vote3") {
      setReady(true);
      setrecentvote("Option 3");
    } else {
      setReady(true);
      setrecentvote("No Vote");
    }
  };

  useEffect(() => {
    readVotes();
  }, []);

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
            <MenuItem onClick={onCopy} icon={<CopyIcon />} maxW="200px">
              {hasCopied ? alert("Copied to clipboard!") : principal}
            </MenuItem>
            <MenuDivider />
            <MenuGroup title="Recent Votes" />
            <Link to="/world-of-bonsai">
              <MenuItem
                icon={<MdHowToVote />}
                command={isReady ? recentvote : <Spinner size="xs" />}
              >
                Bonsai Warriors:
              </MenuItem>
            </Link>
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
              <MenuItem
                icon={<ExternalLinkIcon />}
                command={<Image src={motokologo} h="6" w="6" />}
              >
                Source Code
              </MenuItem>
            </a>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
