import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthClient } from "@dfinity/auth-client"; // for the actor
import { createActor, canisterId } from "../../declarations/bonsai"; // for Bonsai Warriors votes:
import { UserContext } from "./Context"; // for storing the user
import {
  Home,
  LaunchPad,
  Stories,
  Inventory,
  Marketplace,
  BonsaiNft,
  LargeNft,
} from "./pages";
import {
  BonsaiAll,
  BonsaiWarriorsPrologue,
  BonsaiWarriorsPrologueII,
  BonsaiWarriorsPrologueIII,
  BonsaiWarriorsC1,
} from "./all_stories/bonsaistory";
import { AuthPage, NavBar, LoadingSpinner } from "./containers";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { Footer } from "./containers/index";

// this is the launch page:
function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [principal, setPrincipal] = useState("");
  const [client, setClient] = useState();
  const [quickView, setQuickView] = useState(false); // global state for inventory

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
        identityProvider: "https://identity.ic0.app", //"http://rno2w-sqaaa-aaaaa-aaacq-cai.localhost:8000/",
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
    <>
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
                <Route path="/nft/:tokenid" element={<LargeNft />} />
                <Route path="/stories" element={<Stories />} />
                <Route path="/inventory" element={<Inventory setQuickView={setQuickView} quickView={quickView} />} />
                <Route path="/marketplace/:author" element={<Marketplace />} />
                <Route path="/launchpad" element={<LaunchPad />} />
                <Route path="/launchpad/bonsai-nft" element={<BonsaiNft />} />
                <Route path="/stories/bonsai-all" element={<BonsaiAll />} />
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
                <Route
                  path="/stories/bonsai-warriors-chapter-1"
                  element={<BonsaiWarriorsC1 />}
                />
              </Routes>
              <Footer />
            </UserContext.Provider>
          </Router>
        </>
      ) : null}
    </>
  );
}

export default App;
