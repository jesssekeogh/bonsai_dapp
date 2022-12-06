import React from "react";
import AvatarPic from "./AvatarPic";
import { Heading, Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const SmallPickBox = ({ data }) => {
  return (
    <NavLink
      to={`/stories/author_${data.author}_story_${data.groupName}_chapter_${data.title}`}
    >
      <Box mt={5}>
        <AvatarPic
          author={data.author}
          address={data.address}
          smallView={true}
          monetized={data.monetized}
        />
        <Heading ms={1} size={"sm"} mt={1} noOfLines={1}>
          {decodeURIComponent(data.groupName)}
        </Heading>
      </Box>
    </NavLink>
  );
};

export default SmallPickBox;
