import React from "react";
import ReactDOM from "react-dom";
import * as SessionUtil from "./util/session_api_util"

document.addEventListener("DOMContentLoaded", () => {
    const root = document.getElementById("root");

    window.login = SessionUtil.login;
    window.logout = SessionUtil.logout;
    window.signup = SessionUtil.signup;

    ReactDOM.render(<h1>Welcome to Metabook</h1>, root);
})