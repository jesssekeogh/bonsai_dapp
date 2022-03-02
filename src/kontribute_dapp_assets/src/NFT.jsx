import React from "react";
import { NavBar } from "./containers";
import anvillogo from "../assets/anvillogo.svg";
import { Box, Center, Heading, Text, Stack, Image } from "@chakra-ui/react";

// temporary until NFT anvil integration
const NFT = () => {
  return (
    <div>
      <NavBar />
      <Center py={12}>
        <Box
          role={"group"}
          p={6}
          maxW={"330px"}
          w={"full"}
          rounded={"lg"}
          pos={"relative"}
          zIndex={1}
        >
          <Box
            rounded={"lg"}
            mt={-12}
            pos={"relative"}
            height={"230px"}
            _after={{
              transition: "all .3s ease",
              content: '""',
              w: "full",
              h: "full",
              pos: "absolute",
              top: 5,
              left: 0,
              backgroundImage: `url(${anvillogo})`,
              filter: "blur(15px)",
              zIndex: -1,
            }}
            _groupHover={{
              _after: {
                filter: "blur(20px)",
              },
            }}
          >
            <a
              href="https://nftanvil.com/mint"
              target="_blank"
              rel="noreferrer"
            >
              <Image rounded={"lg"} height={230} width={282} src={anvillogo} />
            </a>
          </Box>
          <Stack pt={10} align={"center"}>
            <Text
              color={"gray.500"}
              fontSize={"sm"}
              textTransform={"uppercase"}
            >
              NFT Anvil
            </Text>
            <Heading fontSize={"2xl"} fontFamily={"body"} fontWeight={500}>
              (Coming Soon)
            </Heading>
            <Stack direction={"row"} align={"center"}></Stack>
          </Stack>
        </Box>
      </Center>
    </div>
  );
};

export default NFT;
