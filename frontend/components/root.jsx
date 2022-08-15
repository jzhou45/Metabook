import React from "react";
import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import Test from "./test";
// import App from "./App";



const Root = ({ store }) => (
  <Provider store={store}>
    <HashRouter>
        <Test />
    </HashRouter>
  </Provider>
);

export default Root;