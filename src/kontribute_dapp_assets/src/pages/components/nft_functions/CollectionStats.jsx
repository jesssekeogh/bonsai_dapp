import { createItoActor } from "../../../../../declarations/ito.js";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import React, { useEffect, useState } from "react";
import {
  Box,
  useBreakpointValue,
  Heading,
  Text,
  Stack,
  Container,
  Flex,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";

const Stats = () => async (dispatch, getState) => {
  let ito = createItoActor({
    agentOptions: authentication.getAgentOptions(),
  });

  let stats = await ito.stats();

  return stats;
};

const CollectionStats = ({ props }) => {
  let isMounted = true;
  const anvilDispatch = useAnvilDispatch();
  const [stats, setStats] = useState({});
  const [loaded, setLoaded] = useState(false);

  const load = async () => {
    let data = await anvilDispatch(Stats());
    if (isMounted) {
      setStats(data);
      if (!loaded) {
        console.log("stats", data); // console log stats on inital render only
        setLoaded(true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    load();
    const interval = setInterval(() => {
      load();
    }, 10000);
    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  });

  return (
    <Container py={5} maxW={"container.lg"}>
      <Grid
        templateColumns={{
          base: "repeat(1, 1fr)",
          sm: "repeat(2, 1fr)",
          md: "repeat(4, 1fr)",
        }}
        gap={6}
      >
        <GridItem w="100%" colSpan={{ base: 1, sm: 2, md: 2 }}>
          <Heading as={"h2"} color="#f0e6d3">
            Tokenomics{" "}
            <Tooltip label="Read more about this collections tokenomics">
              <a href={props.tokenomics_link} target="_blank" rel="noreferrer">
                <IconButton
                  size="sm"
                  bg="#0fbdde"
                  color="white"
                  icon={<InfoIcon />}
                />
              </a>
            </Tooltip>
          </Heading>
          <Text fontWeight={600} color="#f0e6d3" fontSize="lg">
            {props.tokenomics_details}
          </Text>
        </GridItem>
        <DataBox
          label="Total NFTs"
          info={"Total NFTs added to the contract"}
          data={loaded && !props.airdropEnded ? stats.total.toString() : "N/A"}
        />
        <DataBox
          label="NFTs Available"
          info={"Total NFTs available for purchase in the contract"}
          data={loaded && !props.airdropEnded ? stats.purchase.toString() : "N/A"}
        />
      </Grid>
    </Container>
  );
};

const DataBox = ({ label, info, data }) => {
  return (
    <GridItem w="100%">
      <Flex flexDirection={"column"}>
        <Box
          px={{ base: "4", md: "6" }}
          py={{ base: "5", md: "6" }}
          border={"double"}
          borderRadius="lg"
          backgroundColor="#16171b"
        >
          <Stack>
            <Text fontSize="sm" fontWeight={600} color="#f0e6d3">
              {label}{" "}
              <Tooltip label={info}>
                <InfoIcon boxSize={5} viewBox="0 0 30 30" />
              </Tooltip>
            </Text>
            <Box
              maxW={"100px"}
              align={"center"}
              size={useBreakpointValue({ base: "sm", md: "md" })}
              borderRadius="md"
              bg="#0fbdde"
              color="black"
              fontWeight="semibold"
              p={1}
            >
              {data}
            </Box>
          </Stack>
        </Box>
      </Flex>
    </GridItem>
  );
};

export default CollectionStats;
