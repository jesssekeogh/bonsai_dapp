import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client"; // for the actor
import { createActor, canisterId } from "../../declarations/kontribute_dapp"; // for Bonsai Warriors votes:
import { UserContext } from "./Context"; // for storing the user
import {
  CommunityUploads,
  Create,
  Home,
  NFT,
  Stories,
  UniqueStory,
  Inventory,
} from "./pages";
import {
  BonsaiAll,
  BonsaiWarriorsPrologue,
  BonsaiWarriorsPrologueII,
  BonsaiWarriorsPrologueIII,
} from "./all_stories/bonsaistory";
import { AuthPage, NavBar, LoadingSpinner } from "./containers";

import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";

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
        identityProvider: "https://identity.ic0.app", //"http://renrk-eyaaa-aaaaa-aaada-cai.localhost:8000/",
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

  const loaded = useAnvilSelector((state) => state.user.map.history);
  if (!loaded) return <LoadingSpinner />;

  return (
    <div>
      {!signedIn && client ? (
        <div>
          <AuthPage signIn={signIn} />
        </div>
      ) : null}

      {signedIn ? (
        <>
          <Router>
            <UserContext.Provider value={{ principal, signOut, signActor }}>
              <NavBar />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/inventory" element={<Inventory />} />
                <Route path="/nft" element={<NFT />} />
                <Route path="/nft/:nftname" element={<NFT />} />
                <Route path="/create" element={<Create />} />
                <Route path="/stories/bonsai-all" element={<BonsaiAll />} />
                <Route
                  path="/stories/community-stories/"
                  element={<CommunityUploads />}
                />
                <Route
                  path="/stories/community-stories/:storyid"
                  element={<UniqueStory />}
                />
                <Route
                  path="/stories/bonsai-warriors-prologue"
                  element={<BonsaiWarriorsPrologue />}
                />
                <Route
                  path="/stories/bonsai-warriors-prologueII"
                  element={<BonsaiWarriorsPrologueII />}
                />
                <Route
                  path="/stories/bonsai-warriors-prologueIII"
                  element={<BonsaiWarriorsPrologueIII />}
                />
              </Routes>
            </UserContext.Provider>
          </Router>
        </>
      ) : null}
    </div>
  );
}

export default App;
