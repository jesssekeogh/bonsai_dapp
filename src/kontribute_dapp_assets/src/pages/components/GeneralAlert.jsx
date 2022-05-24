import React from "react";
import {
  Alert,
  AlertIcon,
  Container,
  AlertTitle,
  Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";

const GeneralAlert = () => {
  return (
    <>
      <Container mb={-10}>
        <Alert
          status="info"
          borderRadius="lg"
          variant="solid"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
        >
          <AlertIcon />
          <Text>
            Bonsai Warrior NFTs are now tradable on the
            <Link to={"/marketplace/" + process.env.MARKETPLACE_COLLECTION}>
              {" "}
              <u>marketplace</u>
            </Link>
          </Text>
        </Alert>
      </Container>
    </>
  );
};

export default GeneralAlert;
