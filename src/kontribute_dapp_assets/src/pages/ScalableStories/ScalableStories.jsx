import React, { useState } from "react";
import { greetUser, putUser } from "./api";
import { Text, Heading, Input, Button, Container } from "@chakra-ui/react";

const ScalableStories = () => {
  const [greetName, setGreetName] = useState("");
  const [name, setName] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [greetingResponse, setGreetingResponse] = useState("");
  const [greetErrorText, setGreetErrorText] = useState("");
  const [createErrorText, setCreateErrorText] = useState("");
  const region = "us-east-1";

  async function getUserGreeting() {
    if (greetName === "") {
      let errorText = "must enter a name to try to greet";
      console.error(errorText);
      setGreetErrorText(errorText);
    } else {
      setGreetErrorText("");
      let greeting = await greetUser(region, greetName);
      console.log("response", greeting);
      setGreetingResponse(greeting);
    }
  }

  async function createUser() {
    if (name === "" || zipCode == "") {
      let errorText = "must enter a name and a zipCode for user";
      console.error(errorText);
      setCreateErrorText(errorText);
    } else {
      setCreateErrorText("");
      // create the canister for the partition key if not sure that is exists
      await indexClient.indexCanisterActor.createHelloServiceCanisterByRegion(
        region
      );
      // create the new user
      putUser(region, name, zipCode);
    }
  }

  return (
    <Container py={10}>
      Hello world!
      <Text mb={2}>Region is {region}</Text>
      <Heading size="md">
        Set username to greet
        <Input
          value={greetName}
          onChange={(ev) => setGreetName(ev.target.value)}
        />
      </Heading>
      <Button type="button" onClick={getUserGreeting}>
        Get user greeting
      </Button>
      <Heading mb={5}>Greeting response: {greetingResponse}</Heading>
      <div>{greetErrorText}</div>
      <Heading size="md">
        Set username to create
        <Input value={name} onChange={(ev) => setName(ev.target.value)} />
      </Heading>
      <Heading size="md">
        Set zipCode for username
        <Input value={zipCode} onChange={(ev) => setZipCode(ev.target.value)} />
      </Heading>
      <Button type="button" onClick={createUser}>
        Create username
      </Button>
      <div>{createErrorText}</div>
    </Container>
  );
};

export default ScalableStories;
