import React, { useContext } from 'react';
import { CgInfinity } from 'react-icons/cg';
import './NavBar.css';
import { Link } from 'react-router-dom';
import logo  from '../../../assets/kontribute_logo.png';

import { Button, Menu, MenuList, MenuItem, MenuButton, MenuGroup, MenuDivider, useClipboard } from '@chakra-ui/react';
import {CopyIcon, LockIcon} from '@chakra-ui/icons';

// user context from auth
import {UserContext} from '../../Context.jsx';

const NavBar = () => {

  // context for the user profile
  const { principal, signOut } = useContext(UserContext)
  const { hasCopied, onCopy } = useClipboard(principal)

  return (
    <div className="bonsai__navbar">
        <div className="bonsai__navbar-links_logo">
          <Link to="/">
          <img src={logo} alt="Kontribute"/>
          </Link>
        </div>
        
        {/* the profile button */}
        <div className="bonsai__navbar-sign">
        <Menu>
          <MenuButton as={Button} bg='#17191e' border='1px' borderColor='#9d8144' color='white' colorScheme='#17191e' rightIcon={<CgInfinity />}>
            Profile
          </MenuButton>
          <MenuList>
            <MenuGroup title='Principal ID' />
              <MenuDivider />
              <MenuItem onClick={onCopy} icon={<CopyIcon />} maxW='200px'>{hasCopied ? alert('Copied to clipboard!') : principal}</MenuItem>
              <MenuDivider />
            <MenuItem icon={<LockIcon />}onClick={signOut}>Sign Out</MenuItem>
          </MenuList>
        </Menu>
      </div>
    </div>
  );
};

export default NavBar;
