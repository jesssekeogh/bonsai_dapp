import React, { useState, useEffect, lazy } from "react";
import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Button,
  SimpleGrid,
  GridItem,
  Spinner,
  useToast
} from "@chakra-ui/react";
import { Image as ChakraImage } from "@chakra-ui/react";

// get all the images
import IMAGES from '../../../../assets/bonsai_nfts';
// optimise loading
import { LazyLoadComponent } from 'react-lazy-load-image-component';

// stories page css for spinner
import "../../stories/stories.css";

const GridComponent = (props) => {

    // for toasts:
    const toast = useToast();
  
    const BuyNFT = () => {
      toast({
        title: `Bonsai Warriors minting has not begun!`,
        isClosable: true,
        position: 'top-right',
        containerStyle: {
          marginTop: "5.5rem"
        },
      });
    }

    return (
      <div href={props.pagepos}>
      <GridItem>
        <Box
          role={"group"}
          p={4}
          maxW={"330px"}
          w={"full"}
          backgroundColor={"#1e212b"}
          boxShadow={"2xl"}
          rounded={"lg"}
          pos={"relative"}
        >
          <Box rounded={"lg"} pos={"relative"}>
            <ChakraImage
              rounded={"lg"}
              height={"300px"}
              width={"auto"}
              objectFit={"cover"}
              src={props.imgsrc}
            />
          </Box>
          <Stack pt={3} align={"start"}>
            <Text
              color={"gray.500"}
              fontSize={{ base: "sm", sm: "xs", md: "md" }}
            >
              Bonsai Warrior
            </Text>
            </Stack>
            <Stack pt={2} direction={"row"} align={"center"} justify="space-between">
              <Heading
                fontSize={{ base: "lg", sm: "md", md: "lg" }}
                color={"white"}
              >
                {props.name}
              </Heading>
              <a 
                href={props.anvillink} 
                target="_blank"
                rel="noreferrer">
              <div className="nft_button_hover">
              <Button
                onClick={() => BuyNFT()}
                maxW="120px"
                rounded={"full"}
                color={"white"}
                bgGradient="linear(to-r, #c61682, #ee670d)"
                _hover={{ opacity: "0.8", transform: "scale(1.05)"}}
              >
                Minting Soon
              </Button>
              </div>
              </a>
          </Stack>
        </Box>
      </GridItem>
      </div>
    );
  };

// not all NFTs have been added
const BonsaiNFT = () => {
    // optimise image loading
    const [imageIsReady, setIsReady] = useState(false);

    useEffect(() => {
        const img = new Image();
        img.onload = () => {
        setIsReady(true);
        };
        img.src = IMAGES.bonsai_1;
        window.scrollTo(0, 0);
    }, []);

    return (
        <div>
        {!imageIsReady ? (
          <div className="bonsai__spinner">
            <Spinner
              mt="5rem"
              thickness="4px"
              speed="0.65s"
              emptyColor="#17191e"
              color="#9d8144"
              size="xl"
            />
          </div>
        ) : null}
        {imageIsReady ? (
          <Center>
          <SimpleGrid columns={[1, null, 4]} pb={5} px={10} gap={4} maxW="1500px">
          <LazyLoadComponent>
            <GridComponent name="The Veteran" imgsrc={IMAGES.bonsai_1} anvillink={} />
            <GridComponent name="Agent of Magic" imgsrc={IMAGES.bonsai_2} anvillink={}/>
            <GridComponent name="Blood Dancer" imgsrc={IMAGES.bonsai_3} anvillink={}/>
            <GridComponent name="Brash Woman" imgsrc={IMAGES.bonsai_4} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Buddhist Monk" imgsrc={IMAGES.bonsai_5} anvillink={}/>
            <GridComponent name="Red Rumbler" imgsrc={IMAGES.bonsai_6} anvillink={}/>
            <GridComponent name="Cloaked Angel" imgsrc={IMAGES.bonsai_7} anvillink={}/>
            <GridComponent name="Conquering Empress" imgsrc={IMAGES.bonsai_8} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Dark Witch" imgsrc={IMAGES.bonsai_9} anvillink={}/>
            <GridComponent name="Lady Gold" imgsrc={IMAGES.bonsai_10} anvillink={}/>
            <GridComponent name="Eagle Warrior" imgsrc={IMAGES.bonsai_11} anvillink={}/>
            <GridComponent name="Fierce Knight" imgsrc={IMAGES.bonsai_12} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Fierce Warrior" imgsrc={IMAGES.bonsai_13} anvillink={}/>
            <GridComponent name="Handmaiden" imgsrc={IMAGES.bonsai_14} anvillink={}/>
            <GridComponent name="Icy Beauty" imgsrc={IMAGES.bonsai_15} anvillink={}/>
            <GridComponent name="Lady Bear" imgsrc={IMAGES.bonsai_16} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Lady Rosette" imgsrc={IMAGES.bonsai_17} anvillink={}/>
            <GridComponent name="Holy Angel" imgsrc={IMAGES.bonsai_18} anvillink={}/>
            <GridComponent name="Noble Swordswoman" imgsrc={IMAGES.bonsai_19} anvillink={}/>
            <GridComponent name="Lady of Styx" imgsrc={IMAGES.bonsai_20} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Lady Knight" imgsrc={IMAGES.bonsai_21} anvillink={}/>
            <GridComponent name="Spear Goddess" imgsrc={IMAGES.bonsai_22} anvillink={}/>
            <GridComponent name="Spear Lady" imgsrc={IMAGES.bonsai_23} anvillink={}/>
            <GridComponent name="Sultry Lady" imgsrc={IMAGES.bonsai_24} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Swordsman Student" imgsrc={IMAGES.bonsai_25} anvillink={}/>
            <GridComponent name="Temple Guard" imgsrc={IMAGES.bonsai_26} anvillink={}/>
            <GridComponent name="Ancient Headmaster" imgsrc={IMAGES.bonsai_27} anvillink={}/>
            <GridComponent name="Demon General" imgsrc={IMAGES.bonsai_28} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Dread Knight" imgsrc={IMAGES.bonsai_29} anvillink={}/>
            <GridComponent name="Lioness of Praag" imgsrc={IMAGES.bonsai_30} anvillink={}/>
            <GridComponent name="Swords Master" imgsrc={IMAGES.bonsai_31} anvillink={}/>
            <GridComponent name="The Warlord" imgsrc={IMAGES.bonsai_32} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Warlords Bodyguard" imgsrc={IMAGES.bonsai_33} anvillink={}/>
            <GridComponent name="Prince of Sand" imgsrc={IMAGES.bonsai_34} anvillink={}/>
            <GridComponent name="Warrior Abbess" imgsrc={IMAGES.bonsai_35} anvillink={}/>
            <GridComponent name="Warrior Nun" imgsrc={IMAGES.bonsai_36} anvillink={}/>
            </LazyLoadComponent>
            <LazyLoadComponent>
            <GridComponent name="Water Witch" imgsrc={IMAGES.bonsai_37} anvillink={}/>
            <GridComponent name="River Lady" imgsrc={IMAGES.bonsai_38} anvillink={}/>
            <GridComponent name="Prince of the Hills" imgsrc={IMAGES.bonsai_39} anvillink={}/>
            <GridComponent name="Spellcaster Student" imgsrc={IMAGES.bonsai_40} anvillink={}/>
            </LazyLoadComponent>
            <GridComponent name="Swordswoman Student" imgsrc={IMAGES.bonsai_41} anvillink={}/>
          </SimpleGrid>
          </Center>
        ) : null}
      </div>
    )
}

export default BonsaiNFT
