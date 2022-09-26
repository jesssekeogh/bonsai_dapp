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
  useColorModeValue,
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
  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <Stat
      px={{ base: "2", md: "4" }}
      py={{ base: "2", md: "4" }}
      borderRadius="lg"
      backgroundColor={bgColor}
      boxShadow="lg"
    >
      <Center>
        {!address ? (
          <StatLabel
            fontSize={{ base: "sm", md: "md" }}
            as="kbd"
          >
            {title}:&nbsp;
          </StatLabel>
        ) : null}
        {address ? (
          <Tooltip label="Copy address (supports ICP and NFTA)">
            <Flex
              align="center"
              _hover={{ opacity: "0.8", cursor: "pointer" }}
              onClick={() => onCopy()}
            >
              <StatNumber
                ms={1}
                fontSize={{ base: "sm", md: "md" }}
                as="kbd"
                overflow="hidden"
              >
                {stat}
              </StatNumber>
              <Button
                as={IconButton}
                icon={<CopyIcon />}
                size={"xs"}
                bg={bgColor}
              ></Button>
            </Flex>
          </Tooltip>
        ) : (
          <StatNumber
            fontSize={{ base: "sm", md: "md" }}
            as="kbd"
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
      pt={{ base: 0, sm: null, md: 10 }}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <SimpleGrid columns={{ base: 2, md: 3 }} spacing={{ base: 4, lg: 8 }}>
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
    </Box>
  );
}
