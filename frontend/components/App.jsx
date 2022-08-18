import React from "react";
import LoginForm from "./session/login_form_container";
import SignupForm from "./session/signup_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBar from "./newsfeed/navbar_container";
import Profile from "./profile/profile_container";
import { Route } from "react-router-dom";

const App = () => (
  <div>
    <AuthRoute exact path="/" component={LoginForm} />
    <AuthRoute exact path="/" component={SignupForm} />
    <ProtectedRoute exact path="/" component={NavBar} />
    <ProtectedRoute path="/users" component={Profile} />
  </div>
);

export default App;