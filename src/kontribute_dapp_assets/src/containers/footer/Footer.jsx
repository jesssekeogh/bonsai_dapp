import React from "react";
import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  useColorModeValue,
  VisuallyHidden,
} from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import "../../../assets/main.css";

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg={useColorModeValue("blackAlpha.100", "whiteAlpha.100")}
      rounded={"full"}
      w={8}
      h={8}
      cursor={"pointer"}
      as={"a"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      transition={"background 0.3s ease"}
      href={href}
      target="_blank"
      rel="noreferrer"
      _hover={{
        bg: useColorModeValue("blackAlpha.200", "whiteAlpha.200"),
      }}
    >
      <VisuallyHidden>{label}</VisuallyHidden>
      {children}
    </chakra.button>
  );
};

const Footer = () => {
  return (
    <div className="footer">
      <Box color={"white"} bg={"#111111"}>
        <Container
          as={Stack}
          maxW={"6xl"}
          py={4}
          direction={{ base: "column", md: "row" }}
          spacing={4}
          justify={{ base: "center", md: "space-between" }}
          align={{ base: "center", md: "center" }}
        >
          <Text as="kbd" size="sm">
            Developed by Team Bonsai
          </Text>
          <Stack direction={"row"} spacing={6}>
            <SocialButton
              label={"Discord"}
              href={"https://discord.gg/S3qRpq8R6e"}
            >
              <FaDiscord />
            </SocialButton>
            <SocialButton
              label={"Twitter"}
              href={"https://mobile.twitter.com/TeamBonsai_ICP"}
            >
              <FaTwitter />
            </SocialButton>
            <SocialButton
              label={"Github"}
              href={"https://github.com/teambonsai/bonsai_dapp"}
            >
              <FaGithub />
            </SocialButton>
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
