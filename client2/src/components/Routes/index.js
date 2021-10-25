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
import Header from "../Header";
import Gestion from "../../pages/Gestion"

const index = () => {
  return (
    <Router>
      <Header/>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/profil" exact component={Profil} />
        <Route path="/conversation" exact component={Conversation} />
        <Route path="/reunion" exact component={Reunion} />
        <Route path="/gestion" exact component={Gestion} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default index;
