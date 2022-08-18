import React from "react";
import LoginForm from "./session/login_form_container";
import SignupForm from "./session/signup_form_container";
import { AuthRoute, ProtectedRoute } from "../util/route_util";
import NavBar from "./newsfeed/navbar_container";

const App = () => (
  <div>
    <AuthRoute exact path="/" component={LoginForm} />
    <AuthRoute exact path="/" component={SignupForm} />
    <ProtectedRoute exact path="/" component={NavBar} />
  </div>
);

export default App;