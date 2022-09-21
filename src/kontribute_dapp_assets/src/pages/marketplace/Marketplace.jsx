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
  IconButton,
  useColorModeValue,
  Heading,
  Text,
  VStack,
  Hide,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { SingleNft, IcpToDollars } from "../components";
import { LoadingSpinner } from "../../containers";
import { RarityFilter, LtoH } from "../components/Filters";
import { useParams } from "react-router-dom";
import { FailedToast } from "../../containers/toasts/Toasts";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";

const Marketplace = () => {
  const params = useParams();
  const [Loaded, setLoaded] = useState(false);
  const [tokensForSale, setTokensForSale] = useState([]);
  const [sortBy, setSort] = useState("0");
  const [page, setPage] = useState(0);
  const [pricing, setPricing] = useState("Low to High");
  const [author, setAuthor] = useState({});
  const [stats, setStats] = useState({});
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
          setTokensForSale(forSale.slice(page * 20, (page + 1) * 20));
        } else {
          let filtered = sortRarity(forSale, sortBy);
          setTokensForSale(filtered.slice(page * 20, (page + 1) * 20));
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
          />
          <Center mt={1}>
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              pb={5}
              gap={5}
              mx={2}
              maxW="1250px"
            >
              {tokensForSale.map((item) => (
                <SingleNft tokenId={item} key={item} quickView={false} />
              ))}
            </SimpleGrid>
          </Center>
          <PaginationButtons
            setPage={setPage}
            page={page}
            tokensLength={tokensForSale.length}
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
  const bgColor = useColorModeValue("White", "#1d1d20");

  return (
    <VStack align="start" spacing="0px">
      <Heading
        p={2}
        size={{ base: "sm", md: "sm", lg: "md" }}
        boxShadow="base"
        borderRadius="lg"
        bg={bgColor}
      >
        {stat}
      </Heading>
      <Text px={2}>{title}</Text>
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
  const [marketcapUsd, setMarketcapUsd] = useState("US$0.00");
  const [floor, setFloor] = useState("0.0000");
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
    <Container maxWidth="1250px" my={8}>
      <Hide above="md">
        <Center align="center" gap={4} mb={4} mt={-2}>
          <HeaderStats title={"floor price"} stat={floor} />
          <HeaderStats title={"listed"} stat={listed} />
          <HeaderStats title={"marketcap"} stat={marketcapUsd} />
        </Center>
      </Hide>
      <Flex align="center" gap={{ base: 2, md: 3, lg: 3 }} mb={2}>
        <Hide below="md">
          <HeaderStats
            title={"floor price"}
            stat={stats ? `${e8sToIcp(stats.floor)} ICP` : "0.0000"}
          />
          <HeaderStats
            title={"listed"}
            stat={
              stats
                ? `${Math.round(
                    (stats.countForSale / stats.countTotal) * 100
                  )}%`
                : "0%"
            }
          />
          <HeaderStats title={"marketcap"} stat={marketcapUsd} />
        </Hide>
        <Spacer />
        <RarityFilter setSort={setSort} setPage={setPage} />
        <LtoH pricing={pricing} setPricing={setPricing} setPage={setPage} />
      </Flex>
    </Container>
  );
};

const PaginationButtons = ({ setPage, page, tokensLength }) => {
  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <Center mb={2} mt={-3}>
      <Stack
        direction={"row"}
        spacing={3}
        align={"center"}
        alignSelf={"center"}
        position={"relative"}
      >
        <IconButton
          bg={buttonBgColor}
          color={buttonTextColor}
          size="sm"
          _hover={{ opacity: "0.9" }}
          icon={<ArrowLeftIcon />}
          onClick={() => {
            setPage(page - 1);
          }}
          isDisabled={page === 0}
        />
        <IconButton
          bg={buttonBgColor}
          color={buttonTextColor}
          size="sm"
          icon={<ArrowRightIcon />}
          _hover={{ opacity: "0.9" }}
          onClick={() => {
            setPage(page + 1);
          }}
          isDisabled={tokensLength < 20}
        />
      </Stack>
    </Center>
  );
};
