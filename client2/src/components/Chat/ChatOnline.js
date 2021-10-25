import React from "react";
import "../../style/ChatOnline.css";

const ChatOnline = () => {
  return (
    <div className="chatOnline">
      <div className="chatOnlineFav">
        <div className="chatOnlineImgContainer">
          <img className='chatOnlineImg' src="../../upload/profil/random-user.png" alt="" />
        </div>
        <span className="chatOnlineName">Florian</span>
      </div>
    </div>
  );
};

export default ChatOnline;
