import React, { useState } from "react";
import {
  Select,
  FormControl,
  FormLabel,
  Box,
  Switch,
  useBreakpointValue,
  useColorModeValue,
  Tooltip,
  Box,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuickView } from "../../state/GlobalSlice";

// collection filters from tags:
const BonsaiWarriors = "Bonsai Warrior";
const BadbotNinja = "helmet";
const PendragonQuest = "Knight";

// inventory filter for quick filtering of collections
export const CollectionFilter = ({ setCollection }) => {
  return (
    <Select
      size="sm"
      border={"double"}
      borderRadius="lg"
      backgroundColor="#16171b"
      borderColor="#16171b"
      color="gray.400"
      my={2}
      fontSize={["7pt", null, "sm"]}
      onChange={(e) => {
        setCollection(e.target.value);
      }}
    >
      <option value={""}>All</option>
      <option value={BonsaiWarriors}>Bonsai Warriors</option>
      <option value={BadbotNinja}>Badbot Ninja</option>
      <option value={PendragonQuest}>Pendragon Quest</option>
    </Select>
  );
};

export const RarityFilter = ({ setSort }) => {
  const [currentSort, setCurrentSort] = useState("All");
  const color = useColorModeValue("#e5e8eb", "#1a1a1a")

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
  const color = useColorModeValue("#e5e8eb", "#1a1a1a")
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

// filter for showing a specefic collection from an author in the marketplace
export const AuthorFilter = () => {
  const badbotPrices =
    "a004f41ea1a46f5b7e9e9639fbed84e037d9ce66b75d392d2c1640bb7a559cda";
  const bonsaiPrices = process.env.KONTRIBUTE_ADDRESS;

  const navigate = useNavigate();

  return (
    <Select
      size="sm"
      border={"double"}
      borderRadius="lg"
      backgroundColor="#16171b"
      borderColor="#16171b"
      color="gray.400"
      my={2}
      fontSize={["7pt", null, "sm"]}
      onChange={(e) => {
        navigate("/marketplace/" + e.target.value);
      }}
    >
      <option value={process.env.MARKETPLACE_COLLECTION}>
        Latest Collection
      </option>
      <option value={badbotPrices}>Badbot Ninja</option>
      <option value={bonsaiPrices}>Bonsai Warriors</option>
    </Select>
  );
};

export const QuickView = () => {
  const quickView = useSelector((state) => state.Global.quickview);
  const dispatch = useDispatch();

  return (
    <Box>
      <Tooltip label={quickView ? "Show NFT images" : "Hide NFT images"}>
        <FormControl align="center" m={0} p={0}>
          <Switch
            size={useBreakpointValue(["sm", "md"])}
            isChecked={quickView}
            colorScheme="cyan"
            onChange={() => dispatch(setQuickView(!quickView))}
          />
          <FormLabel m={0} fontSize={["6pt", null, "sm"]} color={"gray.500"}>
            Quick view
          </FormLabel>
        </FormControl>
      </Tooltip>
    </Box>
  );
};
