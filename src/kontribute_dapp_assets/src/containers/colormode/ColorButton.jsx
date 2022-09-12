import React from "react";
import { useColorMode, Button, Tooltip } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

const ColorButton = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label={colorMode === "dark" ? "Light mode" : "Dark mode"}>
      <Button size="sm" mx={2} onClick={() => toggleColorMode()}>
        {colorMode === "dark" ? <SunIcon /> : <MoonIcon />}
      </Button>
    </Tooltip>
  );
};

export default ColorButton;
