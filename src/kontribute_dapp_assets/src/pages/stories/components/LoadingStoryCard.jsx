import React from "react";
import {
  Flex,
  Container,
  useColorModeValue,
  SkeletonText,
  SkeletonCircle,
  Skeleton,
} from "@chakra-ui/react";
import {
  TextColorDark,
  TextColorLight,
} from "../../../containers/colormode/Colors";

const LoadingStoryCard = () => {
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
      >
        <Flex align="center" gap={2}>
          <SkeletonCircle size="8" />
          <Skeleton height="15px" w={"100px"} />
        </Flex>
        <SkeletonText
          mt="4"
          noOfLines={4}
          spacing="4"
          w={{ base: "250px", md: "550px" }}
        />
      </Container>
    </Flex>
  );
};

export default LoadingStoryCard;
