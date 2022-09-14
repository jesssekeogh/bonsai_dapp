import React from "react";
import { FaBook, FaShoppingCart } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import logo from "../../../assets/kontribute_logo.png";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  useBreakpointValue,
  Box,
  Spacer,
  Flex,
  HStack,
  IconButton,
  Image as ChakraImage,
  Text,
  useColorMode,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon, HamburgerIcon } from "@chakra-ui/icons";
import Profile from "./Profile";
import ColorButton from "../colormode/ColorButton";

const LinkItems = [
  { name: "Stories", link: "/stories" },
  {
    name: "Marketplace",
    link: "/marketplace/a006b7308ff262c78c50b3a20059229d30b818034a9f5186eec8e93a1dc15f77",
  },
];

const NavItem = ({ link, name }) => {
  return (
    <NavLink to={link}>
      {({ isActive }) => (
          <Box
            borderBottom="3px solid"
            borderColor={isActive ? "#12bdde" : "transparent"}
            pb={0.5}
          >
            <Flex
              align="center"
              py="2"
              px="3"
              m="1"
              borderRadius="md"
              role="group"
              cursor="pointer"
              fontWeight={600}
              _hover={{
                bg: "#282828",
              }}
              color="white"
              bg={isActive ? "#282828" : null}
              borderColor="#12bdde"
            >
              {name}
            </Flex>
          </Box>
      )}
    </NavLink>
  );
};

const NavBar = () => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box h="4rem">
      <Box
        as="section"
        pt="0.6rem"
        pb={"0.5rem"}
        px={isDesktop ? "4rem" : "1rem"}
        boxShadow="2xl"
        position="fixed"
        width="100%"
        top="0"
        zIndex="2"
        bg={"#111111"}
        borderBottom=" 3px double"
        borderColor="#1a1a1a"
      >
        {isDesktop ? (
          <Flex align="center">
            <NavLink to={"/"}>
              <Flex align="center" me={5}>
                <ChakraImage h={30} src={logo} />
                <Text fontSize={20} as="samp" color="white">
                  ontribute
                </Text>
              </Flex>
            </NavLink>
            <HStack fontWeight={700} fontSize={16}>
              {LinkItems.map((link) => (
                <NavItem key={link.name} name={link.name} link={link.link} />
              ))}
            </HStack>
            <Spacer />
            <Profile />
            <ColorButton />
          </Flex>
        ) : (
          <Flex align="center">
            <NavLink to={"/"}>
              <Flex align="center" me={5}>
                <ChakraImage h={25} src={logo} />
                <Text fontSize={20} as="samp" color="white">
                  ontribute
                </Text>
              </Flex>
            </NavLink>
            <Spacer />
            <Profile />
            <MobileMenu />
          </Flex>
        )}
      </Box>
    </Box>
  );
};

export default NavBar;

const MobileMenu = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="bonsai__link-dropdown">
      <Menu>
        <MenuButton
          ms="2"
          as={IconButton}
          icon={<HamburgerIcon />}
        ></MenuButton>
        <MenuList>
          <NavLink to="/stories">
            <MenuItem icon={<FaBook />}>Stories</MenuItem>
          </NavLink>
          <NavLink
            to={
              "/marketplace/a006b7308ff262c78c50b3a20059229d30b818034a9f5186eec8e93a1dc15f77"
            }
          >
            <MenuItem icon={<FaShoppingCart />}>Marketplace</MenuItem>
          </NavLink>
          <MenuItem
            icon={colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
            onClick={() => toggleColorMode()}
          >
            Appearance
          </MenuItem>
        </MenuList>
      </Menu>
    </div>
  );
};
