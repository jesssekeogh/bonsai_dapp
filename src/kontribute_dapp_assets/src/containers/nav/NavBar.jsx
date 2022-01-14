import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { CgInfinity } from 'react-icons/cg';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo  from './kontribute_logo.png';
import { Button } from '@chakra-ui/react';

const Menu = () => (
    <>
    <Link to="/">
    <p>Kontribute</p>
    </Link>
    </>
)
const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="bonsai__navbar">
      <div className="bonsai__navbar-links">
        <div className="bonsai__navbar-links_logo">
          <Link to="/">
          <img src={logo} alt="Kontribute"/>
          </Link>
        </div>
        <div className="bonsai__navbar-links_container">
            <Menu />
        </div>
      </div>

      <div className="bonsai__navbar-sign">
        <Button rightIcon={<CgInfinity />} colorScheme="#0a0a0d">
          Authenticate
        </Button>
      </div>
      <div className="bonsai__navbar-menu">
        {toggleMenu
          ? <RiCloseLine color="#fff" size={27} onClick={() => setToggleMenu(false)} />
          : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
        <div className="bonsai__navbar-menu_container scale-up-center">
          <div className="bonsai__navbar-menu_container-links">
            <Menu />
          </div>
          <div className="bonsai__navbar-menu_container-links-sign">
          <Button rightIcon={<CgInfinity />} colorScheme="#0a0a0d">
            Authenticate
          </Button>
          </div>
        </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
