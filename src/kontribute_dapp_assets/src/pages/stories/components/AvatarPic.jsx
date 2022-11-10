import React, { useEffect, useState } from "react";
import { Flex, Box, Avatar, Text, Tag } from "@chakra-ui/react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../../CanDBClient/client";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { NavLink } from "react-router-dom";

const AvatarPic = ({
  author,
  address,
  smallView,
  refresh,
  monetizedAddress,
  monetized,
}) => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const partitionKey = `user_${author}`;
  const queryParam = `AuthorDetailsFor_${author}`;
  const dispatch = useAnvilDispatch();
  const [src, setSrc] = useState("");
  const [defaultId, setDefaultId] = useState(true);
  const [authorDetails, setAuthorDetails] = useState({});

  const load = async () => {
    const details = await storyServiceClient.query(partitionKey, (actor) =>
      actor.getAuthorDetails(queryParam)
    );

    if (details.length > 0) {
      if ("err" in details[0].value) {
        setDefaultId(true);
      } else {
        const meta = await dispatch(
          nft_fetch(details[0].value.ok[0].nftProfilePic.toLowerCase())
        );

        meta.thumb.internal
          ? setSrc(meta.thumb.internal.url)
          : setSrc(meta.thumb.external);
        setDefaultId(false);
        setAuthorDetails(details[0].value.ok[0]);
      }
    }
  };

  useEffect(() => {
    load();
  }, [refresh]);

  return (
    <>
      {defaultId ? (
        <NavLink to={`/marketplace/${monetizedAddress}`}>
          <Flex
            align={smallView ? "center" : "end"}
            gap={2}
            _hover={{ opacity: "0.9" }}
          >
            <Avatar size={smallView ? "sm" : "md"} bg="teal.500" />{" "}
            <Text color={"gray.500"}>{`${address.substring(
              0,
              5
            )}...${address.substring(59, 64)}`}</Text>
            {monetized && !smallView ? <Tag>Selling!</Tag> : null}
          </Flex>
        </NavLink>
      ) : (
        <Box>
          <NavLink to={`/marketplace/${monetizedAddress}`}>
            <Flex
              align={smallView ? "center" : "end"}
              gap={2}
              _hover={{ opacity: "0.9" }}
            >
              <Avatar size={smallView ? "sm" : "md"} src={src} />{" "}
              <Text color={"gray.500"}>{authorDetails.pseudonym}</Text>
              {monetized && !smallView ? <Tag>Selling!</Tag> : null}
            </Flex>
          </NavLink>
          {!smallView ? (
            <Text mt={3} color={"gray.500"}>
              "{authorDetails.bio}"
            </Text>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default AvatarPic;
