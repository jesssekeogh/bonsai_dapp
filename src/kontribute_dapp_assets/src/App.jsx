import React from "react";
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
import { NavBar, LoadingSpinner } from "./containers";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { Footer } from "./containers/index";

function App() {
  const loaded = useAnvilSelector((state) => state.user.map.history);
  if (!loaded) return <LoadingSpinner />;

  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inventory" element={<Inventory />} />
          <Route path="/marketplace/:author" element={<Marketplace />} />
          <Route path="/nft/:tokenid" element={<LargeNft />} />
          <Route path="/stories" element={<Stories />} />
          <Route path="/launchpad" element={<LaunchPad />} />
          <Route path="/launchpad/bonsai-nft" element={<BonsaiNft />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
