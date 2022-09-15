import React, { useState } from "react";
import {
  useColorModeValue,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
} from "@chakra-ui/react";

export const RarityFilter = ({ setSort }) => {
  const [currentSort, setCurrentSort] = useState("All");
  const color = useColorModeValue("#e5e8eb", "#1a1a1a");

  const getNumFromRarity = (rarity) => {
    switch (rarity) {
      case "Common":
        setCurrentSort("Common");
        return setSort(1);
      case "Uncommon":
        setCurrentSort("Uncommon");
        return setSort(2);
      case "Rare":
        setCurrentSort("Rare");
        return setSort(3);
      case "Epic":
        setCurrentSort("Epic");
        return setSort(4);
      case "Legendary":
        setCurrentSort("Legendary");
        return setSort(5);
      case "Artifact":
        setCurrentSort("Artifact");
        return setSort(6);
      case "All":
        setCurrentSort("All");
        return setSort("0");
    }
  };

  return (
    <Menu>
      <MenuButton
        me={2}
        as={Button}
        boxShadow="base"
        border={"2px"}
        borderColor={color}
      >
        Rarity: {currentSort}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="All" title="Rarity">
          <MenuItemOption value={"All"} onClick={() => getNumFromRarity("All")}>
            All
          </MenuItemOption>
          <MenuItemOption
            value={"Common"}
            onClick={() => getNumFromRarity("Common")}
          >
            Common
          </MenuItemOption>
          <MenuItemOption
            value={"Uncommon"}
            onClick={() => getNumFromRarity("Uncommon")}
          >
            Uncommon
          </MenuItemOption>
          <MenuItemOption
            value={"Rare"}
            onClick={() => getNumFromRarity("Rare")}
          >
            Rare
          </MenuItemOption>
          <MenuItemOption
            value={"Epic"}
            onClick={() => getNumFromRarity("Epic")}
          >
            Epic
          </MenuItemOption>
          <MenuItemOption
            value={"Legendary"}
            onClick={() => getNumFromRarity("Legendary")}
          >
            Legendary
          </MenuItemOption>
          <MenuItemOption
            value={"Artifact"}
            onClick={() => getNumFromRarity("Artifact")}
          >
            Artifact
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};

export const LtoH = ({ pricing, setPricing, setPage }) => {
  const color = useColorModeValue("#e5e8eb", "#1a1a1a");
  return (
    <Menu>
      <MenuButton
        as={Button}
        boxShadow="base"
        border={"2px"}
        borderColor={color}
      >
        Price: {pricing}
      </MenuButton>
      <MenuList minWidth="240px">
        <MenuOptionGroup defaultValue="Low to High" title="Price">
          <MenuItemOption
            value={"Low to High"}
            onClick={() => {
              setPage(0);
              setPricing("Low to High");
            }}
          >
            Low to High
          </MenuItemOption>
          <MenuItemOption
            value={"High to Low"}
            onClick={() => {
              setPage(0);
              setPricing("High to Low");
            }}
          >
            High to Low
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
};
