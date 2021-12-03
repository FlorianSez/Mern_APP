import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FindParticipant = ({ participant }) => {
  const usersData = useSelector((state) => state.usersReducer);
  const [user, setUser] = useState("");

  useEffect(() => {
    const findUser = () => {
      for (let i = 0; i < usersData.length; i++) {
        if (usersData[i]._id === participant) {
          return setUser(usersData[i].prenom);
        }
      }
    };
    findUser();
  }, [usersData]);

  return <div>{user},</div>;
};

export default FindParticipant;
