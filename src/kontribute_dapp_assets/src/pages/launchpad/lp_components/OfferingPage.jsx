import React from "react";
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
  Badge,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { Airdrop, CollectionStats, Purchase } from "../../components/index";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";

const OfferingPage = (props) => {
  return (
    <Container maxW="1250px" my={10}>
      <Header props={{ ...props }} />
      <SlideFade in={true} offsetY="20px">
        <Prices props={{ ...props }} />
        <Center my={6}>
          {props.airdropEnded ? (
            <Badge
              borderRadius="md"
              fontSize="xl"
              fontWeight="bold"
              colorScheme="red"
            >
              Offering ended!
            </Badge>
          ) : props.launchingSoon ? (
            <Text fontWeight={600} color="#f0e6d3">
              Launching Soon!
            </Text>
          ) : (
            <Airdrop />
          )}
        </Center>
        <CollectionStats props={{ ...props }} />
      </SlideFade>
    </Container>
  );
};

const Header = ({ props }) => {
  return (
    <Box>
      <Center>
        <HStack>
          <ChakraImage
            bg="#fff"
            rounded={"lg"}
            height={"40px"}
            width={"auto"}
            src={props.img}
            p={1}
            m={2}
          />
          <Text fontStyle={"italic"} fontWeight={600} fontSize="lg">
            {props.title}
          </Text>
        </HStack>
      </Center>
      <Stack spacing="3" textAlign="center">
        <Heading>{props.collectionName}</Heading>
      </Stack>
    </Box>
  );
};

const Prices = ({ props }) => {
  return (
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
          name={props.name1}
          price={props.price1}
          details={props.details1}
          nfts={props.nfts1}
          saleEnded={props.saleEnded}
          launchingSoon={props.launchingSoon}
        />
        <PricingCard
          name={props.name2}
          price={props.price2}
          details={props.details2}
          nfts={props.nfts2}
          saleEnded={props.saleEnded}
          launchingSoon={props.launchingSoon}
          discount
          isMain
        />
        <PricingCard
          name={props.name3}
          price={props.price3}
          details={props.details3}
          nfts={props.nfts3}
          saleEnded={props.saleEnded}
          launchingSoon={props.launchingSoon}
          discount
        />
      </SimpleGrid>
    </Box>
  );
};

const PricingCard = ({
  name,
  price,
  details,
  nfts,
  isMain,
  saleEnded,
  discount,
  launchingSoon,
}) => {
  return (
    <Box
      position="relative"
      p={5}
      h={isMain ? "110%" : "auto"}
      overflow="hidden"
      shadow="lg"
      maxW="md"
      width="100%"
      border={"double"}
      borderRadius="lg"
      backgroundColor="#16171b"
    >
      {discount ? (
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
        >
          <Text
            fontSize="xs"
            textTransform="uppercase"
            fontWeight="bold"
            letterSpacing="wider"
            color={useColorModeValue("white", "gray.800")}
          >
            Discount
          </Text>
        </Flex>
      ) : null}
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
          {e8sToIcp(price)}
        </Text>
      </Flex>
      <Center>
        {" "}
        <Text fontWeight={600} color="#f0e6d3" fontSize="lg" pb={5}>
          {details}
        </Text>
      </Center>
      <Center>
        {saleEnded ? (
          <Badge
            borderRadius="md"
            fontSize="xl"
            fontWeight="bold"
            colorScheme="red"
          >
            Sold out!
          </Badge>
        ) : launchingSoon ? (
          <Text fontWeight={600} color="#f0e6d3">
            Launching Soon!
          </Text>
        ) : (
          <Purchase nfts={nfts} amount={price} />
        )}
      </Center>
    </Box>
  );
};

export default OfferingPage;
