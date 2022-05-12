import React from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Center,
  Button,
  useClipboard,
  Flex,
  IconButton,
  Tooltip,
  Divider,
  Wrap,
} from "@chakra-ui/react";
import { CopyIcon } from "@chakra-ui/icons";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { CopyToast } from "../../containers/toasts/Toasts";

const InventoryStats = ({ totalnfts }) => {
  return (
    <div>
      <BasicStatistics nftsTotal={totalnfts} />
    </div>
  );
};

export default InventoryStats;

function StatsCard({ title, stat, address, onCopy }) {
  return (
    <Stat
      px={{ base: "2", md: "4" }}
      py={{ base: "2", md: "4" }}
      border={"double"}
      borderRadius="lg"
      backgroundColor="#16171b"
    >
      <Center>
        <StatLabel
          fontWeight={"bold"}
          fontSize={{ base: "xs", md: "md" }}
          as="kbd"
          bgGradient="linear(to-l, #ed1f79, #2dade2)"
          bgClip="text"
          isTruncated
        >
          {title}:&nbsp;
        </StatLabel>
        {address ? (
          <Tooltip label="Copy address (supports ICP and NFTA)">
            <Flex
              align="center"
              _hover={{ opacity: "0.8", cursor: "pointer" }}
              onClick={() => onCopy()}
            >
              <Button
                as={IconButton}
                icon={<CopyIcon />}
                size={"xs"}
                color="#fff"
                backgroundColor={"#16171b"}
                _hover={{ backgroundColor: "#16171b" }}
              ></Button>
              <StatNumber
                fontSize={{ base: "6pt", md: "md" }}
                fontWeight={"medium"}
                as="kbd"
                bgGradient="linear(to-r, #ed1f79, #f15b25)"
                bgClip="text"
                overflow="hidden"
              >
                {stat}
              </StatNumber>
            </Flex>
          </Tooltip>
        ) : (
          <StatNumber
            fontSize={{ base: "xs", md: "md" }}
            fontWeight={"medium"}
            as="kbd"
            bgGradient="linear(to-r, #ed1f79, #f15b25)"
            bgClip="text"
          >
            {stat}
          </StatNumber>
        )}
      </Center>
    </Stat>
  );
}

function BasicStatistics({ nftsTotal }) {
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
      mt={{ base: -8, sm: null, md: -12 }}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <SimpleGrid columns={{ base: 3, md: 3 }} spacing={{ base: 4, lg: 8 }}>
        <StatsCard
          title={"Address"}
          stat={
            address
              ? address.substring(0, 5) + "..." + address.substring(58, 64)
              : null
          }
          address={true}
          onCopy={copy}
        />
        <StatsCard title={"ICP"} stat={user_icp} />
        <StatsCard title={"NFTs"} stat={nftsTotal} />
      </SimpleGrid>
      <Divider my={2} borderColor="#16171b" />
    </Box>
  );
}
