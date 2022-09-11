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
  Create,
  Story,
  AuthorStories,
  PendragonNft,
} from "./pages";
import { CheckStats } from "./tools"
import { NavBar, LoadingSpinner } from "./containers";
import { useAnvilSelector } from "@vvv-interactive/nftanvil-react";
import { Footer } from "./containers";

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
          <Route path="/stories/create" element={<Create />} />
          <Route path="/stories/story/:storyId" element={<Story />} />
          <Route
            path="/stories/author/:principal"
            element={<AuthorStories />}
          />
          <Route path="/launchpad" element={<LaunchPad />} />
          <Route path="/launchpad/bonsai-nft" element={<BonsaiNft />} />
          <Route path="/launchpad/pendragon-nft" element={<PendragonNft />} />
          <Route path="/tools/stats" element={<CheckStats />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
