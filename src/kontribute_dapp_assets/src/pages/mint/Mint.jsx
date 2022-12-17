import React, { useState, createRef, useReducer } from "react";
import {
  useAnvilDispatch,
  useAnvilSelector,
} from "@vvv-interactive/nftanvil-react";
import {
  nft_mint,
  nft_mint_quote,
} from "@vvv-interactive/nftanvil-react/src/reducers/nft.js";
import {
  validateName,
  validateExtensionCanister,
  validateHoldId,
  validateUseId,
  validateDescription,
  validateThumbInternal,
  validateContentInternal,
  validateExternal,
  validateExternalType,
  validateDescriptionOrNone,
  validateCooldown,
  validateAttributeName,
  validateAttributeChange,
  mintFormValidate,
  validateDomain,
  validateTagName,
} from "@vvv-interactive/nftanvil-tools/cjs/validate.js";
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
  Tooltip,
  Heading,
  Image as ChakraImage,
  useColorModeValue,
  createStandaloneToast,
  Textarea,
  Menu,
  MenuButton,
  MenuOptionGroup,
  MenuItemOption,
  MenuList,
} from "@chakra-ui/react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { ChevronDownIcon, CloseIcon } from "@chakra-ui/icons";
import { FailedToast } from "../../containers/toasts/Toasts";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
  HeadingColorDark,
  HeadingColorLight,
} from "../../containers/colormode/Colors";

const { toast } = createStandaloneToast();

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
  }
};

const Rarities = [
  "Common",
  "Uncommon",
  "Rare",
  "Epic",
  "Legendary",
  "Aritfact",
];

const Mint = () => {
  const anvilDispatch = useAnvilDispatch();
  const [nftContent, setNftContent] = useState("");
  const [nftThumb, setNftThumb] = useState("");

  const inputRef = createRef();

  // const [mintValues, dispatch] = useReducer(reducer, {
  //   price: 0, // mint price?
  //   domain: [],
  //   authorShare: 150,
  //   name: [],
  //   lore: [],
  //   transfer: 0,
  //   quality: 1,
  //   ttl: [0],
  //   attributes: [],
  //   tags: [],
  //   content: [],
  //   thumb: [],
  //   secret: [],
  //   custom: [],
  //   rechargeable: true,
  //   customVar: [],
  // });

  const [mintValues, dispatch] = useReducer(reducer, {
    authorShare: 150,
    name: "",
    lore: "",
    quality: "Common",
    content: "",
    thumb: "",
  });

  const MintNFT = async () => {
    let data = await anvilDispatch(
      nft_mint({
        authorShare: mintValues.authorShare,
        name: mintValues.name,
        lore: mintValues.lore,
        quality: Rarity2Number(mintValues.quality),
        content: nftContent,
        thumb: nftThumb,
      })
    );
    console.log(data);
  };

  // utility
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

  const headingColor = useColorModeValue(HeadingColorLight, HeadingColorDark);
  const bgColor = useColorModeValue("white", "#111111");
  const buttonBg = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  return (
    <Box py={{ base: 0, md: 10, lg: 12 }} pb={{ base: 10 }} p={3}>
      <SlideFade in={true} offsetY="20px">
        <Center>
          <Stack align="center" mb={5}>
            {/* <Heading
              lineHeight={1.1}
              fontWeight={"bold"}
              fontSize={{ base: "xl", lg: "3xl" }}
              color={headingColor}
            >
              Mint a collectible
            </Heading> */}
            <Heading size="sm" color="gray">
              PNG and JPG are allowed
            </Heading>
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
              p={{ base: 0, lg: 2 }}
              borderRadius="lg"
              ml={{ base: 0, lg: 20 }}
              mr={{ base: 0, md: 3 }}
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
                    setNftContent(content.url);

                    let thumb = await resizeImage(url, 432, 432);
                    setNftThumb(thumb.url);
                  } else {
                    FailedToast("Failed", "File must be an image!");
                  }
                }}
              />
              {nftContent == "" ? (
                <Button
                  boxSize={["300px", null, "600px"]}
                  border="2px dashed"
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
                  src={nftContent}
                  borderRadius="lg"
                  boxSize={["100%", null, "auto"]}
                  fallbackSrc={
                    "https://via.placeholder.com/600?text=Upload+an+image"
                  }
                />
              ) : null}
            </GridItem>
            <GridItem>
              <Box
                pos={{ base: "auto", md: "sticky" }}
                top={{ base: "auto", md: "20" }}
              >
                {nftContent !== "" ? (
                  <Tooltip label="Remove image">
                    <Button
                      mb={3}
                      onClick={() => {
                        setNftContent("");
                        setNftThumb("");
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
                    resize="none"
                    maxLength={256}
                    onChange={(e) =>
                      dispatch({
                        type: "updateDescription",
                        payload: e.target.value,
                      })
                    }
                  />
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
                    onClick={() => MintNFT()}
                  >
                    Mint
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
