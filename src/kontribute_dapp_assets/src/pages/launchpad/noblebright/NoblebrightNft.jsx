import React from "react";
import { OfferingPage } from "../lp_components";
import nobleBrightLogo from "../../../../assets/noblebright_logo.png";

const NoblebrightNft = () => {
  return (
    <>
      <OfferingPage
        collectionLogo={nobleBrightLogo}
        collectionSubHeading={"Comicbook NFTs"}
        name1={"Hooded"}
        name2={"NobleBright"}
        name3={"Priestess"}
        price1={80000000}
        price2={600000000}
        price3={350000000}
        details1={1}
        details2={10}
        details3={5}
        nfts1={1}
        nfts2={10}
        nfts3={5}
        tokenomics_link={"https://medium.com/@teambonsai.icp/noblebright-comicbook-nfts-c0e44c5526ee"}
        tokenomics_details={
          "Noblebright Comicbook NFTs consist of 1080 NFTs. Inside each NFT is a comic strip that introduces you to the Noblebright world and the main protagonist. Holders will be eligible for poll voting to decide the path that the story and NFT collection take."
        }
        // launchingSoon
        saleEnded
        // airdropEnded
      />
    </>
  );
};

export default NoblebrightNft;
