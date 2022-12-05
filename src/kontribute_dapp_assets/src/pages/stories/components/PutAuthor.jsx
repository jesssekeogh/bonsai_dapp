import React, { useState, useEffect } from "react";
import {
  Input,
  Button,
  useColorModeValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  createStandaloneToast,
  useDisclosure,
  Image as ChakraImage,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Center,
  Flex,
  Avatar,
  MenuGroup,
  Center,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import { CheckIcon, ChevronDownIcon, SpinnerIcon } from "@chakra-ui/icons";
import { tokenToText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import {
  startIndexClient,
  startStoryServiceClient,
} from "../../CanDBClient/client";
import {
  FailedToast,
  SendingToast,
  SuccessToast,
} from "../../../containers/toasts/Toasts";
import { CgProfile } from "react-icons/cg";
import AvatarPic from "./AvatarPic";
import { nft_fetch, useAnvilDispatch } from "@vvv-interactive/nftanvil-react";
import { GetMine } from "../../components";

const { toast } = createStandaloneToast();
// for create page:
const PutAuthor = ({ pk, address, author }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue("white", "#111111");
  const anvilDispatch = useAnvilDispatch();

  const indexClient = startIndexClient();
  const storyServiceClient = startStoryServiceClient(indexClient);

  const [profilePicId, setProfilePicId] = useState("");
  const [pseudonym, setPseudonym] = useState("");
  const [bio, setBio] = useState("");

  const [ownedTokens, setOwnedTokens] = useState([]);
  const [startAmount, setStartAmount] = useState(0);
  const [endAmount, setEndAmount] = useState(5);

  const [refresh, setRefresh] = useState(false);

  const saveAuthorDetails = async () => {
    if (pseudonym === "" || bio === "") {
      return FailedToast("Failed", "Fields cannot be empty");
    } else if (profilePicId.id.toLowerCase().substring(0, 4) !== "nfta") {
      return FailedToast("Failed", "Invalid NFTA token ID");
    } else if (pseudonym.length > 15) {
      return FailedToast("Failed", "Name cannot be greater than 15 characters");
    } else if (bio.length > 160) {
      return FailedToast("Failed", "Bio cannot be greater than 160 characters");
    }
    onClose();
    SendingToast("Updating profile info...");

    const can =
      await indexClient.indexCanisterActor.createStoryServiceCanisterParitition();
    console.log("Your canister:", can);
    try {
      await storyServiceClient.update(pk, "", (actor) =>
        actor.putAuthorDetails({
          nftProfilePic: profilePicId.id,
          pseudonym: pseudonym,
          bio: bio,
        })
      );
      toast.closeAll();
      closeModal();
      SuccessToast("Success", "Profile updated!");
      setRefresh(true);
    } catch (e) {
      closeModal();
      toast.closeAll();
      FailedToast("Failed", e.toString());
    }
  };

  const load = async () => {
    let tokens = await anvilDispatch(GetMine());
    let tokenPromises = [];
    let tokenThumbUrls = [];

    if (startAmount > tokens.length) {
      setStartAmount(0);
      setEndAmount(5);
      return;
    }

    for (let token of tokens) {
      if (tokenPromises.length < endAmount) {
        const thumb = anvilDispatch(nft_fetch(tokenToText(token)));
        tokenPromises.push({ tokenId: token, thumb: thumb });
      } else {
        break;
      }
    }

    await Promise.allSettled(
      tokenPromises.map(async (data) => {
        const { thumb, name } = await data.thumb;
        const url = thumb.internal ? thumb.internal.url : thumb.external;

        tokenThumbUrls.push({ tokenId: data.tokenId, url: url, name: name });
      })
    );

    setOwnedTokens(tokenThumbUrls.slice(startAmount, endAmount));
  };

  const loadMorePics = () => {
    setStartAmount(endAmount);
    setEndAmount(endAmount + 5);
  };

  const closeModal = () => {
    setProfilePicId("");
    setPseudonym("");
    setBio("");
    onClose();
  };

  useEffect(() => {
    load();
  }, [startAmount, endAmount]);

  return (
    <Stack
      gap={2}
      bg={bgColor}
      boxShadow={"xl"}
      rounded={"lg"}
      p={{ base: 3, lg: 5 }}
      maxW={{ base: "auto", lg: "350px" }}
      mb={3}
    >
      <AvatarPic
        refresh={refresh}
        author={author}
        address={address}
        smallView={false}
      />
      <Button
        leftIcon={<CgProfile />}
        boxShadow="base"
        w="full"
        _hover={{
          boxShadow: "md",
        }}
        onClick={onOpen}
      >
        Edit profile
      </Button>

      <Modal isOpen={isOpen} onClose={closeModal} isCentered>
        <ModalOverlay />
        <ModalContent mx={2}>
          <ModalHeader>
            <Center>New profile details</Center>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack p={3} gap={3}>
              <Center>
                <Menu>
                  <MenuButton
                    as={Button}
                    rightIcon={<ChevronDownIcon />}
                    minH="48px"
                  >
                    <Flex align="center">
                      <ChakraImage
                        boxSize="2rem"
                        borderRadius="full"
                        fallback={
                          <Avatar size={"sm"} mr="12px" bg="teal.500" />
                        }
                        src={profilePicId.url}
                        alt="Fluffybuns the destroyer"
                        mr="12px"
                      />
                      <span>
                        {profilePicId === ""
                          ? "Profile picture"
                          : profilePicId.name}
                      </span>
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuGroup title="owned collectibles">
                      {ownedTokens.map((token) => (
                        <MenuItem
                          minH="48px"
                          key={token.tokenId}
                          onClick={() =>
                            setProfilePicId({
                              id: tokenToText(token.tokenId),
                              url: token.url,
                              name: token.name,
                            })
                          }
                        >
                          <ChakraImage
                            boxSize="2rem"
                            borderRadius="full"
                            fallback={
                              <Avatar size={"sm"} mr="12px" bg="teal.500" />
                            }
                            src={token.url}
                            mr="12px"
                          />
                          <span>{token.name}</span>
                        </MenuItem>
                      ))}
                      <MenuItem
                        minH="48px"
                        icon={<SpinnerIcon />}
                        onClick={() => loadMorePics()}
                        closeOnSelect={false}
                      >
                        Load more...
                      </MenuItem>
                    </MenuGroup>
                  </MenuList>
                </Menu>
              </Center>
              <Input
                variant="flushed"
                placeholder="username..."
                mb={3}
                isInvalid={pseudonym.length > 15}
                onChange={(e) => setPseudonym(e.target.value)}
              />
              <Textarea
                placeholder="tell us a little about yourself..."
                isInvalid={bio.length > 160}
                onChange={(e) => setBio(e.target.value)}
              />
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button
              rightIcon={<CheckIcon />}
              onClick={() => saveAuthorDetails()}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Stack>
  );
};

export default PutAuthor;
