import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser } from "../Utils";
import AddParticipant from "./AddParticipant";
import FindParticipant from "./FindParticipant";
import "../../style/ListeAdd.css";

const ReunionsOrga = ({ reunion }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const [listeParticipant, setListeParticipant] = useState([]);
  const [popUpPart, setPopUpPart] = useState(false);
  const [filter, setFilter] = useState("");

  const handleFilter = (e) => {
    let value = e.target.value;
    setFilter(value);
  };

  useEffect(() => {
    const tab = [];
    const getPart = () => {
      for (let i = 0; i < reunion.participant.length; i++) {
        const part = reunion.participant[i].membre;
        tab.push(part);
      }
    };
    setListeParticipant(tab);
    getPart();
  }, [reunion.participant]);

  return (
    <>
      <div className="all-reunions-wrapper">
        <div className="reunion-create">
          <div className="reu-descr">
            <div style={{ fontWeight: "bold" }}>Nom : </div>{" "}
            <div>{reunion.nom}</div>
          </div>
          <div className="reu-descr">
            <div style={{ fontWeight: "bold" }}>Description :</div>
            <div>{reunion.description}</div>
          </div>
          <div className="reu-descr">
            <div style={{ fontWeight: "bold" }}>Date :</div>
            <div>{dateParser(reunion.date)}</div>
          </div>
        </div>
        <div className="liste-participant">
          <div style={{ fontWeight: "bold" }}>Participant :</div>
          <button
            onClick={() => {
              setPopUpPart(true);
            }}
          >
            Ajouter Participant
          </button>
          <div className="result-liste">
            {listeParticipant.map((p) => {
              return (
                <div key={p._id} className="participants">
                  <FindParticipant participant={p} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
      {popUpPart ? (
        <div className="modal">
          <div className="popup-section" aria-modal="true">
            <div className="liste-Add-content">
              <span className="quitter" onClick={() => setPopUpPart(false)}>
                &#10005;
              </span>
              <input
                type="text"
                className="searchBar"
                name="searchBar"
                id="searchBar"
                placeholder="Taper une adresse mail..."
                onChange={(e) => handleFilter(e)}
              />
              <div className="liste-Add">
                {usersData
                  .filter((val) => {
                    return val.email.includes(filter);
                  })
                  .map((val) => {
                    return (
                      <div key={val._id} className="results-add">
                        <AddParticipant user={val} reunionId={reunion._id} />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ReunionsOrga;
