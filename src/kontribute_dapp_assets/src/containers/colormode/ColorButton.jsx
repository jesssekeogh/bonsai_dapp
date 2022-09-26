import React from "react";
import { useColorMode, Button } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorButton = ({ size }) => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Button size={size} mx={2} onClick={() => toggleColorMode()}>
      {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ColorButton;
