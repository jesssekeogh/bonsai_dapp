import React, { useEffect, useState } from "react";
import { Center, SimpleGrid } from "@chakra-ui/react";
import logo from "../../../assets/Bonsai-Team-ICON-Black.png";
import bonsailogo from "../../../assets/Bonsai_Warriors_Background_1.png";
import pendragonBG from "../../../assets/pendragon.png";
import pendragonLogo from "../../../assets/pendragon_logo.png";
import { LoadingSpinner } from "../../containers";
import { CollectionThumb } from "./lp_components";

const LaunchPad = () => {
  const [imageIsReady, setIsReady] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsReady(true);
    };
    img.src = bonsailogo;
    window.scrollTo(0, 0);
  }, []);

  if (!imageIsReady) return <LoadingSpinner label="Loading collections..." />;
  return (
    <div>
      <Center>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          pb={5}
          mt={{ base: "-10", md: "0" }}
          gap={5}
          maxW="1250px"
          mx="5"
        >
          <CollectionThumb
            colimg={bonsailogo}
            title={"Bonsai Warrior NFTs"}
            description={
              "A collection of 1100 hand crafted NFTs from the Bonsai Warriors story"
            }
            tags={["Fantasy", "Adventure"]}
            author={"Team Bonsai"}
            authorimg={logo}
            link={"/launchpad/bonsai-nft"}
          />
        </SimpleGrid>
      </Center>
    </div>
  );
};

export default LaunchPad;
