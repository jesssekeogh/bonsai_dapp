import React, { useState, useEffect } from "react";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../../CanDBClient/client";
import AvatarPic from "./AvatarPic";
import { unwrapStory } from "./Unwrapping";
import { Heading, Box, Flex, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const SmallPickBox = ({ storySortKey }) => {
  const partitionKey = `author_${storySortKey.split("_")[1]}`;
  const [data, setData] = useState({});
  const [loaded, setLoaded] = useState(false);
  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const load = async () => {
    const storyData = await storyServiceClient.query(partitionKey, (actor) =>
      actor.getStory(storySortKey)
    );

    setData(unwrapStory(storyData));
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <NavLink to={`/stories/${storySortKey}`}>
      <Box mt={5}>
        {loaded ? (
          <>
            <AvatarPic
              author={data.author}
              address={data.address}
              smallView={true}
              monetized={data.monetized}
            />
            <Heading ms={1} size={"sm"} mt={1} noOfLines={1}>
              {decodeURIComponent(data.groupName)}
            </Heading>
          </>
        ) : (
          <>
            <Flex align="center" gap={2}>
              <SkeletonCircle size="9" />
              <Skeleton height="12px" w={"150px"} />
            </Flex>
            <Skeleton height="12px" mt={3} w={"150px"} />
          </>
        )}
      </Box>
    </NavLink>
  );
};

export default SmallPickBox;
