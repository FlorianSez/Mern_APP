import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "../components/Chat/Chat";
import Fav from "../components/Home/Fav";
import PopUpProfil from "../components/Home/PopUpProfil";
import Research from "../components/Home/Research";
import NavLeft from "../components/LeftNav";
import "../style/Home.css";
import "../style/PopUpProfil.css";

const Home = () => {
  const userData = useSelector((state) => state.userReducer);
  const usersData = useSelector((state) => state.usersReducer);

  const [conversations, setConversations] = useState([]);
  const [filter, setFilter] = useState("");
  const [profilPopUp, setProfilPopUp] = useState(false);
  const [focusProfil, setFocusProfil] = useState([]);
  const [favConv, setFavConv] = useState([]);
  console.log(conversations);

  const handleWindow = () => {
    window.location = "/conversation";
  };

  useEffect(() => {
    const getFavConv = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/conversation/fav/` +
            userData?._id,
        });
        setFavConv(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFavConv();
  }, [userData]);

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/conversation/` + userData?._id,
        });
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [userData?._id]);

  const handleFilter = (e) => {
    let value = e.target.value;
    setFilter(value);
  };

  return (
    <div>
      {!userData?.accept ? (
        <h1>L'admin ne vous a pas accepté</h1>
      ) : (
        <>
          <NavLeft />
          <div className="home-page">
            <h1>Bienvenue sur InstantApp</h1>
            <div className="components-wrapper">
              <div className="recherche-wrapper">
                <div className="recherche-components">
                  <input
                    type="text"
                    className="searchBar"
                    name="searchBar"
                    id="searchBar"
                    placeholder="Chercher un utilisateur..."
                    onChange={(e) => handleFilter(e)}
                  />
                  {/* <h4>Résultat de votre recherche</h4> */}
                  <div className="resultat">
                    {usersData
                      .filter((val) => {
                        return (
                          val.prenom.includes(filter) ||
                          val.nom.includes(filter) ||
                          val.poste.includes(filter)
                        );
                      })
                      .map((val) => {
                        return (
                          <div
                            key={val._id}
                            onClick={() => {
                              setProfilPopUp(true);
                              setFocusProfil(val);
                            }}
                            className="results"
                          >
                            <Research user={val} />
                          </div>
                        );
                      })}
                    {profilPopUp ? (
                      <div className="modal">
                        <div className="popup-section" aria-modal="true">
                          <span
                            className="quitter"
                            onClick={() => setProfilPopUp(false)}
                          >
                            &#10005;
                          </span>
                          <PopUpProfil
                            conv={conversations}
                            profil={focusProfil}
                          />
                        </div>
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className="fav-wrapper">
                  <h4>Vos favoris</h4>
                  <div className="liste-fav">
                    {favConv.map((f) => {
                      return (
                        <div key={f._id} onClick={() => handleWindow()}>
                          <Fav fav={f} />
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="conv-liste">
                  <h4>Liste des conversations</h4>
                  <div className="resultats">
                    {conversations.map((c) => {
                      return (
                        <div
                          key={c._id}
                          onClick={() => {
                            handleWindow();
                          }}
                        >
                          <Chat conversation={c} />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="description">
                <h2>Création du site </h2>
                <p>
                  Ce site a été crée dans le but de pouvoir discuter en
                  instantané avec n'importe quel utilisateur.
                </p>
                <p>
                  InstantApp offre également la possibilité d epouvoir créer des
                  réunions.
                </p>
                <p>Ces fonctionnalités sont détaillées ci-dessous.</p>

                <br />
                <h2>Chats Instantanés</h2>
                <p>
                  Avec les Chats Instantanés vous pouvez contactez tous les
                  utilisateurs du site, où qu'ils soient, et de manière privée.
                </p>
                <p>
                  Sur la section de gauche vous trouverez vos conversations
                  récentes (par date). N'hésitez pas à rechercher directement
                  une conversation spécifique.
                </p>
                <p>
                  Sur la section de droite vous trouverez vos conversation
                  ajoutées en favoris, comme ca pas d'oublie et on ne se perds
                  pas dans les priorités !
                </p>
                <p>
                  Enfin la section du milieu est dédiée à la conversation, bien
                  évidemment toujours dans le respect de votre interlocuteur,
                  cet espace est totalement crée et privatiser pour vous.
                </p>

                <br />
                <h2>Espace Réunions</h2>
                <p>
                  Créer voter reunions, ajouter autant de participant qu'il vous
                  semblera juste. 4 rubriques sont à votre portée:
                </p>

                <ul>
                  <li>
                    Les réunions organisées par vous même, vous pourrez y
                    ajouter des participants comme bon vous semble.
                  </li>
                  <li>
                    Les reunions en attente correspondent aux réunions
                    auxquelles vous n'avez pas données de réponses
                  </li>
                  <li>
                    les reunions acceptées et refusées, vous pourrez à tout
                    moment changer d'avis sur ces réunions.
                  </li>
                </ul>

                <br />
                <h2>La barre de recherche</h2>
                <p>
                  La barre de recherche en haut à gauche de cette même pas vous
                  servira à retrouver n'importe quel utilisateur.
                </p>
                <p>
                  Lorsque vous cliquez sur un profil, vous aurez alors le choix
                  de pouvoir ouvrir une discussion directement avec lui, ou
                  l'ajouter en favoris.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
