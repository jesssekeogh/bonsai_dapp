import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { AnvilProvider } from "@vvv-interactive/nftanvil-react";
import { Provider } from "react-redux";
import { store } from "./state/store";

import authentication from "@vvv-interactive/nftanvil-react/cjs/auth.js";

authentication.setOptions({ cookie: true });

ReactDOM.render(
  <ChakraProvider>
    <AnvilProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AnvilProvider>
  </ChakraProvider>,
  document.getElementById("root")
);
