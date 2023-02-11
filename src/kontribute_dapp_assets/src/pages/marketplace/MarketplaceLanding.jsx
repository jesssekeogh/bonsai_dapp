import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Heading,
  SlideFade,
  Image as ChakraImage,
  HStack,
  Skeleton,
  Center,
  SimpleGrid,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import logo from "../../../assets/Bonsai-Team-ICON-Black.png";
import bonsailogo from "../../../assets/Bonsai_Warriors_Background_1.png";
import pendragonBG from "../../../assets/pendragon.png";
import pendragonLogo from "../../../assets/pendragon_logo.png";
import cryptogirlLogo from "../../../assets/cryptogirl_logo.jpeg";
import doglesLogo from "../../../assets/thedogles_logo.jpeg";
import anvLogo from "../../../assets/anvillogo.svg";
import badbotBg from "../../../assets/badbot-ninja-bg.png";
import ratokoBG from "../../../assets/ratokoBG.png";
import basementBG from "../../../assets/basement_bg.png";
import questionMark from "../../../assets/question_mark.svg";
import cryptogirlBG from "../../../assets/cryptogirl_bg.jpeg";
import doglesBG from "../../../assets/thedogles_bg.jpeg";
import noblebrightBG from "../../../assets/noblebright_landscape_v2.jpeg";

const MarketplaceLanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Center mt={{ base: 0, md: 8 }} mb={8}>
      <Tabs variant="line" colorScheme="cyan" mx={5}>
        <TabList>
          <Tab>
            <Heading size="lg">Collections</Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel mt={3} px={0} mx={0}>
            <NftCards />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};

export default MarketplaceLanding;

const NftCards = () => {
  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 3 }}
      pb={12}
      gap={{ base: 3, md: 6 }}
      maxW="1250px"
    >
      <CollectionThumb
        colimg={noblebrightBG}
        title={"Noblebright"}
        authorimg={logo}
        link={
          "a00d75688a183490f92ce8b6967ab39dffa9735be50c5ea94bbdac9cb4e463f1"
        }
      />
      <CollectionThumb
        colimg={doglesBG}
        title={"Thedogles"}
        authorimg={doglesLogo}
        link={
          "a00e640a6046e233c3b203957511170c393ecc8edfe59958ba5c9b9f998332a9"
        }
      />
      <CollectionThumb
        colimg={cryptogirlBG}
        title={"Crypto Girl in Wonderland"}
        authorimg={cryptogirlLogo}
        link={
          "a007d0f435865a7ff5ad5ad2251b04005a569778e55613e0482ea421a36ced4e"
        }
      />
      <CollectionThumb
        colimg={basementBG}
        title={"Basement"}
        authorimg={questionMark}
        link={
          "a003c792cdcc238efd300cacf3591572a18739f5f634d3420bcaa97a6791010d"
        }
      />
      <CollectionThumb
        colimg={ratokoBG}
        title={"Ratoko"}
        authorimg={anvLogo}
        link={
          "bbd87200973033cb69bc0aee03e90df1a1de01e28aa0246bb175baabfd071754"
        }
      />
      <CollectionThumb
        colimg={pendragonBG}
        title={"Pendragon Quest"}
        authorimg={pendragonLogo}
        link={
          "a00b8f555f7b02edaf9854ea727e83adb7e6b84cca023f784d70369e5223cfd5"
        }
      />
      <CollectionThumb
        colimg={bonsailogo}
        title={"Bonsai Warriors"}
        authorimg={logo}
        link={
          "a006b7308ff262c78c50b3a20059229d30b818034a9f5186eec8e93a1dc15f77"
        }
      />
      <CollectionThumb
        colimg={badbotBg}
        title={"BadBot Ninja"}
        authorimg={anvLogo}
        link={
          "a004f41ea1a46f5b7e9e9639fbed84e037d9ce66b75d392d2c1640bb7a559cda"
        }
      />
    </SimpleGrid>
  );
};
const CollectionThumb = ({ colimg, title, authorimg, link }) => {
  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <>
      <SlideFade in={true} offsetY="20px">
        <Link to={"/marketplace/" + link}>
          <Box spacing="30px" boxShadow="md" borderRadius="lg" bg={bgColor}>
            <Box borderRadius="lg" overflow="hidden" mb={3} align="center">
              <ChakraImage
                transform="scale(1.0)"
                src={colimg}
                borderRadius="lg"
                width="full"
                h={{ base: "100%", md: "265px" }}
                fallback={
                  <Skeleton
                    h={{ base: "230px", md: "265px" }}
                    w={"398px"}
                    borderRadius="lg"
                  />
                }
                objectFit="cover"
                transition="0.3s ease-in-out"
                _hover={{
                  transform: "scale(1.05)",
                }}
              />
            </Box>
            <Author name={title} img={authorimg} />
          </Box>
        </Link>
      </SlideFade>
    </>
  );
};

const Author = (props) => {
  return (
    <HStack mt={-8} p={3} align="center">
      <ChakraImage
        shadow="lg"
        zIndex={1}
        p="5px"
        borderRadius="lg"
        bg="#fff"
        boxSize="60px"
        src={props.img}
        alt={`Avatar of ${props.name}`}
      />
      <Heading size={"md"} noOfLines={1}>
        {props.name}
      </Heading>
    </HStack>
  );
};
