import React, { useState } from "react";
import axios from "axios";
import SignIn from "./SignIn";

const SignUp = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [poste, setPoste] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    const nomError = document.querySelector(".nom.error");
    const prenomError = document.querySelector(".prenom.error");
    const posteError = document.querySelector(".poste.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    emailError.innerHTML = "";
    passwordError.innerHTML = "";

    let regexMail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let regexPass =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!email.match(regexMail) || !password.match(regexPass)) {
      if (!email.match(regexMail)) {
        emailError.innerHTML = "Votre email n'est pas valide";
      }

      if (!password.match(regexPass)) {
        passwordError.innerHTML = "Password: Maj + Num + @# => 8 caractères";
      }
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          nom,
          prenom,
          poste,
          email,
          password,
        },
      })
        .then((res) => {
          if (res.data.errors) {
            nomError.innerHTML = res.data.errors.nom;
            prenomError.innerHTML = res.data.errors.prenom;
            posteError.innerHTML = res.data.errors.poste;
          } else {
              setFormSubmit(true)
          }
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {formSubmit ? (
        <>
          <SignIn />
          <h4 className="register-success">
            Enregistrement du compte réussi, veuillez vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="nom">Nom</label>
          <br />
          <input
            type="text"
            name="nom"
            id="nom"
            onChange={(e) => setNom(e.target.value)}
            value={nom}
          ></input>
          <div className="nom error"></div>

          <br />

          <label htmlFor="prenom">Prenom</label>
          <br />
          <input
            type="text"
            name="prenom"
            id="prenom"
            onChange={(e) => setPrenom(e.target.value)}
            value={prenom}
          ></input>
          <div className="prenom error"></div>

          <br />

          <label htmlFor="poste">Poste</label>
          <br />
          <input
            type="text"
            name="poste"
            id="poste"
            onChange={(e) => setPoste(e.target.value)}
            value={poste}
          ></input>
          <div className="poste error"></div>

          <br />

          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          ></input>
          <div className="email error"></div>

          <br />

          <label htmlFor="nom">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></input>
          <div className="password error"></div>

          <br />

          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUp;
