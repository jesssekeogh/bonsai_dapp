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
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { SingleNft } from "../components";
import { LoadingSpinner } from "../../containers";
import { RarityFilter, LtoH } from "../components/Filters";
import { useParams } from "react-router-dom";
import { FailedToast } from "../../containers/toasts/Toasts";
import { setMarketplace } from "../../state/GlobalSlice";
import { useDispatch } from "react-redux";
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
  const dispatch = useDispatch();
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
          setTokensForSale(forSale.slice(page * 12, (page + 1) * 12));
        } else {
          let filtered = sortRarity(forSale, sortBy);
          setTokensForSale(filtered.slice(page * 12, (page + 1) * 12));
        }
      });
    }
  };

  useEffect(() => {
    LoadSale();
  }, [page, sortBy, pricing, Loaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAuthorData();
    dispatch(setMarketplace(params.author));
  }, [params.author]);

  return (
    <Box pt={2} pb={20}>
      <MarketplaceHeader
        setSort={setSort}
        setPage={setPage}
        setPricing={setPricing}
        pricing={pricing}
      />
      {Loaded ? (
        <>
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
          <Center mb={2} mt={-2}>
            <PaginationButtons
              setPage={setPage}
              page={page}
              tokensLength={tokensForSale.length}
            />
          </Center>
        </>
      ) : (
        <LoadingSpinner label="Loading Marketplace" />
      )}
    </Box>
  );
};

const MarketplaceHeader = ({ setSort, setPricing, pricing, setPage }) => {
  return (
    <Container maxWidth="1250px" my={6}>
      <Flex>
        <Spacer />
        <RarityFilter setSort={setSort} />
        <LtoH pricing={pricing} setPricing={setPricing} setPage={setPage} />
      </Flex>
    </Container>
  );
};
export default Marketplace;

const PaginationButtons = ({ setPage, page, tokensLength }) => {
  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
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
        isDisabled={tokensLength < 12}
      />
    </Stack>
  );
};
