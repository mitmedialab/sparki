import React, { useMemo, useState } from "react";

import Chatbot from "react-chatbot-kit";
import { createChatBotMessage } from "react-chatbot-kit";

import debounce from "lodash.debounce";

import ActionProvider from "../../chatbot/ActionProvider";
import MessageParser from "../../chatbot/MessageParser";
import config from "../../chatbot/config";
import { KnowledgeBase, AutoKnowledgeBase } from "../../chatbot/resources/KnowledgeBase";

import "react-chatbot-kit/build/main.css";
import "./InputBlockWithChat.css";

const InputBlockWithChat = ({
  inputType,
  label,
  id,
  placeholderText,
  onChange,
}) => {
  const [chatStatus, setChatStatus] = useState("hidden"); // hidden / visible
  const [updateProgressChecker, setUpdateProgressChecker] = useState(false);

  let initialMsg, initialContext, initialMenu;

   // Determine if knowledge is about chatbot or self-driving vehicle project
   let urlString = window.location.search;  

   // Get the information needed from the knowledge base
   let kbContent = KnowledgeBase;
   if (urlString.includes("project=auto")) {
     kbContent = AutoKnowledgeBase;
   }
  // setup the chatbot with the appropriate initializations
  if (id in kbContent) {
    initialMsg = kbContent[id].initialChatMessage;
    initialContext = kbContent[id].initialChatContext;
    initialMenu = kbContent[id].initialChatMenu;
  } else {
    console.error("Got an invalid id on input block");
    console.error(id);
  }

  config.initialMessages = [
    createChatBotMessage(initialMsg, { widget: "checklistWidget" }),
  ];
  config.state.context = initialContext;
  config.state.menuOptions = initialMenu;

  const loadMessages = () => {
    let oldMessages = sessionStorage.getItem("sparki_msglog_" + id);
    let oldMessageArray = JSON.parse(oldMessages);
    // Make sure the initial message is a part of the history
    if (oldMessageArray) oldMessageArray.unshift(config.initialMessages[0]);
    return oldMessageArray;
  };
  
  // BUG Never seems to fire
  //const saveMessageHandler = (messages) => {
  //  console.log("Saving previous messages");
  //};

  const onChangeHandler = () => {
    setUpdateProgressChecker(false);
  };
  const onInputValueEdited = (e) => {
    setUpdateProgressChecker(true);

    // call parent on change
    onChange(e);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(onInputValueEdited, 300),
    [chatStatus]
  );

  const onChatButtonClick = () => {
    // change visibillity of bot
    if (chatStatus === "hidden") setChatStatus("visible");
    else setChatStatus("hidden");
  };
  const elementLostFocus = (e) => {
    // From https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
    const currentTarget = e.currentTarget;

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement))
        setChatStatus("hidden");
    });
  };
  return (
    <div className="description-block" onBlur={elementLostFocus}>
      {label && (
        <label className="project-textlabel" htmlFor="project-description">
          {label}
        </label>
      )}
      {
        /* Text area or input box */
        {
          input: ( // title is just an input
            <input
              className="project-description-edit inplace-input"
              placeholder={placeholderText}
              id={id}
              onChange={(e) => {
                onChangeHandler();
                debouncedChangeHandler(e);
              }}
            />
          ),
          textarea: ( // other blocks are text areas
            <textarea
              className="project-description-edit inplace-textarea"
              placeholder={placeholderText}
              id={id}
              onChange={(e) => {
                onChangeHandler();
                debouncedChangeHandler(e);
              }}
            />
          ),
        }[inputType]
      }
      {
        /* Chatbot open button */
        <button
          className="chatbot-btn btn btn-primary"
          type="button"
          onClick={onChatButtonClick}
        >
          <i className="bi bi-chat-right-dots-fill" />
        </button>
      }
      {
        /* Chatbot component */
        chatStatus !== "hidden" && (
          <div>
            <Chatbot
              className="chat"
              config={config}
              actionProvider={ActionProvider}
              messageParser={MessageParser}
              messageHistory={loadMessages()}
            />
          </div>
        )
      }
    </div>
  );
};
export default InputBlockWithChat;
