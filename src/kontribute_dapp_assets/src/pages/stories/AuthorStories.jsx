import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { LoadingSpinner } from "../../containers";
import {
  SimpleGrid,
  Kbd,
  Text,
  SimpleGrid,
  Container,
  Center,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Divider,
} from "@chakra-ui/react";
import { StorySummary } from "./s_components";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";
import { createStoryActor } from "../../../../declarations/story";

const AuthorStories = () => {
  let isMounted = true;
  const params = useParams();
  const author = params.principal;
  const [storyIds, setStoryIds] = useState([]);
  const [loaded, setLoaded] = useState(false);

  let storyMo = createStoryActor({
    agentOptions: authentication.getAgentOptions(),
  });

  const getIds = async () => {
    let ids = await storyMo.getUserStories(author);
    if (isMounted) {
      if ("err" in ids) {
        setStoryIds("err");
      } else {
        setStoryIds(ids.ok);
      }
      setLoaded(true);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getIds();
    return () => {
      isMounted = false;
    };
  }, []);

  if (!loaded) return <LoadingSpinner label="Fetching Stories..." />;
  return (
    <>
      <Container maxW={"7xl"} pt={{ base: 5, md: 12 }} pb={10}>
        <AuthorCard author={author} />
        <Divider my={2} borderColor="#16171b" />
        {storyIds === "err" || storyIds.length < 1 ? (
          <Center>
            <Kbd
              my={"195px"}
              border={"double"}
              borderRadius="lg"
              backgroundColor="#16171b"
            >
              <Text color="#f0e6d3">There are no Stories here!😕</Text>
            </Kbd>
          </Center>
        ) : (
          <SimpleGrid
            columns={{ base: 2, md: 2, lg: 4 }}
            pb={5}
            gap={3}
            mx={2}
            mt={3}
          >
            {storyIds.map((item) => (
              <StorySummary key={item} storyId={item} />
            ))}
          </SimpleGrid>
        )}
      </Container>
    </>
  );
};

const AuthorCard = ({ author }) => {
  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <Stat
      px={{ base: "2", md: "4" }}
      py={{ base: "2", md: "4" }}
      boxShadow="base"
      p={2}
      borderRadius="lg"
      bg={bgColor}
      maxW={{ base: "270px", md: "400px" }}
    >
      <StatLabel
        fontWeight={"bold"}
        fontSize={{ base: "xs", md: "md" }}
        as="kbd"
      >
        Author:&nbsp;
      </StatLabel>
      <StatNumber
        fontSize={{ base: "xs", md: "md" }}
        fontWeight={"medium"}
        as="kbd"
      >
        {author.substring(0, 10) + "......" + author.substring(54, 63)}
      </StatNumber>
    </Stat>
  );
};
export default AuthorStories;
