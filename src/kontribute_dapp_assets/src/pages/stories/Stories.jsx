import React, { useEffect, useState } from "react";
import bonsai_bg from "../../../assets/beauty_render3_5.png";
import placeholder from "../../../assets/576x324.png";
import people from "../../../assets/undraw_People.png";
import BonsaiLogo from "../../../assets/Bonsai-Team-ICON-Black.png";
import { LoadingSpinner } from "../../containers";
import Story from "./Story";

// as app grows add to json:
const bonsai_details = {
  title: "Bonsai Warriors",
  description:
    "In the Celestial Empire, a land ruled by Immortal Warriors of peerless skill and furiosity, a young talent is discovered. Born from humble beginnings can they learn not just to survive but to thrive in the new world opening up before them. Vote on the next evolution in this interactive story.",
  slideDelay: null,
  imgbg: bonsai_bg,
  author: "Team Bonsai",
  authorimg: BonsaiLogo,
  tags: ["Fantasy", "Adventure"],
  link: "/stories/bonsai-all",
};

const community_details = {
  title:"Community Stories",
  description: "Read through some of the community stories that have been posted on Kontribute for our Community Story Challenge. The story with the most votes will be featured in its own section in the dapp, and we will personally create some NFTs for the winning story and list them on our dapp for public sale.",
  slideDelay: 200,
  imgbg: placeholder,
  author: "Community",
  authorimg: people,
  tags: ["All Genres"],
  link: "/stories/community-stories"
};

const Stories = () => {
  // optimise image loading
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsReady(true);
    };
    img.src = bonsai_bg;
    window.scrollTo(0, 0);
  }, []);

  if(!imageIsReady) return <LoadingSpinner />
  return (
    <div>
        <div>
          <Story {...bonsai_details} />
          {/* <Story {...community_details} />
          <Story {...community_details} /> */}
        </div>
    </div>
  );
};

export default Stories;
