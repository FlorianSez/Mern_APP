import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Conversation from "../../pages/Conversation";
import Home from "../../pages/Home";
import Profil from "../../pages/Profil";
import Reunion from "../../pages/Reunion";

const index = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/conversation" exact component={Conversation} />
        <Route path="/reunion" exact component={Reunion} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
