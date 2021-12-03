import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { dateParser } from "../Utils";
import FindParticipant from "./FindParticipant";

const WaitingReu = ({ reunion }) => {
  const userData = useSelector((state) => state.userReducer);
  const [listeParticipant, setListeParticipant] = useState([]);
  const [reunionId, setReunionId] = useState("");
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);

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

  useEffect(() => {
    if (reject === false && accept === true) {
      console.log("je suis rentré dans reject");
      console.log(reunionId);
      try {
        const rejectReu = async () => {
          await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/reunion/` + reunionId,
            data: {
              membreId: userData._id,
              accept: true,
              reject: false,
            },
          }).catch((err) => console.log(err));
        };
        rejectReu();
        window.location.reload(false);
      } catch (err) {
        console.log();
      }
    }
  }, [accept, reject, reunionId, userData._id]);

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
        <div className="Accept-Refuse">
          <div className="button-accept">
            <button
              onClick={() => {
                setReunionId(reunion._id);
                setAccept(true);
                setReject(false);
              }}
            >
              Accept
            </button>
          </div>
          {accept ? <p style={{ color: "green" }}>Reunion acceptée</p> : null}
        </div>
      </div>
    </>
  );
};

export default WaitingReu;
