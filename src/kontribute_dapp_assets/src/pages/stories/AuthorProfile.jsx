import React, { useState, useEffect } from "react";
import * as Principal from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import StoryCard from "./components/StoryCard";
import {
  Heading,
  SlideFade,
  Flex,
  Container,
  Center,
  useColorModeValue,
  useClipboard,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  SimpleGrid,
  Tooltip,
  Text,
  GridItem,
  Box,
  Hide,
} from "@chakra-ui/react";
import { ViewIcon, CopyIcon, CheckIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import { BiCylinder } from "react-icons/bi";
import LoadingStoryCard from "./components/LoadingStoryCard";
import AvatarPic from "./components/AvatarPic";
import AuthorsCollectibles from "./components/AuthorsCollectibles";

// test a faulty principal
const AuthorProfile = () => {
  const [allStories, setAllStories] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const params = useParams();
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const [totalLikes, setTotalLikes] = useState(0);
  const [totalViews, setTotalViews] = useState(0);
  const [canister, setCanister] = useState(null);

  const partitionKey = `author_${params.authorPrincipal}`;

  // get address
  let address;
  for (let i = 0; i < 100000; i++) {
    let c = Principal.principalToAccountIdentifier(params.authorPrincipal, i);

    if (c.substring(0, 3) === "a00") {
      address = c;
      break;
    }
  }

  const getAuthorStories = async () => {
    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    const stories = await storyServiceClient.query(partitionKey, (actor) =>
      actor.scanAllFullStories(skLowerBound, skUpperBound, limit, ascending)
    );

    const authorCanisters =
      await indexClient.indexCanisterActor.getCanistersByPK(partitionKey);

    setCanister(authorCanisters[0]);

    let likes = 0;
    let views = 0;

    if (stories.length > 0 && stories[0].value.stories.length > 0) {
      let authorStories = stories[0].value.stories;

      const filterByLatest = authorStories.sort(
        (a, b) => Number(b.time) - Number(a.time)
      );
      setAllStories(filterByLatest);

      for (let story of stories[0].value.stories) {
        likes += Number(story.likes);
        views += Number(story.views);
      }
    } else {
      setAllStories([]);
    }

    setTotalLikes(likes.toString());
    setTotalViews(views.toString());
    setLoaded(true);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getAuthorStories();
  }, [params.authorPrincipal]);

  return (
    <Center mt={{ base: 0, md: 8 }} mb={8} pb={10}>
      <SimpleGrid
        columns={{ base: 1, lg: 2 }}
        templateColumns={{ base: "auto", lg: "1fr 500px" }}
      >
        <Hide above="md">
          <GridItem>
            <Box
              pos={{ base: "auto", md: "sticky" }}
              top={{ base: "auto", md: "20" }}
              mt={{ base: 3, md: 20 }}
            >
              <ProfileBox
                author={params.authorPrincipal}
                address={address}
                totalLikes={totalLikes}
                totalViews={totalViews}
                canister={canister}
              />
              <AuthorsCollectibles address={address} />
            </Box>
          </GridItem>
        </Hide>
        <GridItem ml={{ base: 0, lg: 20 }} mr={{ base: 0, lg: 3 }}>
          <Tabs variant="line" colorScheme="cyan" mx={3}>
            <TabList>
              <Tab>
                <Heading size="lg">Stories</Heading>
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <SlideFade in={true} offsetY="20px">
                  {Loaded ? (
                    <>
                      {allStories.length > 0 ? (
                        allStories.map((item) => (
                          <StoryCard key={item.time} data={{ ...item }} />
                        ))
                      ) : (
                        <Flex justify="center">
                          <Text
                            py={"100px"}
                            px={{ base: null, md: "200px" }}
                          >
                            No stories here!😕
                          </Text>
                        </Flex>
                      )}
                    </>
                  ) : (
                    <>
                      {[...Array(1).keys()].map((item) => (
                        <LoadingStoryCard key={item} />
                      ))}
                    </>
                  )}
                </SlideFade>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </GridItem>
        <Hide below="md">
          <GridItem>
            <Box
              pos={{ base: "auto", md: "sticky" }}
              top={{ base: "auto", md: "20" }}
              mt={{ base: 3, md: 20 }}
            >
              <ProfileBox
                author={params.authorPrincipal}
                address={address}
                totalLikes={totalLikes}
                totalViews={totalViews}
                canister={canister}
              />
              <AuthorsCollectibles address={address} />
            </Box>
          </GridItem>
        </Hide>
      </SimpleGrid>
    </Center>
  );
};

export default AuthorProfile;

const ProfileBox = ({ author, address, totalLikes, totalViews, canister }) => {
  const bgColor = useColorModeValue("white", "#111111");
  const { onCopy, hasCopied } = useClipboard(canister);

  return (
    <Flex rounded={"lg"} my={3}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} w="100vw" p={4}>
        <AvatarPic
          author={author}
          address={address}
          smallView={false}
          monetized={false}
        />
        <Flex mt={1} gap={2} align={"center"} justify="center">
          <Button
            bg={"none"}
            p={0}
            m={0}
            size="md"
            color="gray.500"
            leftIcon={<ViewIcon />}
            _hover={{ bg: "none", cursor: "default" }}
          >
            {totalViews} views
          </Button>
          ·
          <Button
            bg={"none"}
            p={0}
            m={0}
            size="md"
            color="gray.500"
            leftIcon={<FaHeart />}
            _hover={{ bg: "none", cursor: "default" }}
          >
            {totalLikes} likes
          </Button>
        </Flex>
        <Flex mt={0} gap={{ base: 1, md: 2 }} align={"center"} justify="center">
          <Tooltip
            hasArrow
            closeOnClick={false}
            label={hasCopied ? "Copied" : "Copy canister"}
          >
            <Button
              bg={"none"}
              p={0}
              m={0}
              size="md"
              color="gray.500"
              onClick={() => onCopy()}
              leftIcon={<BiCylinder />}
              rightIcon={hasCopied ? <CheckIcon /> : <CopyIcon />}
              _hover={{ bg: "none", cursor: "pointer", opacity: "0.8" }}
            >
              Canister:{" "}
              {canister
                ? canister.substring(0, 5) + "..." + canister.substring(20, 27)
                : null}
            </Button>
          </Tooltip>
        </Flex>
      </Container>
    </Flex>
  );
};
