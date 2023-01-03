import React from "react";
import AvatarPic from "./AvatarPic";
import { Heading, Box, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import {
  TextColorDark,
  TextColorLight,
} from "../../../containers/colormode/Colors";

const SmallPickBox = ({ data }) => {
  const textColor = useColorModeValue(TextColorLight, TextColorDark);

  return (
    <Box mt={5}>
      <AvatarPic
        author={data.author}
        address={data.address}
        smallView={true}
        monetized={data.monetized}
      />
      <NavLink
        to={`/stories/author_${data.author}_story_${data.groupName}_chapter_${data.title}`}
      >
        <Heading ms={1} size={"sm"} mt={1} noOfLines={1} color={textColor}>
          {decodeURIComponent(data.groupName)}
        </Heading>
        <Heading size={"sm"} color={textColor} ms={1} my={1} noOfLines={1}>
          {decodeURIComponent(data.title)}
        </Heading>
      </NavLink>
    </Box>
  );
};

export default SmallPickBox;
