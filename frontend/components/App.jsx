import React from "react";
import { ProtectedRoute } from "../util/route_util";
import { Redirect, Route, Switch } from "react-router-dom";
import HomePage from "./routes/homepage_container";
import ProfilePage from "./routes/profilepage_container";

const App = () => (
  <Switch>
    <ProtectedRoute path="/users/:usersId" component={ProfilePage} />
    <Route path="/" component={HomePage} />
    <Route render={() => <Redirect to={{pathname: "/"}} />} />
  </Switch>
);

export default App;