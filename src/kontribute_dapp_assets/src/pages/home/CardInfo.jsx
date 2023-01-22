import React from "react";
import {
  Heading,
  Box,
  Center,
  Image as ChakraImage,
  HStack,
  SimpleGrid,
  useColorModeValue,
  Skeleton,
  Flex,
  Text,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import icLogo from "../../../assets/internet-computer-icp-logo.png";
import supernova from "../../../assets/supernova.jpeg";
import dfinityLight from "../../../assets/dfinity-light.png";
import dfinityDark from "../../../assets/dfinity-dark.png";

const CardInfo = () => {
  const dfinityColor = useColorModeValue(dfinityLight, dfinityDark);
  return (
    <Box mt={{ base: 7, md: 10 }}>
      <Center pb={3}>
        <Heading fontSize={{ base: "2xl", lg: "3xl" }}>
          Decentralized social-fi
        </Heading>
      </Center>
      <Center marginTop="5">
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          pb={5}
          gap={{ base: 3, md: 6 }}
          px={1}
          maxW="1200px"
        >
          <SingleInfoCard
            image={icLogo}
            title={"Built on the ICP blockchain"}
            body={
              "A decentralised permissionless alternative to web2 writing applications. Powered by smart contracts."
            }
          />
          <SingleInfoCard
            image={dfinityColor}
            title={"Backed by Dfinity"}
            body={
              "Supported by The Dfinity Foundation, a not-for-profit organization who is a major contributor to the ICP blockchain."
            }
          />
          <SingleInfoCard
            image={supernova}
            title={"1st place in Supernova"}
            body={
              "Winners of the 1st place prize in the social-fi category of the global supernova hackathon."
            }
          />
        </SimpleGrid>
      </Center>
    </Box>
  );
};

export default CardInfo;

const SingleInfoCard = ({ image, title, body }) => {
  const bgColor = useColorModeValue("White", "#1d1d20");
  return (
    <motion.div whileHover={{ scale: 1.05 }}>
      <Box spacing="30px" boxShadow="md" borderRadius="lg" bg={bgColor}>
        <Box borderRadius="lg" overflow="hidden" align="center">
          <ChakraImage
            px={10}
            src={image}
            borderRadius="full"
            fallback={<Skeleton h="335px" w="auto" borderRadius="lg" />}
            objectFit="contain"
            boxSize={{base: "330px", md: "400px" }}
          />
        </Box>
        <Box p={5}>
          <Flex align="center" justify="center">
            <Heading size={"md"} noOfLines={1}>
              {title}
            </Heading>
          </Flex>
          <HStack justify="center" spacing={12} mt={3} align="center">
            <Text
              color="gray.500"
              textAlign="center"
              fontSize={"lg"}
              fontWeight={600}
            >
              {body}
            </Text>
          </HStack>
        </Box>
      </Box>
    </motion.div>
  );
};
