import React, { useState, useEffect, useTransition } from "react";
import {
  Center,
  SimpleGrid,
  Box,
  Flex,
  Spacer,
  Center,
  Container,
  Stack,
  Button,
  Heading,
  Text,
  VStack,
  Divider,
  Hide,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { SingleNft, IcpToDollars } from "../components";
import { LoadingSpinner } from "../../containers";
import { RarityFilter, LtoH } from "../components/Filters";
import { useParams } from "react-router-dom";
import { FailedToast } from "../../containers/toasts/Toasts";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

const NFTSDISPLAYED = 20;

const Marketplace = () => {
  const params = useParams();
  const [Loaded, setLoaded] = useState(false);
  const [tokensForSale, setTokensForSale] = useState([]);
  const [sortBy, setSort] = useState("0");
  const [page, setPage] = useState(0);
  const [pricing, setPricing] = useState("Low to High");
  const [author, setAuthor] = useState({});
  const [stats, setStats] = useState();
  const [allNftsAfterFilter, setAll] = useState();
  const [isPending, startTransition] = useTransition();

  // author fetch - only runs if author changes
  const fetchAuthorData = async () => {
    setLoaded(false);
    let meta;
    let prices;
    await Promise.all([
      (async () => {
        try {
          meta = await fetch(
            "https://nftpkg.com/api/v1/author/" + params.author
          ).then((x) => x.json());
        } catch (e) {
          FailedToast("Failed", "Error fetching author data");
        }
      })(),
      (async () => {
        try {
          prices = await fetch(
            "https://nftpkg.com/api/v1/prices/" + params.author
          ).then((x) => x.json());
        } catch (e) {
          FailedToast("Failed", "Error fetching author data");
        }
      })(),
    ]);
    setAuthor({ meta: meta, prices: prices });
    setLoaded(true);
  };

  // helper function for sorting rarities
  const sortRarity = (allTokens, rarity) => {
    let rarityFiltered = [];
    for (let i = 0; i < author.meta.length; i++) {
      if (author.meta[i][1] == rarity) {
        rarityFiltered.push(author.meta[i][0]);
      }
      // Temp bug fix for one null meta NFT:
      if (author.meta[i][0] == 918905 && rarity == 5) {
        rarityFiltered.push(author.meta[i][0]);
      }
    }
    let filtered = [];
    for (let i = 0; i < allTokens.length; i++) {
      if (rarityFiltered.includes(allTokens[i])) {
        filtered.push(allTokens[i]);
      }
    }

    return filtered;
  };

  const getSomeStats = async () => {
    if (Loaded) {
      const prices = author.prices.sort((a, b) => a[2] - b[2]);
      let marketcap = 0;
      let countForSale = 0;
      let countTotal = 0;
      let floor;

      for (let price of prices) {
        if (price[2] > 0) {
          if (!floor) {
            floor = price[2];
          }
          marketcap += price[2];
          countForSale++;
        }
        countTotal++;
      }

      setStats({
        floor: floor,
        countTotal: countTotal,
        countForSale: countForSale,
        marketcap: marketcap,
      });
    }
  };

  // sort nfts accordingly - prices are retrieved from NFT meta data
  const LoadSale = async () => {
    if (Loaded) {
      let forSale = [];

      let prices = author.prices;

      if (pricing === "Low to High") {
        prices.sort((a, b) => a[2] - b[2]);
      } else {
        prices.sort((a, b) => b[2] - a[2]);
      }

      for (let i = 0; i < prices.length; i++) {
        if (prices[i][2] > 0) {
          forSale.push(prices[i][0]);
        }
      }

      startTransition(() => {
        if (sortBy === "0") {
          setTokensForSale(
            forSale.slice(page * NFTSDISPLAYED, (page + 1) * NFTSDISPLAYED)
          );
          setAll(forSale.length);
        } else {
          let filtered = sortRarity(forSale, sortBy);
          setTokensForSale(
            filtered.slice(page * NFTSDISPLAYED, (page + 1) * NFTSDISPLAYED)
          );
          setAll(filtered.length);
        }
      });
    }
  };

  useEffect(() => {
    LoadSale();
    getSomeStats();
  }, [page, sortBy, pricing, Loaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorData();
  }, [params.author]);

  return (
    <Box pt={2} pb={20}>
      <MarketplaceHeader
        setSort={setSort}
        setPage={setPage}
        setPricing={setPricing}
        pricing={pricing}
        stats={stats}
      />
      {Loaded ? (
        <>
          <PaginationButtons
            setPage={setPage}
            page={page}
            tokensLength={tokensForSale.length}
            stats={stats}
            allNftsAfterFilter={allNftsAfterFilter}
          />
          <Center mt={1}>
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              pb={5}
              gap={{ base: 3, md: 6 }}
              maxW="1250px"
            >
              {tokensForSale.map((item) => (
                <SingleNft tokenId={item} key={item} isMarketplace={true} />
              ))}
            </SimpleGrid>
          </Center>
          <PaginationButtons
            setPage={setPage}
            page={page}
            tokensLength={tokensForSale.length}
            allNftsAfterFilter={allNftsAfterFilter}
          />
        </>
      ) : (
        <LoadingSpinner label="Loading Marketplace" />
      )}
    </Box>
  );
};
export default Marketplace;

const HeaderStats = ({ title, stat }) => {
  return (
    <VStack align="start" spacing="0px" mx={1}>
      <Heading
        size={{ base: "sm", md: "sm", lg: "md" }}
      >
        {stat}
      </Heading>
      <Text>{title}</Text>
    </VStack>
  );
};

const MarketplaceHeader = ({
  setSort,
  setPricing,
  pricing,
  setPage,
  stats,
}) => {
  const [marketcapUsd, setMarketcapUsd] = useState("US$00.00");
  const [floor, setFloor] = useState("0.0000 ICP");
  const [listed, setListed] = useState("0%");

  const load = async () => {
    if (stats) {
      setMarketcapUsd(await IcpToDollars(stats.marketcap));
      setFloor(`${e8sToIcp(stats.floor)} ICP`);
      setListed(
        `${Math.round((stats.countForSale / stats.countTotal) * 100)}%`
      );
    }
  };

  useEffect(() => {
    load();
  }, [stats]);

  return (
    <Container maxWidth="1250px" pt={{ base: 2, md: 8 }}>
      <Hide above="md">
        <Center align="center" gap={5} mb={4}>
          <HeaderStats title={"floor price"} stat={floor} />
          <HeaderStats title={"listed"} stat={listed} />
          <HeaderStats title={"marketcap"} stat={marketcapUsd} />
        </Center>
      </Hide>
      <Hide below="md">
        <Flex align="center" gap={{ base: 2, md: 3, lg: 3 }} mb={2}>
          <HeaderStats title={"floor price"} stat={floor} />
          <HeaderStats title={"listed"} stat={listed} />
          <HeaderStats title={"marketcap"} stat={marketcapUsd} />
          <Spacer />

          <RarityFilter setSort={setSort} setPage={setPage} />
          <LtoH pricing={pricing} setPricing={setPricing} setPage={setPage} />
        </Flex>
      </Hide>
      <Hide above="md">
        <Center gap={3}>
          <RarityFilter setSort={setSort} setPage={setPage} />
          <LtoH pricing={pricing} setPricing={setPricing} setPage={setPage} />
        </Center>
      </Hide>
      <Divider my={3} />
    </Container>
  );
};

const PaginationButtons = ({
  setPage,
  page,
  allNftsAfterFilter,
}) => {
  const [totalPages, setTotalPages] = useState(0);

  const loadPages = () => {
    if (allNftsAfterFilter) {
      setTotalPages(Math.ceil(allNftsAfterFilter / NFTSDISPLAYED));
    }
  };

  useEffect(() => {
    loadPages();
  }, [allNftsAfterFilter]);

  return (
    <Center my={5}>
      <Stack direction="row" align="center">
        <Button
          size="sm"
          _hover={{ boxShadow: "base" }}
          leftIcon={<ArrowLeftIcon />}
          onClick={() => {
            setPage(page - 1);
          }}
          isDisabled={page === 0}
        >
          Previous
        </Button>
        <Button size="xs" rounded="full">
          {page + 1}
        </Button>
        <Text>...</Text>
        <Button
          size="xs"
          rounded="full"
          onClick={() => setPage(totalPages - 1)}
        >
          {totalPages}
        </Button>
        <Button
          size="sm"
          rightIcon={<ArrowRightIcon />}
          _hover={{ boxShadow: "base" }}
          onClick={() => {
            setPage(page + 1);
          }}
          isDisabled={page + 1 === totalPages}
        >
          Next
        </Button>
      </Stack>
    </Center>
  );
};
