import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import { NavBar, LoadingSpinner } from "./containers";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { Footer } from "./containers/index";

function App() {
  // global state:
  const [quickView, setQuickView] = useState(false);
  const [currentMarketplace, setCurrentMarketplace] = useState(
    process.env.MARKETPLACE_COLLECTION
  );

  const loaded = useAnvilSelector((state) => state.user.map.history);
  if (!loaded) return <LoadingSpinner />;

  return (
    <>
      <Router>
        <NavBar currentMarketplace={currentMarketplace} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/inventory"
            element={
              <Inventory setQuickView={setQuickView} quickView={quickView} />
            }
          />
          <Route
            path="/marketplace/:author"
            element={
              <Marketplace setCurrentMarketplace={setCurrentMarketplace} />
            }
          />
          <Route path="/nft/:tokenid" element={<LargeNft />} />
          <Route path="/stories" element={<Stories />} />
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
      </Router>
    </>
  );
}

export default App;
