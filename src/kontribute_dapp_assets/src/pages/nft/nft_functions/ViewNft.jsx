import React, { useEffect, useState } from "react";
import {
  useBreakpointValue,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Tag,
  Text,
  PopoverArrow,
  PopoverBody,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Icon
} from "@chakra-ui/react";
import { ViewIcon } from "@chakra-ui/icons";
import { Image as ChakraImage } from "@chakra-ui/react";
import {
  tokenUrl,
  tokenToText,
} from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  useAnvilSelector,
  nft_fetch,
  useAnvilDispatch,
} from "@vvv-interactive/nftanvil-react";

const NftTags = (props) => {
  return (
    <>
      {props.tags.map((tag) => {
        return (
          <Tag
            me={1}
            fontStyle={"italic"}
            my={1}
            size={useBreakpointValue(["sm", "md"])}
            variant="solid"
            colorScheme="blue"
            key={tag}
          >
            {tag}
          </Tag>
        );
      })}
    </>
  );
};

const ViewNft = ({ tokenId, popover }) => {
  const map = useAnvilSelector((state) => state.user.map);
  const dispatch = useAnvilDispatch();

  const [data, setData] = useState({});
  const [Loaded, setLoaded] = useState(false);

  const load = async () => {
    const meta = await dispatch(nft_fetch(tokenToText(tokenId)));
    let NftData = {
      id: tokenId,
      name: meta.name,
      quality: meta.quality,
      lore: meta.lore,
      attributes: meta.attributes,
      tags: meta.tags,
    };
    setData(NftData);
    setLoaded(true);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <>
      <Popover placement="top-end" isLazy>
        <PopoverTrigger>
          <Text w={"100%"}><Icon as={ViewIcon} me={2}/>View NFT</Text>
        </PopoverTrigger>
        <PopoverContent width={"auto"} mx={2} backgroundColor={"#1e212b"}>
          <PopoverArrow />
          <PopoverBody>
            {Loaded ? (
              <ChakraImage
                bg="#fff"
                rounded={"lg"}
                height={["300px", null, "400px"]}
                width={"auto"}
                objectFit={"cover"}
                src={tokenUrl(map.space, tokenId, "content")}
              />
            ) : (
              <SkeletonCircle size="300" />
            )}
            <Text
              maxW={["300px", null, "400px"]}
              color={"#e79301"}
              fontWeight="bold"
              fontSize="17pt"
              fontStyle={"italic"}
              mt={1}
            >
              {Loaded ? (
                data.name
              ) : (
                <Skeleton height="15px" width={"80px"} my={2} />
              )}
            </Text>
            {Loaded ? (
              <NftTags tags={data.tags} />
            ) : (
              <SkeletonCircle size="5" />
            )}
            <Text
              maxW={["300px", null, "400px"]}
              fontWeight={600}
              color="#f0e6d3"
              mb={2}
            >
              {Loaded ? (
                data.lore
              ) : (
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              )}
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default ViewNft;
