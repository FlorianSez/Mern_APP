import React, { useContext } from "react";
import Log from "../components/Log";
import { UserContext } from "../components/AppContext";
import '../style/Form.css'
import '../style/Update.css'
import Update from "../components/Profil/Update";

const Profil = () => {
  const user = useContext(UserContext);

  return (
    <div className="profil-page">
      {user ? (
        <Update/>
      ) : (
        <div className="log-container">
          <Log />
          <div className="img-container">
            <img src="" alt=""></img>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profil;
