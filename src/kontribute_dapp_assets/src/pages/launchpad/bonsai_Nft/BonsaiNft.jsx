import React, { useEffect } from "react";
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
  SlideFade
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";
import logo from "../../../../assets/Bonsai-Team-ICON-Black.png";
import { Purchase } from "../../components";

// not all NFTs have been added
const BonsaiNFT = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container maxW="1250px">
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
                Team Bonsai Presents
              </Text>
            </HStack>
          </Center>
          <Stack spacing="3" textAlign="center">
            <Heading bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
              Bonsai Warrior NFTs
            </Heading>
            <Text fontWeight={600} color="#f0e6d3" fontSize="lg">
              A collection of 1200 hand drawn NFTs from the Bonsai Warrior Story
            </Text>
          </Stack>
        </Box>
        <Box as="section" py="10" px={{ base: "4", md: "8" }}>
          <SlideFade in={true} offsetY="20px">
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
                  price: "3.00 ICP",
                  name: "Warrior",
                  details: "1 Bonsai Warrior NFT",
                }}
                button={<Purchase nfts={1} amount={300000000} />}
              />
              <PricingCard
                discount2
                isMain={"110%"}
                zIndex={-1}
                data={{
                  price: "21.00 ICP",
                  name: "Emperor",
                  details: "10 Bonsai Warrior NFTs",
                }}
                button={<Purchase nfts={10} amount={2100000000} />}
              />
              <PricingCard
                discount1
                isMain={"auto"}
                transform={{ lg: "scale(1.05)" }}
                data={{
                  price: "12.00 ICP",
                  name: "Grandmaster",
                  details: "5 Bonsai Warrior NFTs",
                }}
                button={<Purchase nfts={5} amount={1200000000} />}
              />
            </SimpleGrid>
          </SlideFade>
        </Box>
      </Container>
    </>
  );
};

export default BonsaiNFT;

export const PricingCard = (props) => {
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
      bgColor="#16171b"
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
