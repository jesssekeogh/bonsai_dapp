import React from "react";
import { Spinner, Text, Center } from "@chakra-ui/react";
import "../../../assets/main.css";

const LoadingSpinner = ({ label }) => {
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
        <Text fontWeight={600} color="#f0e6d3">
          {label}
        </Text>
      </div>
    </>
  );
};

export default LoadingSpinner;
