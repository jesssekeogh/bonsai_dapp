import React from "react";
import {
  Select,
  FormControl,
  FormLabel,
  Box,
  Switch,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setQuickView } from "../../state/GlobalSlice";

// collection filters from tags:
const BonsaiWarriors = "Bonsai Warrior";
const BadbotNinja = "helmet";

export const SellingFilter = ({ setSelling }) => {
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
        setSelling(e.target.value);
      }}
    >
      <option value={"all"}>All</option>
      <option value={"selling"}>Selling</option>
      <option value={"notselling"}>Not Selling</option>
    </Select>
  );
};

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
    </Select>
  );
};

export const RarityFilter = ({ setSort, setPage }) => {
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
        setSort(e.target.value);
        if (setPage) {
          setPage(0);
        }
      }}
    >
      <option value={0}>All</option>
      <option value={1}>Common</option>
      <option value={2}>Uncommon</option>
      <option value={3}>Rare</option>
      <option value={4}>Epic</option>
      <option value={5}>Legendary</option>
      <option value={6}>Artifact</option>
    </Select>
  );
};

export const PriceFilter = ({ setPricing, setPage }) => {
  // LtoH = low to high
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
        setPricing(e.target.value);
        setPage(0);
      }}
    >
      <option value={"LtoH"}>Price: Low to High</option>
      <option value={"HtoL"}>Price: High to Low</option>
    </Select>
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
      <option value={process.env.MARKETPLACE_COLLECTION}>Latest</option>
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
