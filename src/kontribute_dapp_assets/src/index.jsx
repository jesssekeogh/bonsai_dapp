import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AnvilProvider } from "@vvv-interactive/nftanvil-react";

ReactDOM.render(
  <AnvilProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </AnvilProvider>,
  document.getElementById("root")
);
