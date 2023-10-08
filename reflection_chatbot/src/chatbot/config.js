import React from "react";

import SparkiBotAvatar from "./components/bot_avatar/SparkiBotAvatar.jsx";
import DynamicMenu from "./components/OptionsMenus/DynamicMenu.jsx";
import ChecklistWidget from "./components/ChecklistWidget.jsx";

const botName = "Sparki";

const config = {
  botName: botName,
  runInitialMessagesWithHistory: true,
  state: {},
  customComponents: {
    botAvatar: (props) => <SparkiBotAvatar {...props} />,
  },
  widgets: [
    {
      widgetName: "checklistWidget",
      widgetFunc: (props) => <ChecklistWidget {...props} />,
      mapStateToProps: ["context", "menuOptions"],
    },
    {
      widgetName: "dynamicOptionsMenu",
      widgetFunc: (props) => <DynamicMenu {...props} />,
      mapStateToProps: ["menuOptions"],
    },
  ],
};

export default config;
