import React, { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Container,
  AlertTitle,
  Text,
} from "@chakra-ui/react";

const LaunchAlert = () => {
  const launchDate = new Date("2022-05-20T13:00:00+01:00").getTime(); // IST time

  const now = new Date().getTime();

  const left = launchDate - now;

  const minutes = left / 60000;

  const hours = minutes / 60;

  const daysLeft = Math.floor(hours / 24);

  const hoursLeft = Math.floor(hours % 24);

  const minutesLeft = Math.floor(((hours % 24) % Math.floor(hours % 24)) * 60);

  return (
    <>
      <Container mb={2}>
        {/* design flex or box inside alert? */}
        <Alert
          status="info"
          borderRadius="lg"
          variant="solid"
          flexDirection="column"
          alignItems="center"
          justifyContent="start"
          textAlign="center"
        >
          <AlertIcon />
          <AlertTitle mb={1} fontSize="md">
            Launching May 20th 1pm, GMT+1
          </AlertTitle>
          <Text>
            Bonsai Warrior NFTs are launching in{" "}
            <b>
              {daysLeft} day(s) {hoursLeft} hour(s) {minutesLeft} minute(s)
            </b>
          </Text>
        </Alert>
      </Container>
    </>
  );
};

export default LaunchAlert;
