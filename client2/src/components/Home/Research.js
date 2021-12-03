import React from "react";

const Research = ({ user }) => {
  return (
    <>
      <div className="infos">
        <span>
          {user.prenom} {user.nom} <br /> {user.poste}
        </span>
      </div>
    </>
  );
};

export default Research;
