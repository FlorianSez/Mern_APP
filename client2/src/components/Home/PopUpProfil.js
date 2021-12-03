import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PopUpProfil = ({ profil, conv }) => {
  const userData = useSelector((state) => state.userReducer);
  const [alreadyConv, setAlreadyConv] = useState(false);
  const [convIdFavAlready, setConvIdFavAlready] = useState("");
  console.log(conv._id);
  console.log(profil._id);

  const createConv = async () => {
    try {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/conversation/`,
        data: {
          senderId: userData._id,
          receiverId: profil._id,
        },
      }).catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
  };

  const cree = () => {
    console.log("1ere value: " + convIdFavAlready);
    for (let i = 0; i < conv.length; i++) {
      if (
        (conv[i].members[0] === userData._id ||
          conv[i].members[0] === profil._id) &&
        (conv[i].members[1] === userData._id ||
          conv[i].members[1] === profil._id)
      )
        return conv[i];
      else {
        return undefined;
      }
    }
  };

  // useEffect(() => {
  //   setConvIdFavAlready(cree());
  // }, []);

  const createConvFav = async () => {
    try {
      await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/conversation/` + conv._id,
        data: {
          userId: profil.id,
        },
      }).catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    }
    setConvIdFavAlready("");
  };

  const handleWindow = () => {
    window.location = "/conversation";
  };

  useEffect(() => {
    const cree = () => {
      for (let i = 0; i < conv.length; i++) {
        if (
          (conv[i].members[0] === userData._id ||
            conv[i].members[0] === profil._id) &&
          (conv[i].members[1] === userData._id ||
            conv[i].members[1] === profil._id)
        ) {
          return setAlreadyConv(true);
        } else setAlreadyConv(false);
      }
    };
    cree();
  }, [profil, userData, conv]);

  return (
    <>
      <div className="popup-content">
        <div className="photo-profil">
          <img className="photo" src={profil.photo} alt="" />
        </div>
        <div className="grid-informations">
          <div className="inf">
            <div className="label">Prenom:</div> {profil.prenom}
          </div>
          <div className="inf">
            <div className="label">Nom:</div>
            {profil.nom}
          </div>
          <div className="inf">
            <div className="label">Email:</div>
            {profil.email}
          </div>
          <div className="inf">
            <div className="label">Poste:</div>
            {profil.poste}
          </div>
        </div>
      </div>
      <div className="buutton">
        {!alreadyConv ? (
          <img
            className="buutton1"
            src="./logo/messenger.png"
            width="30px"
            alt=""
            onClick={() => {
              createConv();
              handleWindow();
            }}
          />
        ) : (
          <p className="already-Conv">Conv déjà crée</p>
        )}
        <img
          className="buutton2"
          src="./logo/fav.png"
          width="30px"
          alt=""
          onClick={() => {
            createConvFav();
            // handleWindow();
          }}
        />
      </div>
    </>
  );
};

export default PopUpProfil;
