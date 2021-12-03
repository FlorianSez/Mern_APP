import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import Chat from "../components/Chat/Chat";
import ChatOnline from "../components/Chat/ChatOnline";
import Message from "../components/Chat/Message";
import LeftNav from "../components/LeftNav";
import "../style/Conversation.css";
import { io } from "socket.io-client";
import Fav from "../components/Home/Fav";

const Conversation = () => {
  const userData = useSelector((state) => state.userReducer);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [favConv, setFavConv] = useState([]);

  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();
  const scrollRef = useRef();

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
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("sendUser", userData._id);
    socket.current.on("getUsersWaiting", (users) => {
      // console.log(users);
    });
  });

  useEffect(() => {
    const getConversation = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/conversation/` + userData._id,
        });
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversation();
  }, [userData._id]);

  // console.log(currentChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios({
          method: "get",
          url:
            `${process.env.REACT_APP_API_URL}api/message/` + currentChat?._id,
        });
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  // console.log(messages);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const message = {
      sender: userData._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== userData._id
    );
    socket.current.emit("sendMessage", {
      senderId: userData._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/message/`,
        data: message,
      });
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <LeftNav />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              className="chatMenuInput"
              placeholder="Trouver une discussion"
            />
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Chat conversation={c} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="up">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === userData._id} />
                    </div>
                  ))}
                </div>
                <div className="bottom">
                  <textarea
                    className="messageInput"
                    placeholder="Votre message..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button onClick={handleSubmit} className="submitMessButton">
                    Envoyer
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversation">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            {favConv.map((f) => {
              return (
                <div key={f._id}>
                  <Fav fav={f} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Conversation;
