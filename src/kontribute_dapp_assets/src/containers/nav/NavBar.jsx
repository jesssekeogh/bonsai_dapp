import React from "react";
import { FaBook, FaRocket, FaShoppingCart } from "react-icons/fa";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/kontribute_logo.png";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  MenuGroup,
  IconButton,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Profile from "./Profile";
import { useSelector } from "react-redux";

const MenuLinks = ({ currentMarketplace }) => (
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
    <NavLink
      to={"/marketplace/" + currentMarketplace}
      className={(navData) => (navData.isActive ? "nav-active" : "")}
    >
      <p>Marketplace</p>
    </NavLink>
  </>
);

const NavBar = () => {
  const currentMarketplace = useSelector((state) => state.Global.currentMarketplace)

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
            <MenuLinks currentMarketplace={currentMarketplace} />
          </div>
        </div>

        {/* the profile button */}
        <div className="bonsai__navbar-sign">
          <Profile />
          <MobileMenu currentMarketplace={currentMarketplace} />
        </div>
      </div>
    </div>
  );
};

export default NavBar;

const MobileMenu = ({ currentMarketplace }) => {
  return (
    <div className="bonsai__link-dropdown">
      <Menu>
        <MenuButton
          ms="2"
          as={IconButton}
          bg="#17191e"
          size={useBreakpointValue(["sm", "md"])}
          border="1px"
          borderColor="#9d8144"
          color="#f0e6d3"
          colorScheme="#17191e"
          icon={<HamburgerIcon />}
        ></MenuButton>
        <MenuList>
          <MenuGroup title="Kontribute" />
          <NavLink to="/stories">
            <MenuItem icon={<FaBook />}>Stories</MenuItem>
          </NavLink>
          <NavLink to="/launchpad">
            <MenuItem icon={<FaRocket />}>Launchpad</MenuItem>
          </NavLink>
          <NavLink to={"/marketplace/" + currentMarketplace}>
            <MenuItem icon={<FaShoppingCart />}>Marketplace</MenuItem>
          </NavLink>
        </MenuList>
      </Menu>
    </div>
  );
};
