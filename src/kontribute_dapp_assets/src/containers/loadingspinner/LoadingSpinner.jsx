import React from "react";
import { Spinner, Text, useColorModeValue } from "@chakra-ui/react";
import "../../../assets/main.css";
import { TextColorDark, TextColorLight } from "../colormode/Colors";

const LoadingSpinner = ({ label }) => {
  const textColor = useColorModeValue(TextColorLight, TextColorDark);
  return (
    <>
      <div className="bonsai__spinner">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="#17191e"
          color="#9d8144"
          size="xl"
        />
      </div>
      <div className="bonsai__spinner_text">
        <Text fontWeight={600} color={textColor}>
          {label}
        </Text>
      </div>
    </>
  );
};

export default LoadingSpinner;
