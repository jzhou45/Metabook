import React from "react";
import LoginForm from "./session/login_form_container";
import SignupForm from "./session/signup_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBar from "./newsfeed/navbar_container";
import Profile from "./profile/profile_container";
import { Route } from "react-router-dom";
import NavBarModal from "./newsfeed/navbar_modal_container";

const App = () => (
  <div>
    <AuthRoute exact path="/" component={LoginForm} />
    <AuthRoute exact path="/" component={SignupForm} />
    <ProtectedRoute path="/" component={NavBar} />
    <ProtectedRoute path="/" component={NavBarModal} />
    <ProtectedRoute path="/users/:usersId" component={Profile} />
  </div>
);

export default App;