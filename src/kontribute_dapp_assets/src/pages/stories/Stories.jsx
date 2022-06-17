import React, { useEffect, useState } from "react";
import {
  Heading,
  SimpleGrid,
  Stack,
  Button,
  Container,
  Spacer,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import { CreateButton, StorySummary, FeaturedBox } from "./s_components";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";
import { LoadingSpinner } from "../../containers";

const amountOfStories = 12;
const allStories = 10000;
const featured = [
  "ntohy-uex3p-ricj3-dhz7a-enmvo-szydx-l77yh-kftxf-h25x3-j6feg-2ae",
];

const Stories = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Container maxW={"7xl"} mt={{ base: -10, md: -2 }} mb={5}>
        <CreateButton />
        <FeaturedGrid featuredAuthors={featured} />
        <RecentGrid />
      </Container>
    </>
  );
};

export default Stories;

const FeaturedGrid = ({ featuredAuthors }) => {
  return (
    <>
      <Heading my={1} bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
        Featured
      </Heading>
      <Divider my={2} borderColor="#16171b" />
      <>
        <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
          {featuredAuthors.map((item) => (
            <FeaturedBox key={item} author={item} />
          ))}
        </SimpleGrid>
      </>
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
    loadStories();
    return () => {
      isMounted = false;
    };
  }, [currentAmount]);
  return (
    <>
      <Heading my={1} bgGradient="linear(to-t, #705025, #a7884a)" bgClip="text">
        Recent
      </Heading>
      <Divider my={2} borderColor="#16171b" />
      {loaded ? (
        <>
          <SimpleGrid columns={{ base: 2, md: 2, lg: 4 }} pb={5} gap={3} mx={2}>
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
        <LoadingSpinner label="Loading Stories..." />
      )}
    </>
  );
};

const ViewAllButton = ({ current, setAmount }) => {
  return (
    <Stack direction={"row"}>
      <Spacer />
      <Button
        mt={8}
        colorScheme="#282828"
        bg="#282828"
        rounded={"full"}
        size={useBreakpointValue(["sm", "md"])}
        px={5}
        _hover={{
          transform: "translateY(-2px)",
          boxShadow: "lg",
          opacity: "0.8",
        }}
        isDisabled={current < 12}
        onClick={() => {
          setAmount(allStories);
        }}
      >
        View All
      </Button>
    </Stack>
  );
};
