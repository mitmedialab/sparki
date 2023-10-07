import React from "react";

import SparkiIcon from "./sparki_icon.png";

import "./SparkiBotAvatar.css";

const SparkiBotAvatar = () => {
  return (
    <div className="react-chatbot-kit-chat-bot-avatar">
      <div
        className="react-chatbot-kit-chat-bot-avatar-container"
        style={{ background: "none" }}
      >
        <img alt="SparkiIcon" src={SparkiIcon} />
      </div>
    </div>
  );
};

export default SparkiBotAvatar;
