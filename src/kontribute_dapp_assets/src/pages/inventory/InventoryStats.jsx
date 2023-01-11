import React from "react";
import {
  Box,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

const InventoryStats = ({ totalnfts }) => {
  return (
    <div>
      <BasicStatistics nftsTotal={totalnfts} />
    </div>
  );
};

export default InventoryStats;

function StatsCard({ title, stat }) {
  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <Stat
      px={{ base: "2", md: "4" }}
      py={{ base: "2", md: "4" }}
      borderRadius="lg"
      backgroundColor={bgColor}
      boxShadow="lg"
      align="center"
    >
      <Center>
        <StatLabel
          color={"gray.500"}
          fontWeight={700}
          fontSize={{ base: "sm", md: "md" }}
        >
          {title}&nbsp;
        </StatLabel>
        <StatNumber fontSize={{ base: "sm", md: "md" }} as="kbd">
          {stat}
        </StatNumber>
      </Center>
    </Stat>
  );
}

function BasicStatistics({ nftsTotal }) {
  const user_icp = AccountIdentifier.e8sToIcp(
    useAnvilSelector((state) => state.user.icp) // Retrieve NFT Anvil Address ICP Balance
  );

  return (
    <Box
      maxW="1250px"
      mx={"auto"}
      pt={{ base: 0, sm: null, md: 10 }}
      px={{ base: 2, sm: 12, md: 17 }}
    >
      <SimpleGrid columns={2} spacing={{ base: 3, lg: 6 }}>
        <StatsCard title={"ICP:"} stat={user_icp} />
        <StatsCard title={"Collectibles:"} stat={nftsTotal} />
      </SimpleGrid>
    </Box>
  );
}
