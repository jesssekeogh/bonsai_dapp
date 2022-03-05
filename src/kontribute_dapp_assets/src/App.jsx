import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// pages:
import Home from "./Home";
import Stories from "./Stories";
import NFT from "./NFT";
import Create from "./Create";
import { Footer } from "./containers";
import CommunityUploads from "./CommunityUploads";

// design
import klogo from "../assets/kontribute_logo.png";
import { CgInfinity } from "react-icons/cg";
import { Box, Image, Center, Button, Image } from "@chakra-ui/react";

// for the actor
import { AuthClient } from "@dfinity/auth-client";
// for Bonsai Warriors votes:
import { createActor, canisterId } from "../../declarations/kontribute_dapp";
// for storing the user
import { UserContext } from "./Context";

// bonsai links:
import { BonsaiWarriorsPrologue } from "./all_stories/bonsaistory";
import { BonsaiAll } from "./all_stories/bonsaistory";

// this is the launch page:

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [client, setClient] = useState();

  const initAuth = async () => {
    const client = await AuthClient.create();
    const isAuthenticated = await client.isAuthenticated();

    setClient(client);

    if (isAuthenticated) {
      const identity = client.getIdentity();
      const principal = identity.getPrincipal().toString();
      setSignedIn(true);
      setPrincipal(principal);
    }
  };

  const signIn = async () => {
    const { identity, principal } = await new Promise((resolve, reject) => {
      client.login({
        identityProvider: "http:/qoctq-giaaa-aaaaa-aaaea-cai.localhost:8000/", //"https://identity.ic0.app",
        onSuccess: () => {
          const identity = client.getIdentity();
          const principal = identity.getPrincipal().toString();
          resolve({ identity, principal });
        },
        onError: reject,
      });
    });
    setSignedIn(true);
    setPrincipal(principal);
  };

  // signing actor so the user can interact with smart contracts with their principal
  const signActor = async () => {
    const identity = await client.getIdentity();
    const userActor = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });
    return userActor;
  };

  const signOut = async () => {
    await client.logout();
    setSignedIn(false);
    setPrincipal("");
  };

  useEffect(() => {
    initAuth();
  }, []);

  return (
    <div>
      {!signedIn && client ? (
        <div>
          <Center mt="10rem">
            <Box
              maxW="sm"
              borderWidth="1px"
              borderColor="#9d8144"
              borderRadius="lg"
              overflow="hidden"
            >
              <Center>
                <Image p="5" maxH="300px" src={klogo} alt="kontribute" />
              </Center>
              <Box p="3">
                <Box display="flex" alignItems="baseline">
                  <Box
                    color="gray.500"
                    fontWeight="semibold"
                    letterSpacing="wide"
                    fontSize="xs"
                    textTransform="uppercase"
                  >
                    Please Authenticate to enter Kontribute
                  </Box>
                </Box>

                <Box mt="3">
                  <Center>
                    <div className="bonsai__auth-button">
                      <Button
                        onClick={signIn}
                        rightIcon={<CgInfinity />}
                        colorScheme="#0a0a0d"
                        bg="#9d8144"
                      >
                        Authenticate
                      </Button>
                    </div>
                  </Center>
                </Box>
              </Box>
            </Box>
            </Center>
          <Footer />
        </div>
      ) : null}

      {signedIn ? (
        <>
          <Router>
            <UserContext.Provider value={{ principal, signOut, signActor }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/nft" element={<NFT />} />
                <Route path="/create" element={<Create />} />
                <Route path="/bonsai-all" element={<BonsaiAll />} />
                <Route path="/bonsai-warriors-prologue" element={<BonsaiWarriorsPrologue />} />
                <Route path="/community-stories" element={<CommunityUploads />} />
              </Routes>
            </UserContext.Provider>
          </Router>
        </>
      ) : null}
    </div>
  );
}

export default App;
