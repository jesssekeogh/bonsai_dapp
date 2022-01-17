import React, { useState } from 'react';
import { CgInfinity } from 'react-icons/cg';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo  from './kontribute_logo.png';
import { Button, Menu, MenuList, MenuItem, MenuButton, MenuGroup, MenuDivider } from '@chakra-ui/react';

const NavBar = props => {

  return (
    <div className="bonsai__navbar">
        <div className="bonsai__navbar-links_logo">
          <Link to="/">
          <img src={logo} alt="Kontribute"/>
          </Link>
        </div>
        
        <div className="bonsai__navbar-sign">
        <Menu>
          <MenuButton as={Button} bg='#17191e' border='1px' borderColor='#9d8144' color='white' colorScheme='#17191e' rightIcon={<CgInfinity />}>
            Profile
          </MenuButton>
          <MenuList>
          <MenuGroup title='Principal ID'>
            <MenuItem maxW='200px'><p>{props.userId}</p></MenuItem>
            <MenuDivider />
          <MenuItem onClick={props.signOutFunc}>Sign Out</MenuItem>
          </MenuGroup>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
