import React, { useEffect, useState } from "react";
import {
  Heading,
  SimpleGrid,
  Stack,
  Button,
  Container,
  Spacer,
  useBreakpointValue,
  Skeleton,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import { CreateButton, StorySummary, FeaturedBox } from "./s_components";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import BonsaiBG from "../../../assets/Bonsai_Warriors_Background_1.png";
import PendragonBG from "../../../assets/pendragon.png";
import GalacticBG from "../../../assets/galactic_guardians.png";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";

const amountOfStories = 12;
const allStories = 10000;

const bonsaiAuthor =
  "/stories/author/7xvg3-yvl47-x2bkx-tg6yr-hdn6p-xtzti-qiwha-gwdqt-pix4u-7ie7i-3qe";
const pendragonAuthor =
  "/stories/author/ehjp3-bl645-t6go7-f2zyt-xxvyl-els4v-iocym-gsxli-mzj5v-tdwau-wae";
const galacticAuthor =
  "/stories/author/bmh3h-sqpdm-fdzbn-z7fpg-ekftw-6gnvr-wp4gf-le5lb-6tef6-lyhuj-pae";

const Stories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bgColor = useColorModeValue("White", "#1d1d20");

  return (
    <>
      <Container
        maxW={"8xl"}
        w={"95%"}
        mb={5}
        pt={5}
        pb={10}
      >
        <CreateButton />
        <FeaturedGrid />

        <Tabs variant="line" colorScheme="cyan" m={5}>
          <TabList>
            <Tab>
              <Heading size="lg">Most Liked</Heading>
            </Tab>
            <Tab>
              <Heading size="lg">Recent</Heading>
            </Tab>
          </TabList>
          <Heading
            mx={3}
            mt={5}
            mb={2}
            size="xs"
            boxShadow="base"
            p={2}
            borderRadius="lg"
            bg={bgColor}
          >
            Read and explore the lore stories behind Kontribute NFT collections
          </Heading>
          <TabPanels>
            <TabPanel>
              <MostlikedGrid />
            </TabPanel>
            <TabPanel>
              <RecentGrid />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Container>
    </>
  );
};

export default Stories;

const FeaturedGrid = () => {
  return (
    <>
      <Heading my={3}>Featured</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} pb={5} gap={3} mx={2}>
        <FeaturedBox
          link={galacticAuthor}
          mainImg={GalacticBG}
          name={"Galactic Guardians"}
        />
        <FeaturedBox
          link={pendragonAuthor}
          mainImg={PendragonBG}
          name={"Pendragon Quest"}
        />
        <FeaturedBox
          link={bonsaiAuthor}
          mainImg={BonsaiBG}
          name={"Bonsai Warriors"}
        />
      </SimpleGrid>
    </>
  );
};

const RecentGrid = () => {
  let isMounted = true;
  const [storyIds, setStoryIds] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentAmount, setCurrentAmount] = useState(amountOfStories);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const loadStories = async () => {
    let ids = await storyMo.getStoryIds(currentAmount);
    if (isMounted) {
      setStoryIds(ids.ok);
      setLoaded(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    loadStories();
    return () => {
      isMounted = false;
    };
  }, [currentAmount]);

  return (
    <>
      {loaded ? (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
            {storyIds.map((item) => (
              <StorySummary key={item} storyId={item} />
            ))}
          </SimpleGrid>
          <ViewAllButton
            current={storyIds.length}
            setAmount={setCurrentAmount}
          />
        </>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
        </SimpleGrid>
      )}
    </>
  );
};

const ViewAllButton = ({ current, setAmount }) => {
  const [clicked, setClicked] = useState(false);

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <Stack direction={"row"}>
      <Spacer />
      <Button
        mt={8}
        bg={buttonBgColor}
        color={buttonTextColor}
        size={useBreakpointValue(["sm", "md"])}
        px={5}
        _hover={{
          opacity: "0.8",
        }}
        isDisabled={clicked}
        onClick={() => {
          setAmount(allStories);
          setClicked(true);
        }}
      >
        View All
      </Button>
    </Stack>
  );
};

const MostlikedGrid = () => {
  let isMounted = true;
  const [loaded, setLoaded] = useState(false);
  const [storyIds, setStoryIds] = useState([]);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const LoadMostliked = async () => {
    let storiesArray = [];
    let all = await storyMo.getAllStories();

    for (let i = 0; i < all.ok.length; i++) {
      if (all.ok[i].length > 0) {
        storiesArray.push(all.ok[i][0]);
      }
    }

    let sorted = storiesArray.sort(
      (a, b) => Number(b.totalVotes) - Number(a.totalVotes)
    );

    if (isMounted) {
      setStoryIds(sorted.slice(0, 12));

      setLoaded(true);
    }
  };

  useEffect(() => {
    LoadMostliked();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <>
      {loaded ? (
        <>
          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
            {storyIds.map((item) => (
              <StorySummary key={item.storyId} storyId={item.storyId} />
            ))}
          </SimpleGrid>
        </>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
          <Skeleton height={{ base: "150px", md: "200px" }} borderRadius="lg" />
        </SimpleGrid>
      )}
    </>
  );
};
