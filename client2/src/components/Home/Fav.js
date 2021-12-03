import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Fav = ({ fav }) => {
  const userData = useSelector((state) => state.userReducer);
  const [userFav, setUserFav] = useState("");
  // console.log(fav);

  useEffect(() => {
    const userIdConv = fav.members.find((m) => m !== userData._id);

    // console.log(userIdConv);

    const getUser = async () => {
      try {
        const res = await axios({
          method: "get",
          url: `${process.env.REACT_APP_API_URL}api/user/` + userIdConv,
        });
        setUserFav(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [userData, fav]);

  return (
    <div className="fav-component">
      <div className="container-img-fav">
        <img className="convImg" src={userFav.photo} alt="" />
        <img className="icon-fav" src="./logo/fav.png" width="17px" alt="" />
      </div>
      <div className="prenom-fav">{userFav.prenom}</div>
    </div>
  );
};

export default Fav;
