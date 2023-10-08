import React, { useEffect, useState } from "react";
//import GenericOptionsMenu from "../GenericOptionsMenu/GenericOptionsMenu";

import "./DynamicMenu.css";

const DynamicMenu = ({ menuOptions, actionProvider }) => {
  const [options, setOptions] = useState([]);
  
  useEffect(() => {
    const newOptions = menuOptions.map((op, idx) => ({
      opText: op.text,
      opHandler: () => {
        // add button press to message logs
        actionProvider.sendUserMessage(op.text);
        actionProvider.handleMenuOption(op.content);
      },
      opId: idx,
    }));

    setOptions(newOptions);
  }, []);

  return (
    <div className="options-container">
      {options.map((option) => (
        <button
          key={option.opId}
          onClick={option.opHandler}
          className="option-button"
        >
          {option.opText}
        </button>
      ))}
    </div>
  );
};

export default DynamicMenu;
