import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import AcceptHandler from "./AcceptHandler";
import RejectHandler from "./RejectHandler.js";
import LeftNav from "../../components/LeftNav";

const Liste = () => {
  const usersData = useSelector((state) => state.usersReducer);

  const [waiting, setWaiting] = useState([]);

  useEffect(() => {
    const tab = [];
    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].accept === false && usersData[i].reject === false) {
        tab.push(usersData[i]);
      }
    }
    setWaiting(tab);
  }, [usersData]);

  return (
    <>
      <LeftNav />
      <div className="container">
        <div className="titre">
          <h1>Voici les utilisateurs pas encore acceptés</h1>
        </div>
        <ul>
          {waiting.map((user) => {
            return (
              <li key={user._id}>
                <div className="composant">
                  <div className="value" style={{ fontWeight: "bold" }}>
                    Nom :
                  </div>{" "}
                  {user.nom}
                  <div className="value" style={{ fontWeight: "bold" }}>
                    Prenom :
                  </div>{" "}
                  {user.prenom}
                  <div className="value" style={{ fontWeight: "bold" }}>
                    Poste :
                  </div>{" "}
                  {user.poste}
                  <div className="value" style={{ fontWeight: "bold" }}>
                    Email :
                  </div>{" "}
                  {user.email}
                  <div className="button">
                    <AcceptHandler idToAccept={user._id} />
                    <RejectHandler idToReject={user._id} />
                  </div>
                </div>
              </li>
            );
          }, [])}
        </ul>
      </div>
    </>
  );
};

export default Liste;
