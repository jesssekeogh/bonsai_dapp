import React, { useContext, useState, useEffect } from "react";
import { CgInfinity } from "react-icons/cg";
import { MdHowToVote } from "react-icons/md";
import { FaBook, FaImages } from "react-icons/fa";
import "./NavBar.css";
import { Link } from "react-router-dom";
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
import { CopyIcon, LockIcon, HamburgerIcon } from "@chakra-ui/icons";

// user context from auth
import { UserContext } from "../../Context.jsx";

const MenuLinks = () => (
  <>
    <Link to="/stories">
      <p>STORIES</p>
    </Link>
    <Link to="/NFT">
      <p>NFT</p>
    </Link>
    {/* <Link to="/Create">
      <p>CREATE</p>
    </Link> */}
  </>
);

const NavBar = () => {
  // context for the user profile
  const { principal, signOut, signActor } = useContext(UserContext);
  const { hasCopied, onCopy } = useClipboard(principal);

  // for loading spinner while fetching vote
  const [isReady, setReady] = useState(false);

  // for the recent votes in the Profile
  const [recentvoteII, setrecentvoteII] = useState("");

  const readVotesII = async () => {
    const user = await signActor();
    const result = await user.readVotesII();
    if (result.whichOption.toString() === "vote1") {
      setReady(true);
      setrecentvoteII("Option 1");
    } else if (result.whichOption.toString() === "vote2") {
      setReady(true);
      setrecentvoteII("Option 2");
    } else if (result.whichOption.toString() === "vote3") {
      setReady(true);
      setrecentvoteII("Option 3");
    } else {
      setReady(true);
      setrecentvoteII("No Vote");
    }
  };

  useEffect(() => {
    readVotesII();
  }, []);

  return (
    <div className="nav-container">
      <div className="bonsai__navbar">
        <div className="bonsai__navbar-links">
          <div className="bonsai__navbar-links_logo">
            <Link to="/">
              <img src={logo} alt="Kontribute" />
            </Link>
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
                {hasCopied ? "Copied to clipboard!" : principal.substring(0, 20) + "..."}
              </MenuItem>
              <MenuDivider />
              <Tooltip label="Your recent vote selection">
                <MenuGroup title="Bonsai Warriors Vote History" />
              </Tooltip>
              <Link to="/bonsai-warriors-prologueII">
                <MenuItem
                  icon={<MdHowToVote />}
                  command={isReady ? recentvoteII : <Spinner size="xs" />}
                >
                  Prologue II:
                </MenuItem>
              </Link>
              <Link to="/bonsai-warriors-prologue">
                <MenuItem icon={<MdHowToVote />} command="Unavailable">
                  Prologue:
                </MenuItem>
              </Link>
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
                <Link to="/stories">
                  <MenuItem icon={<FaBook />}>Stories</MenuItem>
                </Link>
                <Link to="/nft">
                  <MenuItem icon={<FaImages />}>NFT</MenuItem>
                </Link>
                {/* <Link to="/create">
                  <MenuItem icon={<EditIcon />}>Create</MenuItem>
                </Link> */}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
