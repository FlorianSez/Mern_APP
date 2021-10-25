/* eslint-disable no-template-curly-in-string */
import React, { useState } from "react";
import axios from "axios";

const SignIn = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        email,
        password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h5>Se connecter</h5>
      <form action="" onSubmit={handleLogin} id="signInForm">
        <label className="label-signin" htmlFor="email">
          Email
        </label>
        <br />
        <input
          type="text"
          name="email"
          id="email"
          onChange={(e) => setemail(e.target.value)}
          value={email}
        />
        <div className="email error"></div>
        <br />
        <label className="label-signin" htmlFor="password">
          Mot de passe
        </label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          onChange={(e) => setpassword(e.target.value)}
          value={password}
        />
        <div className="password error"></div>
        <br />
        <div className="admin-error"></div>
        <input type="submit" value="Se connecter" />
      </form>
    </div>
  );
};

export default SignIn;
