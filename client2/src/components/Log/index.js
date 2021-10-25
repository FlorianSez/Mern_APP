import React, { useState } from "react";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Log = () => {
  const [SignUpMod, setSignUpMod] = useState(false);
  const [SignInMod, setSignInMod] = useState(true);

  const handleClick = (e) => {
      if (e.target.id === "signUp"){
          setSignInMod(false)
          setSignUpMod(true)
      } else if (e.target.id === "signIn") {
        setSignInMod(true)
        setSignUpMod(false)
      }
  }

  return (
    <div className="connection-form">
      <div className="form-container">
        <ul>
        <div id="boutons">
          <li id="signUp" onClick={handleClick} className="">S'inscrire</li>
              <li id="signIn" onClick={handleClick} className="">Se connecter</li>
          </div>
          <div id='formulaires'>
          {SignUpMod && <SignUp />}
          {SignInMod && <SignIn />}
          </div>
        </ul>
      </div>
    </div>
  );
};

export default Log;
