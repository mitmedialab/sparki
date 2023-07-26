import GPT from "../gpt/GPTController";
import Storage from "./StorageLog";
const CryptoJS = require("crypto-js");

class Accounts {
  static getSecretKey = () => {
    //console.log(`Accounts getting key ${key}`); // debug message
    let apiKey = localStorage.getItem("Sparki_key");
    if (apiKey && apiKey !== " ") this.setSecretKey(apiKey);
    else apiKey = localStorage.getItem("openai_key");

    return apiKey;
  };

  static setSecretKey = async (key) => {
    if (key && key !== " ") {
      let username = key.split("-")[1];

      // do post request to server for account info
      let resp = await Accounts.loginRequest(key);
      if (resp.success) {
        try {
          let accountInfo = CryptoJS.AES.decrypt(
            resp.accountInfo,
            username
          ).toString(CryptoJS.enc.Utf8);
          const account = JSON.parse(accountInfo);
          // save key for future sessions
          localStorage.setItem("Sparki_key", key);

          // setup GPT and storage
          GPT.setApiKey(account.openAIKey, false);
          await Storage.init(username);

          return account;
        } catch (e) {
          console.error(
            "There was an error getting account info. Contact administrator to fix your account."
          );
          console.log(e);
        }
      } else {
        console.error(
          "Account not found. Contact administrator to create a new account."
        );
      }
    }
  };

  static loginRequest = async (key) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    };
    options.body = JSON.stringify({
      username: key,
    });

    try {
      const r = await fetch(`https://wall-e.media.mit.edu:3000/login`, options);

      const res = await r.json();
      if (!r.ok) {
        throw new Error(res.error);
      }

      return res;
    } catch (e) {
      console.error("There was an error fetching suggested sentences");
      console.log(e);
    }
  };

  static clearSecretKey = () => {
    //console.log(`Accounts clearing stored API key`); // debug message
    localStorage.clear();
  };
}

export default Accounts;
