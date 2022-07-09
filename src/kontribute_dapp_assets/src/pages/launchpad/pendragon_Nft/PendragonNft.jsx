import React from "react";
import { OfferingPage } from "../lp_components";
import logo from "../../../../assets/pendragon_logo.png";

const PendragonNft = () => {
  return (
    <>
      <OfferingPage
        title={"Pendragon Quest presents"}
        collectionName={"Pendragon Quest NFTs"}
        img={logo}
        name1={"Knight"}
        name2={"Arthur's Chosen"}
        name3={"Knight Commander"}
        price1={80000000}
        price2={600000000}
        price3={350000000}
        details1={"1 Pendragon Quest NFT"}
        details2={"10 Pendragon Quest NFTs"}
        details3={"5 Pendragon Quest NFTs"}
        nfts1={1}
        nfts2={10}
        nfts3={5}
        tokenomics_link={"https://www.pendragonquest.xyz/"}
        tokenomics_details={
          "Pendragon Quest consists of 1200 hand drawn NFTs which you can own in order to access our story. Holders will be eligible to decide the path that the story takes and participate in unique story events. Holders will also be able receive our future NFT airdrop at a 1:1 ratio."
        }
        // launchingSoon
        //   saleEnded
        //   airdropEnded
      />
    </>
  );
};

export default PendragonNft;
