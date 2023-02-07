import React, { useEffect, useState } from "react";
import {
  Heading,
  Box,
  Center,
  Image as ChakraImage,
  HStack,
  VStack,
  SimpleGrid,
  useColorModeValue,
  useBreakpointValue,
  Skeleton,
  Flex,
  Text,
  IconButton,
  Avatar,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import * as Principal from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../CanDBClient/client";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { FcApproval } from "react-icons/fc";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import { VERIFIED } from "../../containers/verified/Verified";
import { motion } from "framer-motion";

const AUTHORS = [
  "3zgw5-lwcb5-szvtp-tkqbu-zcdmp-qphq3-4gmre-75bbr-airu3-kfyeq-4ae",
  "zqxph-ufrag-xelru-brcwg-4amzv-dxvcm-ws2eq-qg2jm-7kvnc-ugtig-wqe",
  "j5nhw-364vy-qdycl-y2r2z-d5xbv-7gjd6-ipmfw-omoit-pwz7w-4l25f-xae",
  "qflw3-vnfgg-ewg4g-rt7y7-zrana-4oruo-jfrbo-i3l5b-rid5c-7o7o2-pae",
  "7xvg3-yvl47-x2bkx-tg6yr-hdn6p-xtzti-qiwha-gwdqt-pix4u-7ie7i-3qe",
  "olrda-tpftz-wwerk-7whnq-s3l47-oq4kh-wvumc-byngh-yzkev-3rwze-pae",
  "bc2fh-bgwnk-fupqb-53xlk-ulfsk-tl7y3-difge-krqya-gb3am-uhwp6-gae",
  "ztgpg-mqoa6-walku-aw7gp-anwd4-bjo4a-pv75y-2dfyt-3azec-q4fjd-wqe",
  "gjb2q-dzr7c-xdce5-m3yqz-zx3vg-7vciz-7vgcg-sov33-ln7rs-btbjk-2qe",
];

// 3 authors on desktop, 1 on mobile
const TOTALPAGESBIGSCREEN = 3;
const TOTALPAGESSMALLSCREEN = 9; // amount of authors

const TopAuthors = () => {
  const [page, setPage] = useState(0);
  const [authorsToShow, setAuthorsToShow] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const smallOrBigScreen = useBreakpointValue({ base: "small", lg: "big" });
  const [direction, setDirection] = useState(1);

  const loadAuthors = () => {
    if (smallOrBigScreen === "big") {
      if (page < 3) {
        setAuthorsToShow(AUTHORS.slice(page * 3, (page + 1) * 3));
        setTotalPages(TOTALPAGESBIGSCREEN);
      } else {
        setPage(0);
      }
    } else if (smallOrBigScreen === "small") {
      setAuthorsToShow(AUTHORS.slice(page * 1, (page + 1) * 1));
      setTotalPages(TOTALPAGESSMALLSCREEN);
    }
  };

  const changePage = (input) => {
    if (input === "next") {
      setDirection(1);
      if (page + 1 === totalPages) {
        setPage(0);
      } else {
        setPage(page + 1);
      }
    } else if (input === "prev") {
      setDirection(0);
      if (page === 0) {
        setPage(totalPages - 1);
      } else {
        setPage(page - 1);
      }
    }
  };

  useEffect(() => {
    loadAuthors();
  }, [page, smallOrBigScreen]);

  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <Box mt={5}>
      <Center>
        <IconButton
          icon={<ChevronLeftIcon boxSize={12} />}
          size="lg"
          bg={bgColor}
          boxShadow="md"
          borderRadius="100%"
          mr={-6}
          zIndex={1}
          onClick={() => changePage("prev")}
          _hover={{ boxShadow: "lg" }}
        />
        <SimpleGrid
          columns={{ base: 1, md: 1, lg: 3 }}
          pb={5}
          gap={{ base: 0, md: 6 }}
          px={1}
          maxW="1200px"
          overflow="hidden"
        >
          {authorsToShow.map((item) => (
            <TopAuthorCard author={item} key={item} direction={direction} />
          ))}
        </SimpleGrid>
        <IconButton
          icon={<ChevronRightIcon boxSize={12} />}
          size="lg"
          bg={bgColor}
          boxShadow="md"
          borderRadius="100%"
          ml={-6}
          zIndex={1}
          onClick={() => changePage("next")}
          _hover={{ boxShadow: "lg" }}
        />
      </Center>
    </Box>
  );
};

export default TopAuthors;

const TopAuthorCard = ({ author, direction }) => {
  const [src, setSrc] = useState("");
  const [authorDetails, setAuthorDetails] = useState({});
  const [totalViews, setTotalViews] = useState(0);
  const [totalLikes, setTotalLikes] = useState(0);

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const partitionKey = `author_${author}`;
  const queryParam = `AuthorDetailsFor_${author}`;

  const dispatch = useAnvilDispatch();

  const getLikesAndViews = async () => {
    const skLowerBound = "";
    const skUpperBound = "~";
    const limit = 1000;
    const ascending = [false];

    const stories = await storyServiceClient.query(partitionKey, (actor) =>
      actor.scanAllFullStories(skLowerBound, skUpperBound, limit, ascending)
    );

    let likes = 0;
    let views = 0;

    if (stories.length > 0 && stories[0].value.stories.length > 0) {
      for (let story of stories[0].value.stories) {
        likes += Number(story.likes);
        views += Number(story.views);
      }
    }

    setTotalLikes(likes.toLocaleString());
    setTotalViews(views.toLocaleString());
  };

  const load = async () => {
    try {
      const details = await storyServiceClient.query(partitionKey, (actor) =>
        actor.getAuthorDetails(queryParam)
      );

      if (details.length > 0) {
        setAuthorDetails(details[0].value.ok[0]);

        const meta = await dispatch(
          nft_fetch(details[0].value.ok[0].nftProfilePic.toLowerCase())
        );

        meta.content.internal
          ? setSrc(meta.content.internal.url)
          : setSrc(meta.content.external);
      }
    } catch (e) {
      // get address
      let address;
      for (let i = 0; i < 100000; i++) {
        let c = Principal.principalToAccountIdentifier(author, i);

        if (c.substring(0, 3) === "a00") {
          address = c;
          break;
        }
      }
      setAuthorDetails({
        pseudonym: `${address.substring(0, 5)}...${address.substring(59, 64)}`,
      });
      console.log(e.toString());
    }
  };

  useEffect(() => {
    load();
    getLikesAndViews();
  }, [author]);

  const variants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0,
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
  };

  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <NavLink to={"/profile/" + author}>
      <motion.div
        variants={variants} // custom functions for animations
        custom={direction} // input
        initial="enter" // calling the custom functions
        animate="center"
        transition={{
          x: { type: "spring", stiffness: 300, damping: 30 },
          opacity: { duration: 0.2 },
        }}
      >
        <Box spacing="30px" boxShadow="md" borderRadius="lg" bg={bgColor}>
          <Box borderRadius="lg" overflow="hidden">
            <ChakraImage
              transform="scale(1.0)"
              transition="0.3s ease-in-out"
              _hover={{
                transform: "scale(1.05)",
              }}
              src={src}
              fallback={
                <Avatar
                  h={{ base: "330px", md: "400px" }}
                  w="auto"
                  borderRadius="lg"
                />
              }
              objectFit="cover"
              boxSize={{ base: "330px", md: "400px" }}
            />
          </Box>
          <Box p={5}>
            <Flex align="center">
              {authorDetails.pseudonym ? (
                <Heading size={"md"} noOfLines={1}>
                  {authorDetails.pseudonym}
                  &nbsp;
                </Heading>
              ) : (
                <Skeleton height="24px" w={"120px"} />
              )}
              {VERIFIED.includes(authorDetails.pseudonym) ? (
                <FcApproval />
              ) : null}
            </Flex>
            <HStack justify="start" spacing={12} mt={3} align="center">
              {totalLikes ? (
                <>
                  <VStack spacing={-1} align="start">
                    <Text
                      fontSize={"xs"}
                      textTransform="uppercase"
                      color="gray.500"
                      fontWeight={700}
                    >
                      Views
                    </Text>
                    <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                      {totalViews}
                    </Text>
                  </VStack>
                  <VStack spacing={-1} align="start">
                    <Text
                      fontSize={"xs"}
                      textTransform="uppercase"
                      color="gray.500"
                      fontWeight={700}
                    >
                      Likes
                    </Text>
                    <Text fontSize={{ base: "md", md: "lg" }} fontWeight="bold">
                      {totalLikes}
                    </Text>
                  </VStack>
                </>
              ) : (
                <>
                  <VStack align="start">
                    <Skeleton height="14px" w="50px" />
                    <Skeleton height={{ base: "16px", md: "19px" }} w="50px" />
                  </VStack>

                  <VStack align="start">
                    <Skeleton height="14px" w="50px" />
                    <Skeleton height={{ base: "16px", md: "19px" }} w="50px" />
                  </VStack>
                </>
              )}
            </HStack>
          </Box>
        </Box>
      </motion.div>
    </NavLink>
  );
};
