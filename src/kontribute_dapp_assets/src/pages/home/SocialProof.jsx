import React from "react";
import {
  Box,
  Center,
  Link,
  Image,
  SimpleGrid,
  useColorMode,
  Text,
  Center,
} from "@chakra-ui/react";
import icLogo from "../../../assets/internet-computer-icp-logo.png";
import supernova from "../../../assets/supernova.jpeg";
import dfinityLight from "../../../assets/dfinity-light.png";
import dfinityDark from "../../../assets/dfinity-dark.png";

const SocialProof = () => {
  const { colorMode } = useColorMode();
  return (
    <>
      <Center>
        <SimpleGrid
          mt={{ base: 10, md: 20, lg: 20 }}
          align="center"
          columns={{ base: 1, md: 2, lg: 3 }}
          maxW="1250px"
          mx={2}
        >
          <SocialCard img={icLogo}>
            <Text fontSize={"xl"} fontWeight={500}>
              Open-source, decentralised and trusted by 100's of users. Built on
              the blockchain with{" "}
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
          </SocialCard>

          <SocialCard img={colorMode === "light" ? dfinityLight : dfinityDark}>
            {" "}
            <Text fontSize={"xl"} fontWeight={500}>
              We work in collaboration with Dfinity to bring web2 users to web3.
              Kontribute is funded by the{" "}
              <Link
                color="blue.400"
                href="https://dfinity.org/grants"
                isExternal
              >
                <u>Dfinity grant program</u>
              </Link>{" "}
            </Text>
          </SocialCard>

          <SocialCard img={supernova}>
            <Text fontSize={"xl"} fontWeight={500}>
              Winners of the 1st place prize in the SocialFi category of the
              global <br></br>
              <Link
                color="blue.400"
                href="https://devpost.com/software/kontribute"
                isExternal
              >
                <u>Supernova Hackathon</u>
              </Link>{" "}
            </Text>
          </SocialCard>
        </SimpleGrid>
      </Center>
    </>
  );
};

const SocialCard = ({ img, children }) => {
  return (
    <Box my={5}>
      <Image boxSize={"220px"} objectFit={"contain"} src={img} />
      <Box>{children}</Box>
    </Box>
  );
};
export default SocialProof;
