import React, { useState, useEffect } from "react";
import {
  Button,
  Heading,
  Text,
  Container,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  ButtonColorDark,
  ButtonColorLight,
  ButtonTextColorDark,
  ButtonTextColorlight,
  TextColorDark,
  TextColorLight,
} from "../../containers/colormode/Colors";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { e8sToIcp } from "@vvv-interactive/nftanvil-tools/cjs/accountidentifier.js";
import { tokenFromText } from "@vvv-interactive/nftanvil-tools/cjs/token.js";
import { useSelector } from "react-redux";
import IcpToDollars from "../components/IcpToDollars";
import { BuySingle } from "../components/index";

const ForSale = ({ Icp, tokenId, tokens }) => {
  const [usdPrice, setUsdPrice] = useState(0);
  const loggedIn = useSelector((state) => state.Profile.loggedIn);

  const loadPrice = async () => {
    setUsdPrice(await IcpToDollars(Icp));
  };

  useEffect(() => {
    loadPrice();
  }, []);

  const buttonBgColor = useColorModeValue(ButtonColorLight, ButtonColorDark);
  const buttonTextColor = useColorModeValue(
    ButtonTextColorlight,
    ButtonTextColorDark
  );
  const bgColor = useColorModeValue("white", "#111111");
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  return (
    <Flex rounded={"lg"} w={{ base: "100%", md: "60%" }}>
      <Container bg={bgColor} boxShadow={"xl"} rounded={"lg"} overflow="hidden" p={4}>
        <Text
          fontWeight={600}
          fontSize={{ base: "md", md: "lg" }}
          color="#b2b8be"
          mb={2}
        >
          Current Price
        </Text>
        <Flex align="baseline" gap={1}>
          <Heading color={textColor} fontSize={{ base: "xl", md: "3xl" }}>
            {Number(e8sToIcp(Icp)).toFixed(2)}
          </Heading>
          <Text
            color={textColor}
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
          >
            ICP
          </Text>
          <Text
            fontSize={{ base: "md", md: "lg" }}
            fontWeight="bold"
            color="gray.500"
          >
            &nbsp;{usdPrice}
          </Text>
        </Flex>
        {!tokens.includes(tokenFromText(tokenId)) ? (
          <BuySingle tokenId={tokenId} price={Icp}>
            <Button
              leftIcon={<MdOutlineAccountBalanceWallet />}
              bg={buttonBgColor}
              color={buttonTextColor}
              mt={3}
              w="full"
              size="lg"
              _hover={{ opacity: "0.8" }}
              isDisabled={loggedIn ? false : true}
            >
              Buy now
            </Button>
          </BuySingle>
        ) : null}
      </Container>
    </Flex>
  );
};

export default ForSale;
