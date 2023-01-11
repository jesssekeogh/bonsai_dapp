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
import anvLogo from "../../../assets/anvillogo.svg";
import badbotBg from "../../../assets/badbot-ninja-bg.png";
import ratokoBG from "../../../assets/ratokoBG.png";
import basementBG from "../../../assets/basement_bg.png";
import questionMark from "../../../assets/question_mark.svg";

const MarketplaceLanding = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const bgColor = useColorModeValue("White", "#1d1d20");

  return (
    <Center mt={{ base: 0, md: 8 }} mb={8}>
      <Tabs variant="line" colorScheme="cyan" mx={5}>
        <TabList>
          <Tab>
            <Heading size="lg">Collections</Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel px={0} mx={0}>
            <Heading
              size="xs"
              boxShadow="base"
              p={2}
              borderRadius="lg"
              bg={bgColor}
            >
              Collect art of characters, accessories, or anything else from a
              story featured on Kontribute
            </Heading>
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
          <Box
            spacing="30px"
            marginTop="5"
            boxShadow="md"
            borderRadius="lg"
            bg={bgColor}
          >
            <Box borderRadius="lg" overflow="hidden" mb={3} align="center">
              <ChakraImage
                transform="scale(1.0)"
                src={colimg}
                borderRadius="md"
                fallback={<Skeleton height={250} borderRadius="lg" />}
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
        borderRadius="5px"
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
