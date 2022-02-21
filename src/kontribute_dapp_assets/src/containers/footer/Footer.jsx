import React from "react";
import icBadge from "../../../assets/ic-badge-powered-by_label-stripe-white-text.svg";
import { Box, Image } from "@chakra-ui/react";
import "./Footer.css";

const Footer = () => {
  return (
    <div>
      <div className="Bonsai__auth_footer">
        <Box>
          <Image src={icBadge} alt="Powered by IC" />
        </Box>
      </div>
    </div>
  );
};

export default Footer;
