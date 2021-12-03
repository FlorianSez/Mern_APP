import axios from "axios";
import React, { useState } from "react";

const AddParticipant = ({ user, reunionId }) => {
  const [ajouter, setAjouter] = useState(false);
  const handleAdd = async () => {
    await axios({
      method: "patch",
      url:
        `${process.env.REACT_APP_API_URL}api/reunion/addParticipants/` +
        reunionId,
      data: {
        id: user._id,
      },
    }).catch((err) => console.log(err));
  };

  return (
    <>
      <div className="mailPart">{user.email}</div>
      <button
        className="button1"
        onClick={() => {
          setAjouter(true);
          handleAdd();
        }}
      >
        &#x2714;
      </button>
      {ajouter ? <div style={{ color: "green" }}>Ajouté</div> : null}
    </>
  );
};

export default AddParticipant;
