import React, { useEffect, useState } from "react";
import {
  tokenUrl,
  tokenToText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  useAnvilSelector,
  useAnvilDispatch,
  nft_fetch,
} from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { LoadingSpinner } from "../../../containers";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  HStack,
  SimpleGrid,
  GridItem,
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import BuyNft from "../nft_functions/BuyNft";

const urlAuthor = // api for author address
  "https://nftpkg.com/api/v1/author/a001c89f603f36aa5cba0d7f5f6ca9be2298c9e5f8309e2155767752916ef418"; //change to minter address

const urlAuthorPrices =
  "https://nftpkg.com/api/v1/prices/a001c89f603f36aa5cba0d7f5f6ca9be2298c9e5f8309e2155767752916ef418"; // change to minter address

const CommunityNft = () => {
  const [iDs, setIds] = useState([]);
  const [loaded, setLoaded] = useState(false); // allow loading of tokens before rendering

  const [loadedTokens, setTokens] = useState();

  const loadData = async () => {
    let arrayOfTokens = [];
    let respInfo = [];
    let respPrice = [];
    await Promise.all([
      (async () => {
        const resp = await fetch(urlAuthor).then((x) => x.json());
        respInfo = resp;
      })(),
      (async () => {
        const resp1 = await fetch(urlAuthorPrices).then((x) => x.json());
        respPrice = resp1;
      })(),
    ]);

    for (var i = 0; i < respPrice.length; i++) {
      if (respPrice[i][2] > 0) {
        let tokenId = respPrice[i][0];
        arrayOfTokens.push(tokenId);
      }
    }
    setTokens(arrayOfTokens); //set tokens to state for mapping
  };

  useEffect(async () => {
    await loadData().then(() => setLoaded(true));
  }, []);

  if (!loaded) {
    return <LoadingSpinner />;
  }
  return (
    <>
      <Center>
        <SimpleGrid columns={[2, null, 4]} pb={5} gap={2} maxW="1250px">
          {loadedTokens.map((token) => (
            <SingleNFT imgsrc={token} key={token} />
          ))}
        </SimpleGrid>
      </Center>
    </>
  );
};

const SingleNFT = ({ imgsrc }) => {
  const map = useAnvilSelector((state) => state.user.map); //anvil mapper
  const dispatch = useAnvilDispatch();

  const [name, setName] = useState();

  const [price, setPrice] = useState();

  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(imgsrc)));
    setName(meta.name);

    const resp1 = await fetch(urlAuthorPrices).then((x) => x.json());

    for (var i = 0; i < resp1.length; i++) {
      if (resp1[i][0] === imgsrc) {
        let nft_icp = resp1[i][2];
        setPrice(nft_icp);
      }
    }
  };

  useEffect(() => {
    load();
  }, [imgsrc]);

  return (
    <GridItem>
      <Box
        role={"group"}
        p={4}
        maxW={"330px"}
        w={"full"}
        backgroundColor={"#1e212b"}
        boxShadow={"2xl"}
        rounded={"lg"}
        pos={"relative"}
      >
        <Box rounded={"lg"} pos={"relative"}>
          <ChakraImage
            bg="#fff"
            rounded={"lg"}
            height={["180px", null, "300px"]}
            width={"auto"}
            objectFit={"cover"}
            src={tokenUrl(map.space, imgsrc, "thumb")}
          />
        </Box>
        <HStack pt={3} align={"start"} justify={"space-between"}>
          <Text
            color={"gray.500"}
            fontSize={{ base: "sm", sm: "xs", md: "md" }}
          >
            Bonsai Warrior
          </Text>
          <Text
            as="kbd"
            bgGradient="linear(to-r, #ed1f79, #f15b25)"
            bgClip="text"
          >
            ICP: {AccountIdentifier.e8sToIcp(price)}
          </Text>
        </HStack>
        <Stack
          pt={2}
          direction={"row"}
          align={"center"}
          justify="space-between"
        >
          <Heading
            fontSize={{ base: "xs", sm: "xs", md: "md" }}
            color={"white"}
          >
            {name}
          </Heading>
          <BuyNft tokenId={imgsrc} price={price}/>
        </Stack>
      </Box>
    </GridItem>
  );
};

export default CommunityNft;
