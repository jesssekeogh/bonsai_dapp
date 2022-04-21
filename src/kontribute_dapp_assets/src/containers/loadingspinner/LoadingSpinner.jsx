import React from "react";
import { Spinner } from "@chakra-ui/react";
import "../../../assets/main.css";

const LoadingSpinner = () => {
  return (
    <div className="bonsai__spinner">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="#17191e"
        color="#9d8144"
        size="xl"
      />
    </div>
  );
};

export default LoadingSpinner;
