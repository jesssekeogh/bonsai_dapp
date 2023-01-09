import React, { useEffect, useState } from "react";
import { Flex, Box, Avatar, Text, Tag } from "@chakra-ui/react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../../CanDBClient/client";
import { useAnvilDispatch, nft_fetch } from "@vvv-interactive/nftanvil-react";
import { Link } from "react-router-dom";
import { FcApproval } from "react-icons/fc";
import { VERIFIED } from "../../../containers/verified/Verified";

const AvatarPic = ({ author, address, smallView, refresh, monetized }) => {
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);
  const partitionKey = `author_${author}`;
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
    } else {
      setDefaultId(true);
    }
  };

  useEffect(() => {
    load();
  }, [refresh, author]);

  return (
    <>
      {defaultId ? (
        <Link to={`/profile/${author}`}>
          <Flex align={smallView ? "center" : "end"} gap={2}>
            <Avatar size={smallView ? "sm" : "md"} />{" "}
            <Text color={"gray.500"}>{`${address.substring(
              0,
              5
            )}...${address.substring(59, 64)}`}</Text>
            {monetized && !smallView ? <Tag>Collectible Seller</Tag> : null}
          </Flex>
        </Link>
      ) : (
        <Box>
          <Link to={`/profile/${author}`}>
            <Flex align={smallView ? "center" : "end"} gap={2}>
              <Avatar size={smallView ? "sm" : "md"} src={src} />{" "}
              <Flex align="center" gap={1}>
                <Text color={"gray.500"} noOfLines={1}>
                  {authorDetails.pseudonym}
                </Text>
                {VERIFIED.includes(authorDetails.pseudonym) ? (
                  <FcApproval />
                ) : null}
                {monetized && !smallView ? <Tag>Collectible Seller</Tag> : null}
              </Flex>
            </Flex>
          </Link>
          {!smallView ? (
            <Text mt={3} color={"gray.500"} maxW={["320px", null, "500px"]}>
              "{authorDetails.bio}"
            </Text>
          ) : null}
        </Box>
      )}
    </>
  );
};

export default AvatarPic;
