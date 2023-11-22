import React, { useEffect, useState } from "react";
import Login from "./Login.jsx";
import ProjectDescription from "./form/components/ProjectDescription";

import Storage from "./user_util/StorageLog";
import Accounts from "./user_util/Accounts";

import "react-chatbot-kit/build/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";

function App() {
  const [apiKey, setApiKey] = useState(Accounts.getSecretKey());
  const saveInterval = setInterval(Storage.uploadLog, 60 * 1000);

  useEffect(() => {
    // clear session storage at start
    sessionStorage.clear();

    window.addEventListener("beforeunload", endSession);

    return () => {
      window.removeEventListener("beforeunload", endSession);
    };
  }, []);

  const endSession = (e) => {
    clearInterval(saveInterval);
    Storage.uploadLog();

    if (sessionStorage.getItem("saved?") == "false") {
      // Have page confirm before reload
      e.preventDefault();
      e.returnValue = "";
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {apiKey ? <ProjectDescription /> : <Login updateApiKey={setApiKey} />}
      </header>
    </div>
  );
}

export default App;
