import React from "react";
import {
  Alert,
  AlertIcon,
  Container,
  AlertTitle,
  Text,
} from "@chakra-ui/react";

const LaunchAlert = () => {

  let launchDate = new Date("2022-07-10T13:00:00+01:00").getTime(); // IST time

  let now = new Date().getTime();

  let left = launchDate - now;

  let minutes = left / 60000;

  let hours = minutes / 60;

  let daysLeft = Math.floor(hours / 24);

  let hoursLeft = Math.floor(hours % 24);

  let minutesLeft = Math.floor(((hours % 24) - Math.floor(hours % 24)) * 60);

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
            Launching July 10th 1pm, GMT+1
          </AlertTitle>
          <Text>
            Pendragon Quest NFTs are launching in{" "}
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
