import React from "react";
import {
  Alert,
  AlertIcon,
  Container,
  Flex,
  Link,
  Text,
} from "@chakra-ui/react";

const LaunchAlert = () => {
  return (
    <>
      <Container mb={2}>
        <Alert status="info" borderRadius="lg">
          <AlertIcon />
          <Text>
            Bonsai Warriors will be launching soon! Keep an eye on our{" "}
            <Link
              _hover={{ cursor: "pointer", opacity: "0.8" }}
              color="#7289DA"
              href={"https://discord.gg/S3qRpq8R6e"}
              isExternal
            >
              <u>Discord</u>
            </Link>{" "}
            and{" "}
            <Link
              _hover={{ cursor: "pointer", opacity: "0.8" }}
              color="#1DA1F2"
              href={"https://mobile.twitter.com/TeamBonsai_ICP"}
              isExternal
            >
              <u>Twitter</u>
            </Link>
          </Text>
        </Alert>
      </Container>
    </>
  );
};

export default LaunchAlert;
