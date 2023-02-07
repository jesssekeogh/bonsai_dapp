import React, { useState, createRef, useReducer, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { useSelector } from "react-redux";
import {
  nft_mint,
  nft_mint_quote,
} from "@vvv-interactive/nftanvil-react/cjs/reducers/nft.js";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { resizeImage } from "@vvv-interactive/nftanvil-tools/cjs/image.js";
import {
  Center,
  SimpleGrid,
  GridItem,
  SlideFade,
  Stack,
  Center,
  Button,
  Box,
  Input,
  Text,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Tooltip,
  Heading,
  Image as ChakraImage,
  useColorModeValue,
  Textarea,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
} from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ImInfinite } from "react-icons/im";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { FailedToast, SuccessToast } from "../../containers/toasts/Toasts";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
} from "../../containers/colormode/Colors";
import ChainAndStandard from "../components/ChainAndStandard";
import { Usergeek } from "usergeek-ic-js";

const returnMintRecord = (
  name,
  lore,
  quality,
  nftContent,
  nftThumb,
  royalty
) => {
  return {
    domain: [],
    authorShare: royalty,
    name: [name],
    lore: [lore],
    transfer: {
      ["unrestricted"]: null,
    },
    quality: quality,
    ttl: [1036800], // 2 years
    attributes: [],
    tags: [],
    content: [
      {
        internal: {
          contentType: nftContent.type,
          size: nftContent.size,
          url: nftContent.url,
        },
      },
    ],
    thumb: {
      internal: {
        contentType: nftThumb.type,
        size: nftThumb.size,
        url: nftThumb.url,
      },
    },
    secret: false,
    custom: [],
    rechargeable: true,
    customVar: [],
  };
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateName":
      return {
        ...state,
        name: action.payload,
      };
    case "updateDescription":
      return {
        ...state,
        lore: action.payload,
      };
    case "updateRarity":
      return {
        ...state,
        quality: action.payload,
      };
    case "updateRoyalty":
      return {
        ...state,
        royalty: action.payload,
      };
  }
};

const Rarities = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Artifact",
];

const Mint = () => {
  const anvilDispatch = useAnvilDispatch();
  const [nftContent, setNftContent] = useState("");
  const [nftThumb, setNftThumb] = useState("");
  const [isMinting, setIsMinting] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [pwrPrice, setPwrPrice] = useState(0);
  const loggedIn = useSelector((state) => state.Profile.loggedIn);

  const navigate = useNavigate();
  const inputRef = createRef();

  const [mintValues, dispatch] = useReducer(reducer, {
    name: "",
    lore: "",
    quality: "Common",
    royalty: 1,
  });

  const MintNFT = async () => {
    setIsClicked(true);
    if (
      mintValues.name === "" ||
      mintValues.lore === "" ||
      nftContent === "" ||
      nftThumb === ""
    ) {
      return;
    }

    try {
      setIsMinting(true);

      let id = await anvilDispatch(
        nft_mint(
          returnMintRecord(
            mintValues.name,
            mintValues.lore,
            Rarity2Number(mintValues.quality),
            nftContent,
            nftThumb,
            Math.round(Number(mintValues.royalty) * 100)
          )
        )
      );

      SuccessToast(
        "Congratulations!",
        "Your new collectible is in your wallet"
      );
      setIsMinting(false);
      Usergeek.trackEvent("NFTMinted");
      return navigate("/nft/" + id, {
        state: {
          prev: "/mint",
          showConfetti: true,
          totalNfts: 1,
        },
      });
    } catch (e) {
      setIsMinting(false);
      FailedToast("Failed", e.toString());
    }
  };

  const CheckMintPrice = async () => {
    try {
      let priceData = await anvilDispatch(
        nft_mint_quote(
          returnMintRecord(
            mintValues.name,
            mintValues.lore,
            Rarity2Number(mintValues.quality),
            nftContent,
            nftThumb,
            Math.round(Number(mintValues.royalty) * 100)
          )
        )
      );

      if (priceData) {
        setPwrPrice(e8sToIcp(priceData.ops + priceData.storage));
      }
    } catch (e) {
      console.log(e.toString());
    }
  };

  const Rarity2Number = (rarity) => {
    switch (rarity) {
      case "Common":
        return 1;
      case "Uncommon":
        return 2;
      case "Rare":
        return 3;
      case "Epic":
        return 4;
      case "Legendary":
        return 5;
      case "Artifact":
        return 6;
    }
  };

  const bgColor = useColorModeValue("white", "#111111");
  const buttonBg = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );

  useEffect(() => {
    CheckMintPrice();
  }, [nftThumb, mintValues.quality]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Box pb={{ base: 10, md: 12 }} mt={{ base: 5, md: 10 }} px={3}>
      <SlideFade in={true} offsetY="20px">
        <Center>
          <Stack align="center" mb={5}>
            <Heading size="sm" color="gray">
              PNG and JPG are allowed
            </Heading>
            <ChainAndStandard />
          </Stack>
        </Center>

        <Center>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            templateColumns={{ base: "auto", lg: "1fr 500px" }}
          >
            <GridItem
              boxShadow={"lg"}
              bg={bgColor}
              p={2}
              borderRadius="lg"
              ml={{ base: 0, lg: 20 }}
              mr={{ base: 0, md: 6 }}
              mb={3}
            >
              <Input
                accept="image/*"
                type="file"
                ref={inputRef}
                style={{ display: "none" }}
                multiple={false}
                onChange={async (info) => {
                  let { size, type } = info.target.files[0];

                  let url = URL.createObjectURL(info.target.files[0]);

                  if (type.indexOf("image/") !== -1) {
                    let content = await resizeImage(url, 1280, 1280);
                    setNftContent(content);

                    let thumb = await resizeImage(url, 432, 432, true);
                    setNftThumb(thumb);
                  } else {
                    FailedToast("Failed", "File must be an image!");
                  }
                }}
              />
              {nftContent == "" ? (
                <Button
                  boxSize={["95vw", null, "500px"]}
                  border="2px dashed"
                  borderColor={isClicked && nftContent === "" ? "red" : "auto"}
                  onClick={() => {
                    if (inputRef?.current) {
                      inputRef.current.value = "";
                      inputRef.current.click();
                    }
                  }}
                >
                  <Stack spacing="3">
                    <Center>
                      <AiOutlineCloudUpload color="gray.500" />
                    </Center>
                    <Box>Browse to choose an image</Box>
                  </Stack>
                </Button>
              ) : null}
              {nftContent !== "" ? (
                <ChakraImage
                  src={nftContent.url}
                  borderRadius="lg"
                  boxSize={["100%", null, "auto"]}
                  fallbackSrc={
                    "https://via.placeholder.com/600?text=Upload+an+image"
                  }
                />
              ) : null}
            </GridItem>
            <GridItem mb={12}>
              <Box
                pos={{ base: "auto", md: "sticky" }}
                top={{ base: "auto", md: "20" }}
                bg={bgColor}
                boxShadow={"xl"}
                rounded={"lg"}
                p={{ base: 3, lg: 5 }}
              >
                {nftContent !== "" ? (
                  <Tooltip label="Remove image">
                    <Button
                      mb={3}
                      onClick={() => {
                        setNftContent("");
                        setNftThumb("");
                        setPwrPrice(0);
                      }}
                    >
                      <CloseIcon />
                    </Button>
                  </Tooltip>
                ) : null}
                <Stack spacing={3}>
                  <Input
                    placeholder="Name..."
                    size="md"
                    fontWeight="bold"
                    isInvalid={isClicked && mintValues.name == ""}
                    onChange={(e) =>
                      dispatch({
                        type: "updateName",
                        payload: e.target.value,
                      })
                    }
                  />
                  <Textarea
                    placeholder="Description..."
                    size="md"
                    fontWeight="bold"
                    isInvalid={isClicked && mintValues.lore == ""}
                    resize="none"
                    maxLength={256}
                    onChange={(e) =>
                      dispatch({
                        type: "updateDescription",
                        payload: e.target.value,
                      })
                    }
                  />
                  <Text fontWeight={"bold"}>Royalties</Text>
                  <Box px={5}>
                    <Slider
                      focusThumbOnChange={false}
                      value={mintValues.royalty}
                      min={1}
                      max={10}
                      onChange={(e) =>
                        dispatch({
                          type: "updateRoyalty",
                          payload: e,
                        })
                      }
                    >
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb
                        fontSize="sm"
                        boxSize="36px"
                        color="black"
                        children={`${mintValues.royalty}%`}
                      />
                    </Slider>
                  </Box>
                  <Menu>
                    <MenuButton
                      as={Button}
                      _hover={{
                        boxShadow: "md",
                      }}
                      rightIcon={<ChevronDownIcon />}
                    >
                      {mintValues.quality}
                    </MenuButton>
                    <MenuList minWidth="240px">
                      <MenuOptionGroup title="Rarity">
                        {Rarities.map((rarity) => (
                          <MenuItemOption
                            key={rarity}
                            value={rarity}
                            onClick={() =>
                              dispatch({
                                type: "updateRarity",
                                payload: rarity,
                              })
                            }
                          >
                            {rarity}
                          </MenuItemOption>
                        ))}
                      </MenuOptionGroup>
                    </MenuList>
                  </Menu>
                  <Button
                    bg={buttonBg}
                    color={buttonTextColor}
                    isLoading={isMinting}
                    leftIcon={<ImInfinite />}
                    rightIcon={<ImInfinite />}
                    isDisabled={loggedIn ? false : true}
                    onClick={() => MintNFT()}
                    boxShadow="base"
                    _hover={{
                      boxShadow: "md",
                    }}
                  >
                    Mint
                    {pwrPrice !== 0 ? ` for ${pwrPrice} ICP` : null}
                  </Button>
                </Stack>
              </Box>
            </GridItem>
          </SimpleGrid>
        </Center>
      </SlideFade>
    </Box>
  );
};

export default Mint;
