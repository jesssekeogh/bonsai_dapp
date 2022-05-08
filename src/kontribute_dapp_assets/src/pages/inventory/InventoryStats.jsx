import React from "react";
import {
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Center,
  Button,
  useClipboard,
  Flex,
  Wrap,
  useBreakpointValue,
  IconButton,
  Tooltip
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { CopyToast } from "../../containers/toasts/Toasts";

const InventoryStats = ({ totalnfts }) => {
  const totalselling = "(Coming Soon)";
  return (
    <div>
      <BasicStatistics nftsTotal={totalnfts} selling={totalselling} />
    </div>
  );
};

export default InventoryStats;

function StatsCard({ title, stat }) {
  return (
    <Stat
      px={{ base: "2", md: "4" }}
      py={{ base: "2", md: "4" }}
      border={"double"}
      borderRadius="lg"
      backgroundColor="#16171b"
    >
      <Wrap spacing={{ base: 5, md: 2 }}>
        <StatLabel
          fontWeight={"bold"}
          fontSize={{ base: "xs", md: "md" }}
          as="kbd"
          bgGradient="linear(to-l, #ed1f79, #2dade2)"
          bgClip="text"
          isTruncated
        >
          {title}:
        </StatLabel>
        <StatNumber
          fontSize={{ base: "7pt", md: "md" }}
          fontWeight={"medium"}
          as="kbd"
          bgGradient="linear(to-r, #ed1f79, #f15b25)"
          bgClip="text"
        >
          {stat}
        </StatNumber>
      </Wrap>
    </Stat>
  );
}

function BasicStatistics({ nftsTotal, selling }) {
  const address = useAnvilSelector((state) => state.user.address); // Retrieve NFT Anvil ICP address
  const user_icp = AccountIdentifier.e8sToIcp(
    useAnvilSelector((state) => state.user.icp) // Retrieve NFT Anvil Address ICP Balance
  );

  const { hasCopied, onCopy } = useClipboard(address);

  const copy = () => {
    onCopy();
    CopyToast();
  };
  return (
    <Box
      maxW="7xl"
      mx={"auto"}
      pt={{ base: 0, sm: null, md: 5 }}
      mt={{ base: -10, sm: null, md: -12 }}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <Center
        mb={2}
        px={{ base: "0", md: "2" }}
        py={{ base: "1", md: "2" }}
        border={"double"}
        borderRadius="lg"
        backgroundColor="#16171b"
      >
        <Tooltip label="Copy address (supports ICP and NFTA)">
          <Box
            _hover={{ opacity: "0.8", cursor: "pointer" }}
            py={{ base: 1, sm: null, md: 0 }}
            onClick={() => copy()}
          >
            <Flex align={"center"}>
              <chakra.h1
                fontSize={{ base: "md", md: "2xl" }}
                fontWeight={"bold"}
                as="kbd"
                bgGradient="linear(to-l, #ed1f79, #2dade2)"
                bgClip="text"
              >
                {address
                  ? address.substring(0, 10) +
                    "......" +
                    address.substring(56, 64)
                  : null}
              </chakra.h1>
              <Button
                as={IconButton}
                icon={<CopyIcon />}
                size={useBreakpointValue({ base: "sm", md: "md" })}
                color="#fff"
                backgroundColor={"#16171b"}
                _hover={{ backgroundColor: "#16171b" }}
              ></Button>
            </Flex>
          </Box>
        </Tooltip>
      </Center>
      <SimpleGrid columns={{ base: 3, md: 3 }} spacing={{ base: 4, lg: 8 }}>
        <StatsCard title={"ICP Balance"} stat={user_icp} />
        <StatsCard title={"NFTs Owned"} stat={nftsTotal} />
        <StatsCard title={"NFTs Listed for Sale"} stat={selling} />
      </SimpleGrid>
    </Box>
  );
}
