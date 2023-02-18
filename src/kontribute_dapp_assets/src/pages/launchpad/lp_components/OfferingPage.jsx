import React from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  SimpleGrid,
  useBreakpointValue,
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

/* works like this:
      <OfferingPage
        collectionLogo={nobleBrightLogo}
        collectionSubHeading={"Comicbook NFTs"}
        name1={"Hooded"}
        name2={"NobleBright"}
        name3={"Priestess"}
        price1={80000000}
        price2={600000000}
        price3={350000000}
        details1={1}
        details2={10}
        details3={5}
        nfts1={1}
        nfts2={10}
        nfts3={5}
        tokenomics_link={"https://medium.com/@teambonsai.icp/noblebright-comicbook-nfts-c0e44c5526ee"}
        tokenomics_details={
          "Noblebright Comicbook NFTs consist of 1080 NFTs. Inside each NFT is a comic strip that introduces you to the Noblebright world and the main protagonist. Holders will be eligible for poll voting to decide the path that the story and NFT collection take."
        }
        launchingSoon
        saleEnded
        airdropEnded
      />
*/

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
              fontSize="2xl"
              fontWeight="bold"
              colorScheme="red"
            >
              Offering ended!
            </Badge>
          ) : props.launchingSoon ? (
            <Badge borderRadius="md" fontSize="2xl" fontWeight="bold">
              Launching Soon
            </Badge>
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
        <ChakraImage
          pos="absolute"
          h={{ base: 220, md: 300 }}
          src={props.collectionLogo}
        />
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
    <Box as="section" py={{ base: 5, md: 8 }}>
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
  const isPhone = useBreakpointValue({ base: true, md: false });
  return (
    <Box
      position="relative"
      p={5}
      h={isMain && !isPhone ? "110%" : "auto"}
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
            1 NFT
          </Text>
        ) : null}
        {details === 5 ? (
          <Text fontWeight={600} fontSize="lg" pb={5}>
            5 NFTs
          </Text>
        ) : null}
        {details === 10 ? (
          <Text fontWeight={600} fontSize="lg" pb={5}>
            10 NFTs
          </Text>
        ) : null}
      </Center>
      <Center>
        {saleEnded ? (
          <Badge
            borderRadius="md"
            fontSize="2xl"
            fontWeight="bold"
            colorScheme="red"
          >
            Sold out!
          </Badge>
        ) : launchingSoon ? (
          <Badge borderRadius="md" fontSize="2xl" fontWeight="bold">
            Launching Soon
          </Badge>
        ) : (
          <Purchase nfts={nfts} amount={price} />
        )}
      </Center>
    </Box>
  );
};

export default OfferingPage;
