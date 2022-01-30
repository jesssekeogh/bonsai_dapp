import React, { useContext } from 'react';
import { CgInfinity } from 'react-icons/cg';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo  from './kontribute_logo.png';
import { Button, Menu, MenuList, MenuItem, MenuButton, MenuGroup, MenuDivider } from '@chakra-ui/react';

// user context from auth
import {UserContext} from '../../Context.jsx';

const NavBar = () => {

    // context for the user profile
    const { principal, signOut } = useContext(UserContext)

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
            <MenuItem maxW='200px'><p>{principal}</p></MenuItem>
            <MenuDivider />
          <MenuItem onClick={signOut}>Sign Out</MenuItem>
          </MenuGroup>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
