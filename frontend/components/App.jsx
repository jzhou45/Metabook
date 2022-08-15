import React from "react";
import LoginForm from "./session/login_form_container";
import Greetings from "./greetings/greetings";

const App = () => (
  <div>
      <Greetings />
      <LoginForm />
  </div>
);

export default App;