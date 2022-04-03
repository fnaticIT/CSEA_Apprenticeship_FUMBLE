import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import ChatProvider from "./Context/ChatProvider";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../src/Pages/store";
ReactDOM.render(
  <ChakraProvider>
    <Provider store={store}>
      <BrowserRouter>
        <ChatProvider>
          <ColorModeScript initialColorMode="dark"></ColorModeScript>
          <App />
        </ChatProvider>
      </BrowserRouter>
    </Provider>
  </ChakraProvider>,
  document.getElementById("root")
);
