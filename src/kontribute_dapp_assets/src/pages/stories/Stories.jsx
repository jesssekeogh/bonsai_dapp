import React, { useEffect } from "react";
import {
  Box,
  Heading,
  SlideFade,
  Image as ChakraImage,
  HStack,
  Skeleton,
  Flex,
  Tag,
  Container,
  Center,
  SimpleGrid,
  useColorModeValue,
  Avatar,
  Heading,
  Stack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";

const Stories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Center my={8}>
      <Tabs variant="line" colorScheme="cyan" mx={5}>
        <TabList>
          <Tab>
            <Heading size="lg">Latest</Heading>
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <StoryCard />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Center>
  );
};
export default Stories;

const StoryCard = () => {
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Flex rounded={"lg"} m={3}>
      <Container
        bg={bgColor}
        color={textColor}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
      >
        <Flex align="center" gap={2}>
          <Avatar size="sm" bg='teal.500'/>
          <Text color={"gray.500"}>a00fe60cfcc...daf4079dbe12b </Text>
        </Flex>
        <Heading size={"md"} my={2}>
          Jack Dorsey Unveils Bluesky Social, the Decentralized Twitter-Killer.
        </Heading>
        <Text noOfLines={2}>
          he implementation of the next version of the Internet will seek its
          fundamentals in the Blockchain and the cryptocurrency world. With a
          supposedly decentralized operating model.
        </Text>
        <Tag mt={3}>Sample Tag</Tag>
      </Container>
    </Flex>
  );
};
