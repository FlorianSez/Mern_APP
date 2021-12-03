import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import NavLeft from "../components/LeftNav";
import ReunionsAccept from "../components/Reunions/ReunionsAccept";
import ReunionsOrga from "../components/Reunions/ReunionsOrga";
import ReunionsReject from "../components/Reunions/ReunionsReject";
import WaitingReu from "../components/Reunions/WaitingReu";
import "../style/Reunion.css";

const Reunion = () => {
  const userData = useSelector((state) => state.userReducer);
  const [reuCreate, setReuCreate] = useState([]);
  const [reuWaiting, setReuWaiting] = useState([]);
  const [reuAccept, setReuAccept] = useState([]);
  const [reuReject, setReuReject] = useState([]);

  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");

  console.log(reuWaiting);

  useEffect(() => {
    const getCreaReu = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/reunion/create/` +
            userData._id,
        });
        setReuCreate(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getCreaReu();
  }, [userData]);

  useEffect(() => {
    const getReuWaiting = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/reunion/waiting/` +
            userData._id,
        });
        setReuWaiting(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReuWaiting();
  }, [userData]);

  useEffect(() => {
    const getReuAccept = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/reunion/accept/` +
            userData._id,
        });
        setReuAccept(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReuAccept();
  }, [userData]);

  useEffect(() => {
    const getReuReject = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/reunion/reject/` +
            userData._id,
        });
        setReuReject(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getReuReject();
  }, [userData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNom("");
    setDescription("");
    setDate("");

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/reunion/`,
      data: {
        organisateurId: userData._id,
        nom: nom,
        description: description,
        date: date,
      },
    }).catch((err) => console.log(err));
  };

  return (
    <div>
      <NavLeft />
      <div className="pageReunion">
        <div className="creeReunion">
          <h4>Créer une reunion : </h4>
          <div className="creationWrapper">
            <form action="" onSubmit={handleSubmit}>
              <label htmlFor="nom">Nom: </label>
              <input
                type="text"
                name="nom"
                id="nom"
                required={true}
                onChange={(e) => setNom(e.target.value)}
                value={nom}
              />
              <label htmlFor="description">Description: </label>
              <input
                type="text"
                name="description"
                id="description"
                maxLength="256"
                required={true}
                onChange={(e) => setDescription(e.target.value)}
                value={description}
              />
              <label htmlFor="date">Date: </label>
              <input
                type="datetime-local"
                name="date"
                id="date"
                required={true}
                onChange={(e) => setDate(e.target.value)}
                value={date}
              />
              <input type="submit" value="Créer" />
            </form>
          </div>
        </div>
        <div className="all-reunions">
          <div className="reunionsOrganiseWrapper">
            <h2>Réunions organisé par vous : </h2>
            <div className="reunionsOrganiseComponent">
              {reuCreate.map((r) => {
                return (
                  <div key={r._id}>
                    <ReunionsOrga reunion={r} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="waitingReunionsWrapper">
            <h2>Vos invitations en attente : </h2>
            <div className="waitingReunionsComponent">
              {reuWaiting.map((r) => {
                return (
                  <div key={r._id}>
                    <WaitingReu reunion={r} />
                  </div>
                );
              })}
            </div>
          </div>
          <div className="reunionsAcceptWrapper">
            <h2>Vos Réunions Acceptées : </h2>
            <div className="reunionsAcceptComponent">
              {reuAccept.map((r) => {
                return (
                  <div key={r._id}>
                    <ReunionsAccept reunion={r} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="reunionsRejectWrapper">
          <h2>Vos Réunions Rejetées</h2>
          <div className="reunionsRejectComponent">
            {reuReject.map((r) => {
              return (
                <div key={r._id}>
                  <ReunionsReject reunion={r} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reunion;
