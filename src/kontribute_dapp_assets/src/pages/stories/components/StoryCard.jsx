import React from "react";
import {
  Heading,
  Flex,
  Tag,
  Container,
  useColorModeValue,
  Button,
  Text,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../../containers/colormode/Colors";
import moment from "moment";
import { NavLink } from "react-router-dom";
import { ViewIcon } from "@chakra-ui/icons";
import { FaHeart } from "react-icons/fa";
import AvatarPic from "./AvatarPic";
import * as DOMPurify from "dompurify";
import { useLocation } from "react-router-dom";

const StoryCard = ({ data }) => {
  let created = Number(data.time) / 1000000;

  const time = new Date(created);
  const location = useLocation();

  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  return (
    <Flex rounded={"lg"} my={3} _hover={{ boxShadow: "md" }}>
      <Container
        bg={bgColor}
        color={textColor}
        boxShadow={"xl"}
        rounded={"lg"}
        p={4}
        overflow="hidden"
      >
        <Flex align="center" gap={2}>
          <AvatarPic
            author={data.author}
            address={data.address}
            smallView={true}
            monetized={data.monetized}
          />
          ·
          <Text color={"gray.500"} noOfLines={1}>
            {moment(time.getTime()).fromNow()}
          </Text>
        </Flex>
        <NavLink
          to={`/stories/author_${data.author}_story_${data.groupName}_chapter_${data.title}`}
          state={{ previous: location.pathname }}
        >
          <Heading size={"md"} mt={1} noOfLines={1}>
            {decodeURIComponent(data.groupName)}
          </Heading>
          <Heading size={"sm"} my={2} noOfLines={1}>
            {decodeURIComponent(data.title)}
          </Heading>
          <Text
            noOfLines={2}
            wordBreak="break-word"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(decodeURIComponent(data.body), {
                FORBID_ATTR: ["style"],
                ALLOWED_TAGS: [""],
              }),
            }}
          ></Text>
          <Flex mt={3} gap={{ base: 1, md: 2 }} align={"center"}>
            <Tag>
              {data.genre === "Web3Author Competition"
                ? "Competition"
                : data.genre}
            </Tag>
            {data.proposals > 1 ? <Tag>Poll ✅</Tag> : null}·
            <Button
              bg={"none"}
              p={0}
              m={0}
              size="sm"
              color="gray.500"
              leftIcon={<ViewIcon />}
              _hover={{ bg: "none", cursor: "default" }}
            >
              {data.views.toLocaleString()}
            </Button>
            ·
            <Button
              bg={"none"}
              p={0}
              m={0}
              size="sm"
              color="gray.500"
              leftIcon={<FaHeart />}
              _hover={{ bg: "none", cursor: "default" }}
            >
              {data.likes.toLocaleString()}
            </Button>
          </Flex>
        </NavLink>
      </Container>
    </Flex>
  );
};

export default StoryCard;
