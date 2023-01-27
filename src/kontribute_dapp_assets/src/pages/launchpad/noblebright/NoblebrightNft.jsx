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
        tokenomics_link={"https://www.pendragonquest.xyz/"}
        tokenomics_details={
          "Pendragon Quest consists of 1200 hand drawn NFTs which you can own in order to access our story. Holders will be eligible to decide the path that the story takes and participate in unique story events. Holders will also be able receive our future NFT airdrop at a 1:1 ratio."
        }
        // launchingSoon
        // saleEnded
        // airdropEnded
      />
    </>
  );
};

export default NoblebrightNft;
