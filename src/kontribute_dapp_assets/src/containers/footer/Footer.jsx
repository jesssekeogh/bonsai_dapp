import React from "react";
import {
  Box,
  Container,
  Stack,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { FaDiscord, FaTwitter, FaGithub } from "react-icons/fa";
import "../../../assets/main.css";

const SocialButton = ({ icon, href }) => {
  return (
    <IconButton
      size="lg"
      cursor={"pointer"}
      as={"a"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      href={href}
      target="_blank"
      rel="noreferrer"
      icon={icon}
      variant="unstyled"
      _hover={{
        transform: "translateY(-2px)",
      }}
    />
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
              icon={<FaDiscord />}
            />
            <SocialButton
              label={"Twitter"}
              href={"https://mobile.twitter.com/TeamBonsai_ICP"}
              icon={<FaTwitter />}
            />
            <SocialButton
              label={"Github"}
              href={"https://github.com/teambonsai/bonsai_dapp"}
              icon={<FaGithub />}
            />
          </Stack>
        </Container>
      </Box>
    </div>
  );
};

export default Footer;
