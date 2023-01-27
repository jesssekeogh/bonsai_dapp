import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  useColorModeValue,
  Container,
  Flex,
  SlideFade,
  Badge,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { Airdrop, CollectionStats, Purchase } from "../../components/index";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import {
  HeadingColorDark,
  HeadingColorLight,
} from "../../../containers/colormode/Colors";

const OfferingPage = (props) => {
  const textColor = useColorModeValue(HeadingColorLight, HeadingColorDark);
  return (
    <Container
      maxW="1250px"
      pb={{ base: 10, md: 12 }}
      mt={{ base: 5, md: 10 }}
      px={3}
      color={textColor}
    >
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
    <>
      <Center minH={120}>
        <ChakraImage pos="absolute" h={{base: 220, md: 300}} src={props.collectionLogo} />
      </Center>
      <Heading
        mt={-5}
        fontStyle="italic"
        fontFamily="MedievalSharp"
        textAlign="center"
        size="lg"
      >
        {props.collectionSubHeading}
      </Heading>
    </>
  );
};

const Prices = ({ props }) => {
  return (
    <Box as="section" py={{ base: 5, md: 8 }} px={{ base: "4", md: "8" }}>
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
  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <Box
      position="relative"
      p={5}
      h={isMain ? "110%" : "auto"}
      overflow="hidden"
      boxShadow="lg"
      maxW="md"
      width="100%"
      borderRadius="lg"
      bg={bgColor}
    >
      {discount ? (
        <Flex
          bg="radial-gradient(circle, rgba(208,168,93,1) 54%, rgba(249,190,82,1) 100%)"
          color="white"
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
            color={useColorModeValue("white", "gray.800")}
          >
            {details === 5 ? "12%" : details === 10 ? "25%" : null} Discount
          </Text>
        </Flex>
      ) : null}
      <Center>
        <Heading>{name}</Heading>
      </Center>
      <Flex justify="center" my={8} align="baseline" gap={1}>
        <Heading fontSize={{ base: "xl", md: "3xl" }}>
          {Number(e8sToIcp(price)).toFixed(2)}
        </Heading>
        <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
          ICP
        </Text>
      </Flex>
      <Center>
        {details === 1 ? (
          <Text fontWeight={600} fontSize="lg" pb={5}>
            1 image here
          </Text>
        ) : null}
        {details === 5 ? (
          <Text fontWeight={600} fontSize="lg" pb={5}>
            5 images here
          </Text>
        ) : null}
        {details === 10 ? (
          <Text fontWeight={600} fontSize="lg" pb={5}>
            10 images here
          </Text>
        ) : null}
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
