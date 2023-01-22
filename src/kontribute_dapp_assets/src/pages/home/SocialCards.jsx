import React from "react";
import {
  Heading,
  Box,
  Center,
  SimpleGrid,
  useColorModeValue,
  Flex,
  Link,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import icLogo from "../../../assets/internet-computer-icp-logo.png";
import supernova from "../../../assets/supernova.jpeg";
import { FaDiscord, FaTwitter, FaGithub, FaMedium } from "react-icons/fa";

const SocialCards = () => {
  return (
    <Box mt={{ base: 7, md: 10 }}>
      <Center pb={3}>
        <Heading fontSize={{ base: "2xl", lg: "3xl" }}>Connect with us</Heading>
      </Center>
      <Center marginTop="5">
        <SimpleGrid
          columns={{ base: 2, md: 2, lg: 4 }}
          pb={5}
          gap={{ base: 3, md: 6 }}
          px={1}
          maxW="1250px"
        >
          <SingleInfoCard
            image={icLogo}
            title={"Twitter"}
            href={"https://mobile.twitter.com/TeamBonsai_ICP"}
          >
            <FaTwitter size={50} />
          </SingleInfoCard>
          <SingleInfoCard
            image={icLogo}
            title={"Discord"}
            href={"https://discord.gg/mWEzS9gvbZ"}
          >
            <FaDiscord size={50} />
          </SingleInfoCard>

          <SingleInfoCard
            image={supernova}
            title={"Medium"}
            href={"https://medium.com/@teambonsai.icp"}
          >
            <FaMedium size={50} />
          </SingleInfoCard>
          <SingleInfoCard
            image={supernova}
            title={"Github"}
            href={"https://github.com/teambonsai/bonsai_dapp"}
          >
            <FaGithub size={50} />
          </SingleInfoCard>
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default SocialCards;

const SingleInfoCard = ({ title, children, href }) => {
  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <Link href={href} _hover={{ textDecoration: "none" }} isExternal>
      <motion.div whileHover={{ scale: 1.05 }}>
        <Box
          spacing="30px"
          boxShadow="md"
          borderRadius="lg"
          w={["160px", null, "280px"]}
          bg={bgColor}
        >
          <Box borderRadius="lg" overflow="hidden" align="center" px={5} pt={5}>
            {children}
          </Box>
          <Box p={5}>
            <Flex align="center" justify="center">
              <Heading size={"md"} noOfLines={1}>
                {title}
              </Heading>
            </Flex>
          </Box>
        </Box>
      </motion.div>
    </Link>
  );
};
