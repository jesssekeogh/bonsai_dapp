import React, { useEffect } from "react";
import React from "react";
import BonsaiNFT from "./bonsai_NFT/BonsaiNFT";

const NFT = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <BonsaiNFT />
    </div>
  );
};

export default NFT;
