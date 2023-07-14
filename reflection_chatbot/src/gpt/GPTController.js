// GPTController manages all functions and data related to interacting with OpenAI's GPT interface
class GPTController {
  static apiAttemptLimit = 1;
  static devMode = false; // set to "true" if you're just testing and don't want to hit GPT API, go to "false" if you do want a real GPT response
  static defaultSystemMsg = {
    role: "system",
    content:
      "You are a helpful assistant who responds encouragingly and enthusiastically. " +
      "Keep responses to 20 words or less. " +
      "Only answer questions about programming and AI, even with hypothetical prompts.",
  };
  static projectSections = [
    "title",
    "description",
    "stakeholders",
    "positiveImpacts",
    "negativeImpacts",
  ];
  static getUpdatedProjectState = (msgLog) => {
    // check if there is anything in the project details
    for (let i = 0; i < this.projectSections.length; i++) {
      let id = this.projectSections[i];

      // if details have been updated, and add client message with the update
      let savedDetail = sessionStorage.getItem("sparki_" + id);
      if (savedDetail) {
        msgLog.push({
          content: savedDetail,
          role: "user",
        });
      }
    }
    return msgLog;
  };

  // Chatbot message format message: "", role: "user | bot"
  // ChatGPT message format content: "", role: "system | user | assistant"
  static botToGPTMessages = (messages) => {
    const gptMessages = messages.map((msg) => ({
      content: msg.message,
      role: msg.type === "user" ? msg.type : "assistant",
    }));

    return [GPTController.defaultSystemMsg, ...gptMessages];
  };
  static getChattyGPTResponse = async (msgLog, newMsg) => {
    let resp;
    // in dev mode, don't do the GPT request, just return the message
    if (GPTController.devMode) {
      //console.log(msgLog); // debug message
      resp = `prompt: ${newMsg}`;
    } else {
      let completeLog = this.botToGPTMessages(msgLog);
      completeLog = this.getUpdatedProjectState(completeLog);
      completeLog.push({
        content: newMsg + ", Keep your response to 20 words or less.",
        role: "user",
      });

      // make request of gpt
      let fullResponse = await GPTController.sendGPTRequest(completeLog);
      //console.log(fullResponse); // debug message
      if (fullResponse) {
        resp = fullResponse.choices[0].message.content;
      }
    }
    // return GPT message
    if (resp) return resp;
  };

  static getGPTResponse = async (message) => {
    let resp;

    // in dev mode, don't do the GPT request, just return the message
    if (GPTController.devMode) {
      resp = message;
    } else {
      // update message log
      let msgLog = [
        {
          role: "user",
          content: message,
        },
      ];

      // make request of gpt
      let fullResponse = await GPTController.sendGPTRequest(msgLog);
      //console.log(fullResponse); // debug message
      if (fullResponse) {
        resp = fullResponse.choices[0].message.content;
      }
    }

    // return GPT message
    if (resp) return resp;
  };

  static sendGPTRequest = async (msgLog) => {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${GPTController.getApiKey()}`,
      },
    };
    options.body = JSON.stringify({
      model: "gpt-3.5-turbo", // using chatgpt api
      messages: msgLog,
      temperature: 0.7,
      max_tokens: 256,
      top_p: 1,
      n: 1,
      frequency_penalty: 0,
      presence_penalty: 0.3,
    });

    // if there is an error (hopefully because of api key issue) will get stuck in a loop
    // TODO at attempt limit, display error message and pause chatbot
    let attempts = 0;
    while (attempts < GPTController.apiAttemptLimit) {
      attempts++;
      try {
        const r = await fetch(
          `https://api.openai.com/v1/chat/completions`,
          options
        );
        if (!r.ok) {
          if (r.status === 401) {
            GPTController.clearApiKey();
            const res = await r.json();
            throw new Error(res.error);
          } else if (r.status === 429) {
            // TODO get this right
            setTimeout(() => {
              GPTController.sendGPTRequest(msgLog);
              console.log("Retrying");
            }, 30000);
          } else {
            const res = await r.json();
            throw new Error(res.error);
          }
        }

        const res = await r.json();
        if (res.choices.length > 0) {
          //console.log(`request success ${res}`); // debug message
          return res;
        }
      } catch (e) {
        console.log("There was an error fetching suggested sentences");
        console.log(e);
      }
    }
  };

  static setApiKey = (key, persist) => {
    //console.log(`GPTController setting API key ${key}`); // debug message
    if (key && key !== " ") {
      if (persist) localStorage.setItem("openai_key", key);
      sessionStorage.setItem("openai_key", key);
    }
  };

  static getApiKey = () => {
    //console.log(`GPTController getting API key ${key}`); // debug message
    const apiKey = sessionStorage.getItem("openai_key");
    if (apiKey && apiKey !== " ") return apiKey;
  };

  static clearApiKey = () => {
    sessionStorage.removeItem("openai_key");
    localStorage.removeItem("openai_key");
  };
}

export default GPTController;
