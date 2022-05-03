import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  SimpleGrid,
  HStack,
  useColorModeValue,
  Container,
  Flex,
  SlideFade,
  Grid,
  GridItem,
  IconButton,
  Tooltip,
  Badge,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from "@chakra-ui/react";
import { Box, Container, SimpleGrid } from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import logo from "../../../../assets/Bonsai-Team-ICON-Black.png";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import * as AccountIdentifier from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  Purchase,
  CollectionStats,
  Airdrop,
  LaunchAlert,
} from "../../components";
import { LoadingSpinner } from "../../../containers";

// not all NFTs have been added

const price_1 = 300000000; // 3 ICP
const price_2 = 2100000000; // 21 ICP
const price_3 = 1200000000; // 12 ICP

const tokenomics_link = "";

const BonsaiNFT = () => {
  let isMounted = true;
  const dispatch = useAnvilDispatch();
  const [stats, setStats] = useState();
  const [loaded, setLoaded] = useState(false);
  const [soldOut, setSoldOut] = useState(false); // if the amount available is 0 close the sale

  const load = async () => {
    let data = await dispatch(CollectionStats());
    if (isMounted) {
      setStats(data);
      if (!loaded) {
        console.log("stats", data); // console log stats on inital render only
        setLoaded(true);
      }
      if (data.purchase === 0) {
        setSoldOut(true);
      }
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    load();
    return () => {
      isMounted = false;
    };
  });

  if (!loaded) return <LoadingSpinner />;

  return (
    <>
      <LaunchAlert />
      <Container maxW="1250px" mb={10}>
        <Box>
          <Center>
            <HStack>
              <ChakraImage
                bg="#fff"
                rounded={"lg"}
                height={"40px"}
                width={"auto"}
                src={logo}
                p={1}
                m={2}
              />
              <Text
                fontStyle={"italic"}
                fontWeight={600}
                color="#f0e6d3"
                fontSize="lg"
              >
                Team Bonsai presents
              </Text>
            </HStack>
          </Center>
          <Stack spacing="3" textAlign="center">
            <Heading bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
              Bonsai Warrior NFTs
            </Heading>
          </Stack>
        </Box>
        <SlideFade in={true} offsetY="20px">
          <Box as="section" py="10" px={{ base: "4", md: "8" }}>
            <SimpleGrid
              columns={{ base: 1, lg: 3 }}
              spacing={{ base: "8", lg: "2" }}
              maxW="7xl"
              mx="auto"
              justifyItems="center"
              alignItems="center"
            >
              <PricingCard
                isMain={"auto"}
                data={{
                  price: AccountIdentifier.e8sToIcp(price_1),
                  name: "Warrior",
                  details: "1 Bonsai Warrior NFT",
                }}
                button={
                  !soldOut ? (
                    <Purchase nfts={1} amount={price_1} />
                  ) : (
                    <Badge
                      borderRadius="md"
                      fontSize="xl"
                      fontWeight="bold"
                      colorScheme="red"
                    >
                      Sold out!
                    </Badge>
                  )
                }
              />
              <PricingCard
                discount2
                isMain={"110%"}
                zIndex={-1}
                data={{
                  price: AccountIdentifier.e8sToIcp(price_2),
                  name: "Emperor",
                  details: "10 Bonsai Warrior NFTs",
                }}
                button={
                  !soldOut ? (
                    <Purchase nfts={10} amount={price_2} />
                  ) : (
                    <Badge
                      borderRadius="md"
                      fontSize="xl"
                      fontWeight="bold"
                      colorScheme="red"
                    >
                      Sold out!
                    </Badge>
                  )
                }
              />
              <PricingCard
                discount1
                isMain={"auto"}
                transform={{ lg: "scale(1.05)" }}
                data={{
                  price: AccountIdentifier.e8sToIcp(price_3),
                  name: "Grandmaster",
                  details: "5 Bonsai Warrior NFTs",
                }}
                button={
                  !soldOut ? (
                    <Purchase nfts={5} amount={price_3} />
                  ) : (
                    <Badge
                      borderRadius="md"
                      fontSize="xl"
                      fontWeight="bold"
                      colorScheme="red"
                    >
                      Sold out!
                    </Badge>
                  )
                }
              />
            </SimpleGrid>
          </Box>
          <Center my={6}>
            <Airdrop />
          </Center>
          <StatGrid
            total={stats.total.toString()}
            available={stats.available.toString()}
          />
        </SlideFade>
      </Container>
    </>
  );
};

export default BonsaiNFT;

const PricingCard = (props) => {
  const { data, icon, button, ...rest } = props;
  const { details, price, name } = data;

  return (
    <Card rounded={{ sm: "xl" }} {...rest}>
      <Center>
        <Heading bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
          {name}
        </Heading>
      </Center>
      <Flex align="flex-end" justify="center" fontWeight="extrabold" my="8">
        <Text
          as="kbd"
          bgGradient="linear(to-l, #ed1f79, #2dade2)"
          bgClip="text"
        >
          ICP:&nbsp;
        </Text>
        <Text
          as="kbd"
          bgGradient="linear(to-r, #ed1f79, #f15b25)"
          bgClip="text"
          size={"md"}
        >
          {price}
        </Text>
      </Flex>
      <Center>
        {" "}
        <Text fontWeight={600} color="#f0e6d3" fontSize="lg" pb={5}>
          {details}
        </Text>
      </Center>
      <Center>{button}</Center>
    </Card>
  );
};

export const Card = (props) => {
  const { children, isMain, discount1, discount2, ...rest } = props;
  return (
    <Box
      position="relative"
      p={5}
      h={isMain}
      overflow="hidden"
      shadow="lg"
      maxW="md"
      width="100%"
      border={"double"}
      borderRadius="lg"
      backgroundColor="#16171b"
    >
      {discount1 && <CardBadge>20% Discount</CardBadge>}
      {discount2 && <CardBadge>30% Discount</CardBadge>}
      {children}
    </Box>
  );
};

export const CardBadge = (props) => {
  const { children, ...flexProps } = props;
  return (
    <Flex
      bgGradient="linear(to-r, #6190E8, #A7BFE8)"
      position="absolute"
      right={-20}
      top={6}
      width="240px"
      transform="rotate(45deg)"
      py={2}
      justifyContent="center"
      alignItems="center"
      {...flexProps}
    >
      <Text
        fontSize="xs"
        textTransform="uppercase"
        fontWeight="bold"
        letterSpacing="wider"
        color={useColorModeValue("white", "gray.800")}
      >
        {children}
      </Text>
    </Flex>
  );
};

const StatGrid = ({ total, available }) => (
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
            <a href={tokenomics_link} target="_blank" rel="noreferrer">
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
          Team Bonsai's genesis collection features 1260 hand crafted NFTs from
          the Bonsai Warriors story. Read our tokenomics paper for more details
          about the collection and the NFTs.
        </Text>
      </GridItem>
      <DataBox
        label="Total NFTs"
        info={"Total NFTs added to the contract"}
        data={total}
      />
      <DataBox
        label="NFTs Available"
        info={"Total NFTs left for purchase in the contract"}
        data={available}
      />
    </Grid>
  </Container>
);

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
