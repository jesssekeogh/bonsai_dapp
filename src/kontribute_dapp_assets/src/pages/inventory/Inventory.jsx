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
  useColorModeValue,
  Stack,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@chakra-ui/icons";
import { LoadingSpinner } from "../../containers";
import InventoryStats from "./InventoryStats.jsx";
import { GetMine } from "../components";
import { SingleNft } from "../components";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";

const Inventory = () => {
  let isMounted = true;
  const [allTokens, setAllTokens] = useState(0);
  const [tokensShowing, setTokensShowing] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(0);
  const anvilDispatch = useAnvilDispatch();
  const loaded = useAnvilSelector((state) => state.user.map.history);
  const [loadedTokens, setLoadedTokens] = useState();

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
      setTokensShowing(loadedTokens.slice(page * 20, (page + 1) * 20));
    }
  };

  useEffect(() => {
    if (loaded) {
      fetchTokens();
      return () => {
        isMounted = false;
      };
    }
  }, [page, Loaded]);

  useEffect(() => {
    window.scrollTo(0, 0);
    initialLoad();
  }, []);

  if (!Loaded) return <LoadingSpinner label="Fetching NFTs..." />;
  return (
    <Box pb={20} pt={3}>
      <InventoryStats totalnfts={allTokens} />
      <PaginationButtons
        setPage={setPage}
        page={page}
        tokensLength={tokensShowing.length}
      />
      <Center mt={2}>
        {tokensShowing.length > 0 ? (
          <>
            <SimpleGrid
              columns={{ base: 2, md: 2, lg: 4 }}
              gap={3}
              mx={2}
              maxW="1250px"
            >
              {tokensShowing.map((item) => (
                <SingleNft tokenId={item} key={item} />
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
            <Text color="#f0e6d3">You have no NFTs here!😕</Text>
          </Kbd>
        )}
      </Center>
      <PaginationButtons
        setPage={setPage}
        page={page}
        tokensLength={tokensShowing.length}
      />
    </Box>
  );
};

const PaginationButtons = ({ setPage, page, tokensLength }) => {
  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <Center m={3}>
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

export default Inventory;
