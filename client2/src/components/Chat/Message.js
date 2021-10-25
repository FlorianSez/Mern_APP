import React from "react";
import {format} from 'timeago.js'
import "../../style/Message.css";

const Message = ({message, own}) => {
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="../../upload/profil/random-user.png"
          alt=""
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
};

export default Message;
