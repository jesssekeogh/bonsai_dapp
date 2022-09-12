import React, { useState } from "react";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Button,
  FormControl,
  Flex,
  Heading,
  Input,
  Stack,
  Text,
  Box,
  chakra,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  Center,
} from "@chakra-ui/react";

// coingecko API:
const CoinApi =
  "https://api.coingecko.com/api/v3/simple/price?ids=internet-computer&vs_currencies=usd";

const CheckStats = () => {
  const dispatch = useAnvilDispatch();
  const [authorAddress, setAuthorAddress] = useState("");
  const [userAddress, setUserAddress] = useState("");
  const [loading, setLoading] = useState(false);
  const [nftsChecked, setNftsChecked] = useState("0");
  const [collectionStats, setCollectionStats] = useState({});
  const [userNftCount, setUserNftCount] = useState(0);

  console.log("mounted");

  const load = async () => {
    setLoading(true);

    let resp = await fetch(CoinApi).then((x) => x.json());
    let price = resp["internet-computer"].usd;

    let totalPrices = 0;
    let uniqueOwners = [];
    let allPromises = [];
    let nftCount = 0;
    let errors = 0;

    const data = await fetch(
      "https://nftpkg.com/api/v1/author/" + authorAddress
    ).then((x) => x.json());

    setNftsChecked(data.length);

    for (let i = 0; i < data.length; i++) {
      const meta = dispatch(nft_fetch(tokenToText(data[i][0])));
      allPromises.push(meta);
    }

    await Promise.allSettled(
      allPromises.map(async (data) => {
        try {
          const { bearer, price } = await data;

          if (bearer) {
            totalPrices += Number(price.amount ? price.amount : 0);

            if (userAddress == bearer) {
              nftCount++;
            }

            if (!uniqueOwners.includes(bearer)) {
              uniqueOwners.push(bearer);
            }
          }
        } catch (e) {
          errors++;
        }
      })
    );

    setUserNftCount(nftCount);
    setCollectionStats({
      marketCap: {
        icp: e8sToIcp(totalPrices),
        usd: (price * e8sToIcp(totalPrices)).toFixed(2),
      },
      uniqueHolders: uniqueOwners,
      errorFetching: errors,
    });
    setLoading(false);
  };

  return (
    <>
      <Center>
        <Text fontSize={"lg"} color={"white"}>
          Nfts checked: {nftsChecked}
          <br />
          Network Errors:{" "}
          {collectionStats.errorFetching ? collectionStats.errorFetching : 0}
        </Text>
      </Center>

      <Flex align={"center"} justify={"center"}>
        <Stack
          spacing={4}
          w={"full"}
          maxW={"md"}
          bg={"white"}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          m={2}
        >
          <Heading lineHeight={1.1} fontSize={{ base: "2xl", md: "3xl" }}>
            Check Collection
          </Heading>
          <Text fontSize={{ base: "sm", sm: "md" }} color={"gray.800"}>
            Author Address:
          </Text>
          <FormControl>
            <Input
              placeholder="a00fe60cfcc1ecb49d7e8713c762b9f1e8135209beabac19bccdaf4079dbe12b"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(event) => setAuthorAddress(event.target.value)}
            />
          </FormControl>
          <Text fontSize={{ base: "sm", sm: "md" }} color={"gray.800"}>
            User Address:
          </Text>
          <FormControl>
            <Input
              placeholder="a00fe60cfcc1ecb49d7e8713c762b9f1e8135209beabac19bccdaf4079dbe12b"
              _placeholder={{ color: "gray.500" }}
              type="text"
              onChange={(event) => setUserAddress(event.target.value)}
            />
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={"blue.400"}
              color={"white"}
              _hover={{
                bg: "blue.500",
              }}
              onClick={() => {
                load();
              }}
              isLoading={loading}
            >
              Check
            </Button>
          </Stack>
        </Stack>
      </Flex>
      <BasicStatistics
        uniqueHolders={
          collectionStats.uniqueHolders
            ? collectionStats.uniqueHolders.length
            : "0"
        }
        marketCap={
          collectionStats.marketCap
            ? collectionStats.marketCap
            : { usd: "0.00", icp: "0.0000" }
        }
        hodler={userNftCount ? userNftCount : 0}
      />
    </>
  );
};

const BasicStatistics = ({ uniqueHolders, marketCap, hodler }) => {
  return (
    <Box maxW="7xl" mx={"auto"} mb={5} px={{ base: 2, sm: 12, md: 17 }}>
      <chakra.h1
        textAlign={"center"}
        fontSize={"4xl"}
        py={10}
        fontWeight={"bold"}
        color="white"
      >
        Anvil Collection Stats
      </chakra.h1>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 5, lg: 8 }}>
        <StatsCard
          title={"Collection Marketcap"}
          stat={`ICP ${marketCap.icp ? marketCap.icp : "0.0000"} ($${
            marketCap.usd ? marketCap.usd : "0.00"
          })`}
        />
        <StatsCard title={"Totel Holders"} stat={uniqueHolders} />
        <StatsCard title={"User Holds"} stat={hodler.toString()} />
      </SimpleGrid>
    </Box>
  );
};

const StatsCard = (props) => {
  const { title, stat } = props;
  return (
    <Stat
      color="white"
      px={{ base: 4, md: 8 }}
      py={"5"}
      shadow={"xl"}
      border={"1px solid"}
      borderColor={"white"}
      rounded={"lg"}
    >
      <StatLabel fontWeight={"medium"}>
        {title}
      </StatLabel>
      <StatNumber fontSize={"2xl"} fontWeight={"medium"}>
        {stat}
      </StatNumber>
    </Stat>
  );
};

export default CheckStats;
