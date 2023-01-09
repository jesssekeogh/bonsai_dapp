import React, { useEffect, useState } from "react";
import {
  Box,
  Image as ChakraImage,
  Skeleton,
  useColorModeValue,
  useBreakpointValue,
  Stack,
  Heading,
  Flex,
  Container,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useLocation } from "react-router-dom";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { NavLink } from "react-router-dom";

const AuthorsCollectibles = ({ address }) => {
  const [tokens, setTokens] = useState([]);
  const loadSelling = async () => {
    let forSale = [];
    const prices = await fetch(
      "https://nftpkg.com/api/v1/prices/" + address
    ).then((x) => x.json());

    for (let nft of prices) {
      if (nft[2] > 0) {
        forSale.push(nft[0]);
      }

      if (forSale.length > 3) {
        break;
      }
    }

    setTokens(forSale);
  };

  useEffect(() => {
    loadSelling();
  }, [address]);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <>
      {tokens.length > 0 ? (
        <Flex rounded={"lg"} mb={3}>
          <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} p={4}>
            <Heading fontWeight={600} size="md">
              Authors collectibles
            </Heading>
            <Stack
              direction="row"
              justify={tokens.length > 2 ? "center" : "start"}
              my={3}
            >
              {tokens.map((item) => (
                <SmallNft tokenId={item} key={item} />
              ))}
            </Stack>
            <Flex align="center">
              <Spacer />
              <NavLink to={`/marketplace/${address}`}>
                <Text as="u">
                  View all
                  <ArrowForwardIcon mx={2} />
                </Text>
              </NavLink>
            </Flex>
          </Container>
        </Flex>
      ) : null}
    </>
  );
};

export default AuthorsCollectibles;

const SmallNft = ({ tokenId }) => {
  const dispatch = useAnvilDispatch();
  const location = useLocation();

  const [thumb, setThumb] = useState();

  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(tokenId)));
    setThumb(
      meta.thumb.internal ? meta.thumb.internal.url : meta.thumb.external
    );
  };

  useEffect(() => {
    load();
  }, []);
  const size = useBreakpointValue({ base: "75px", md: "110px" });
  return (
    <NavLink
      to={`/nft/${tokenToText(tokenId)}`}
      state={{
        prev: location.pathname,
        showConfetti: false,
        totalNfts: 1,
      }}
    >
      <Box role={"group"} w={size} rounded={"lg"} boxShadow="md">
        <ChakraImage
          transform="scale(1.0)"
          bg="#fff"
          height={size}
          rounded={"lg"}
          width={"auto"}
          objectFit={"cover"}
          src={thumb}
          fallback={<Skeleton rounded="lg" height={size} />}
          transition="0.3s ease-in-out"
          _hover={{
            transform: "scale(1.05)",
          }}
        />
      </Box>
    </NavLink>
  );
};
