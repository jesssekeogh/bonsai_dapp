import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AnvilProvider } from "@vvv-interactive/nftanvil-react";
import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";

authentication.setOptions({ cookie: true });

ReactDOM.render(
  <AnvilProvider>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </AnvilProvider>,
  document.getElementById("root")
);
