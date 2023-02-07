import React, { useState, useEffect } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import {
  Center,
  SimpleGrid,
  Kbd,
  Text,
  Stack,
  Button,
  Box,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { LoadingSpinner } from "../../containers";
import InventoryStats from "./InventoryStats.jsx";
import { GetMine } from "../components";
import { SingleNft } from "../components";
import { createItoActor } from "../../../../declarations/ito.js"
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

const NFTSDISPLAYED = 20;

const Inventory = () => {
  let isMounted = true;
  const [allTokens, setAllTokens] = useState(0);
  const [tokensShowing, setTokensShowing] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const anvilDispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);
  const [loadedTokens, setLoadedTokens] = useState();

  // const getFromITO = () => async (dispatch, getState) => {
  //   const s = getState();

  //   let ito = createItoActor({
  //     agentOptions: authentication.getAgentOptions(),
  //   });

  //   let address = AccountIdentifier.TextToArray(s.user.address);

  //   let subaccount = [
  //     AccountIdentifier.TextToArray(s.user.subaccount) || null,
  //   ].filter(Boolean);

  //   let owned = await ito.owned(address)

  //   for(let token of owned.ok.tokens){
  //     ito.claim(address, subaccount, token);
  //   }
  // }

  const initialLoad = async () => {
    let tokens = await anvilDispatch(GetMine());
    if (isMounted) {
      setLoadedTokens(tokens);
      setAllTokens(tokens.length);
      if (!Loaded) {
        setLoaded(true);
      }
    }
  };

  const fetchTokens = async () => {
    if (isMounted && Loaded) {
      setTokensShowing(
        loadedTokens.slice(page * NFTSDISPLAYED, (page + 1) * NFTSDISPLAYED)
      );
    }
  };

  useEffect(() => {
    if (loaded) {
      fetchTokens();
      // anvilDispatch(getFromITO())
      return () => {
        isMounted = false;
      };
    }
  }, [page, Loaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialLoad();
  }, []);

  if (!Loaded) return <LoadingSpinner label="loading collectibles..." />;
  return (
    <Box pb={20} pt={3}>
      <InventoryStats totalnfts={allTokens} />
      <PaginationButtons
        setPage={setPage}
        page={page}
        tokensLength={tokensShowing.length}
        allNftsAfterFilter={allTokens}
      />
      <Center mt={2}>
        {tokensShowing.length > 0 ? (
          <>
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              gap={{ base: 3, md: 6 }}
              maxW="1250px"
            >
              {tokensShowing.map((item) => (
                <SingleNft tokenId={item} key={item} isMarketplace={false} />
              ))}
            </SimpleGrid>
          </>
        ) : (
          <Kbd
            my={"195px"}
            border={"double"}
            borderRadius="lg"
            backgroundColor="#16171b"
          >
            <Text color="#f0e6d3">You have no collectibles here!😕</Text>
          </Kbd>
        )}
      </Center>
      <PaginationButtons
        setPage={setPage}
        page={page}
        tokensLength={tokensShowing.length}
        allNftsAfterFilter={allTokens}
      />
    </Box>
  );
};

const PaginationButtons = ({ setPage, page, allNftsAfterFilter }) => {
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

export default Inventory;
