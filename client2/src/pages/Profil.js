import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";

const Profil = () => {
  const user = useContext(UidContext);

  return (
    <div className="profil-page">
      {user ? (
        <h1>UPDATE PROFIL PAGE</h1>
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
