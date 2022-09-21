import React from "react";
import {
  Box,
  Center,
  Link,
  Stack,
  Image,
  SimpleGrid,
  useColorMode,
  Text,
} from "@chakra-ui/react";
import icLogo from "../../../assets/internet-computer-icp-logo.png";
import supernova from "../../../assets/supernova.jpeg";
import dfinityLight from "../../../assets/dfinity-light.png";
import dfinityDark from "../../../assets/dfinity-dark.png";

const SocialProof = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Center pt={20}>
        <SimpleGrid columns={{ base: 1, md: 3, lg: 3 }} mx={2} maxW="1250px">
          <Box
            role={"group"}
            p={5}
            m={10}
            maxW={"330px"}
            w={"full"}
            pos={"relative"}
            zIndex={1}
          >
            <Box rounded={"lg"} mt={-12} pos={"relative"} height={"230px"}>
              <Image
                rounded={"lg"}
                height={230}
                width={290}
                objectFit={"cover"}
                src={icLogo}
              />
            </Box>
            <Stack align={"center"}>
              <Text fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
                Trusted by 100's of users, open-source and
                decentralised. Built with{" "}
                <Link
                  color="blue.400"
                  href="https://www.coinbase.com/learn/crypto-basics/what-is-internet-computer#:~:text=The%20ICP%20token%20is%20used,a%20form%20of%20digital%20money."
                  isExternal
                >
                  <u>ICP</u>
                </Link>{" "}
                and{" "}
                <Link
                  color="blue.400"
                  href="https://medium.com/dfinity/internet-identity-the-end-of-usernames-and-passwords-ff45e4861bf7"
                  isExternal
                >
                  <u>Internet Identity</u>
                </Link>{" "}
              </Text>
            </Stack>
          </Box>
          <Box
            role={"group"}
            p={3}
            m={10}
            maxW={"330px"}
            w={"full"}
            pos={"relative"}
            zIndex={1}
          >
            <Box mt={-12} pos={"relative"} height={"230px"}>
              <Image
                height={230}
                width={290}
                objectFit={"contain"}
                src={supernova}
              />
            </Box>
            <Stack align={"center"}>
              <Text fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
                1st place winners in the SocialFi category of the{" "}
                <Link
                  color="blue.400"
                  href="https://devpost.com/software/kontribute"
                  isExternal
                >
                  <u>Supernova Hackathon</u>
                </Link>{" "}
              </Text>
            </Stack>
          </Box>
          <Box
            role={"group"}
            p={3}
            m={10}
            maxW={"330px"}
            w={"full"}
            pos={"relative"}
            zIndex={1}
          >
            <Box rounded={"lg"} mt={-12} pos={"relative"} height={"230px"}>
              <Image
                height={230}
                width={290}
                objectFit={"contain"}
                src={colorMode === "light" ? dfinityLight : dfinityDark}
              />
            </Box>
            <Stack align={"center"}>
              <Text fontSize={"xl"} fontFamily={"body"} fontWeight={500}>
                Funded by the{" "}
                <Link
                  color="blue.400"
                  href="https://dfinity.org/grants"
                  isExternal
                >
                  <u>Dfinity grant program</u>
                </Link>{" "}
              </Text>
            </Stack>
          </Box>
        </SimpleGrid>
      </Center>
    </>
  );
};
export default SocialProof;
