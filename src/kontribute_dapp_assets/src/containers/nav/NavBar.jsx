import React, { useState } from 'react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { CgInfinity } from 'react-icons/cg';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo  from './kontribute_logo.png';
import { Button } from '@chakra-ui/react';

const NavBar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div className="bonsai__navbar">
        <div className="bonsai__navbar-links_logo">
          <Link to="/">
          <img src={logo} alt="Kontribute"/>
          </Link>
        </div>

      <div className="bonsai__navbar-sign">
        <Button rightIcon={<CgInfinity />} colorScheme="#0a0a0d">
          Authenticate
        </Button>
      </div>
    </div>
  );
};

export default NavBar;
