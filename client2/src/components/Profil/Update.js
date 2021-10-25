import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateNom, updatePrenom } from "../../actions/user.action";
import LeftNav from "../LeftNav";
// import { dateParser } from "../Utils";
import UploadPhoto from "./UploadPhoto";

const Update = () => {
  const userData = useSelector((state) => state.userReducer);
  const [prenom, setPrenom] = useState("");
  const [nom, setNom] = useState("");
  const [updateFormPrenom, setUpdateFormPrenom] = useState(false);
  const [updateFormNom, setUpdateFormNom] = useState(false);
  const dispatch = useDispatch();

  const handleUpdatePrenom = () => {
    dispatch(updatePrenom(userData._id, prenom));
    setUpdateFormPrenom(false);
  };

  const handleUpdateNom = () => {
    dispatch(updateNom(userData._id, nom));
    setUpdateFormNom(false);
  };

  return (
    <>
      <LeftNav />
    <div className="profil">
      <h1 style={{fontFamily:'Rockwell'}}>Profil de {userData.prenom}</h1>
      <div className="all-informations">
        <div className="left-photo-area">
          <h3>Photo de profil</h3>
          <img src={userData.photo} width="150px" alt="Pdp" />
          <UploadPhoto />
        </div>
        <div className="right-area">
          <h3>Information supplémentaire</h3>
          {/* Ternaire pour le prenom */}
          <label className='lab' style={{fontWeight: 'bold'}}>Prenom</label>
          {updateFormPrenom === false && (
            <>
            <div className='modifiable' onClick={() => setUpdateFormPrenom(!updateFormPrenom)}>
              <p>
                {userData.prenom}
              </p>
              </div >
              <br/>
            </>
          )}
          {updateFormPrenom && (
            <>
             <br/>
              <input
              style={{marginTop: '10px'}}
                type="text"
                defaultValue={userData.prenom}
                onChange={(e) => setPrenom(e.target.value)}
              />
               <br/>
              <button style={{marginTop: '10px', marginBottom: '10px'}} onClick={handleUpdatePrenom}>Valider</button>
              <br/>
            </>
          )}
          {/* Ternaire pour le nom */}
          <label  className='lab' style={{fontWeight: 'bold'}}>Nom</label>
          {updateFormNom === false && (
            <>
            <div className='modifiable' onClick={() => setUpdateFormNom(!updateFormNom)}>
              <p>{userData.nom}</p>
              <br/>
              </div>
            </>
          )}
          {updateFormNom && (
            <>
            <br/>
              <input
              style={{marginTop: '10px'}}
                type="text"
                defaultValue={userData.nom}
                onChange={(e) => setNom(e.target.value)}
              />
              <br/>
              <button style={{marginTop: '10px', marginBottom: '10px'}} onClick={handleUpdateNom}>Valider</button>
              <br/>
            </>
          )}
          <label className='lab' style={{fontWeight: 'bold'}}>Email du compte</label>
          <p>{userData.email}</p>
          <br/>
          <label className='lab' style={{fontWeight: 'bold'}}>Votre poste</label>
          <p>{userData.poste}</p>
          <br/>
          {/* <h4>Membre depuis le { dateParser(userData.createdAt) }</h4> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default Update;
