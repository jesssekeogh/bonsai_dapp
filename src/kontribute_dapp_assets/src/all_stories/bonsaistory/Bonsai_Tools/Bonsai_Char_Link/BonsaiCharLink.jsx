import React from "react";
import {NavLink} from "react-router-dom";
import {Tooltip} from "@chakra-ui/react";

const BonsaiCharLink = (props) => {
  return (
    <>
      <Tooltip label="View NFT">
        <NavLink to={`${"/nft/"}${props.name}`}>
          <u className="char__link">{props.name}</u>
        </NavLink>
      </Tooltip>
    </>
  );
};

export default BonsaiCharLink;
