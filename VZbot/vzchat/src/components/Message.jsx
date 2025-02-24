import React from "react";
import "./Message.css";

const Message = ({ text, sender }) => {
  return (
    <div className={`message-container ${sender}`}>
      <div className="message-bubble">
        <p className="message-text">{text}</p>
      </div>
      <span className="message-time">
        {new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </span>
    </div>
  );
};

export default Message;
