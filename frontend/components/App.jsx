import React from "react";
import LoginForm from "./session/login_form_container";
import SignupForm from "./session/signup_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBar from "./navbar/navbar_container";
import Profile from "./profile/profile_container";
import { Route } from "react-router-dom";
import NavBarModal from "./navbar/navbar_modal_container";
import AboutMe from "./profile/about_me_container";

const App = () => (
  <div>
    <AuthRoute exact path="/" component={LoginForm} />
    <AuthRoute exact path="/" component={SignupForm} />
    <ProtectedRoute path="/" component={NavBar} />
    <ProtectedRoute path="/" component={NavBarModal} />
    <ProtectedRoute path="/users/:usersId" component={Profile} />
    <ProtectedRoute path="/users/:usersId" component={AboutMe} />
  </div>
);

export default App;