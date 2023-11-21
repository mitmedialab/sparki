import Contexts from "./resources/BotContext";
import GPT from "../gpt/GPTController";
import Storage from "../user_util/StorageLog";
import Accounts from "../user_util/Accounts";
import { KnowledgeBase, AutoKnowledgeBase } from "./resources/KnowledgeBase";

const rephraseHeader = "Rephrase the following in your own voice:";

// The ActionProvider class controls what the chatbot does and responds
class ActionProvider {
  constructor(
    createChatBotMessage,
    setStateFunc,
    createClientMessage,
    stateRef,
    createCustomMessage,
    ...rest
  ) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
    this.createClientMessage = createClientMessage;
    this.stateRef = stateRef;
    this.createCustomMessage = createCustomMessage;

    //console.log("Calling ActionProvider constructor"); // debug message
  }

  handleStart = async () => {
    let prompt = `${rephraseHeader} "What would you like to do? I can help with a few specific things."`;
    let resp = await GPT.getGPTResponse(prompt);
    this.sayAndShowWidget(resp, { widget: "startMenu" });
  };

  requestSecretKey = async () => {
    this.say(
      `Please enter a valid secret key or OpenAI API key to use Sparki.`
    );
  };
  handleSecretKey = async (userMsg) => {
    await Accounts.setSecretKey(userMsg);

    // test the key to see if it works
    let prompt = `${rephraseHeader} "Thank you for the valid key."`;
    let resp = await GPT.getGPTResponse(prompt);
    if (!resp) {
      this.requestSecretKey();
    } else {
      this.say(resp);
      this.handleStart();
    }
  };
  handleAPIKey = async (userMsg) => {
    GPT.setApiKey(userMsg, true);

    // test the key to see if it works
    let prompt = `${rephraseHeader} "Thank you for the valid key."`;
    let resp = await GPT.getGPTResponse(prompt);
    if (!resp) {
      this.requestSecretKey();
    } else {
      this.say(resp);
      this.handleStart();
    }
  };
  handleUserMessage = async (userMsg) => {
    this.saveUserMessage(userMsg);
    let resp = await GPT.getChattyGPTResponse(this.stateRef.messages, userMsg);
    this.say(resp);
  };

  /**  AI Design Actions   **/
  handleMenuOption = async (userChoice) => {
    // handle button press appropriately
    switch (this.stateRef.context) {
      case Contexts.Description:
        this.displayFromKnowledgeBase("description", userChoice);
        break;
      case Contexts.Stakeholders:
        this.displayFromKnowledgeBase("stakeholders", userChoice);
        break;
      case Contexts.NegativeImpacts:
        this.displayFromKnowledgeBase("negativeImpacts", userChoice);
        break;
      case Contexts.PositiveImpacts:
        this.displayFromKnowledgeBase("positiveImpacts", userChoice);
        break;
      default:
        console.error("Ended up in an unknown state");
        console.error(this.stateRef.context);
        break;
    }
  };
  displayFromKnowledgeBase = async (category, userChoice) => {
    // Determine if knowledge is about chatbot or self-driving vehicle project
    let urlString = window.location.search;  

    // Get the information needed from the knowledge base
    let kbContent = KnowledgeBase[category].content[userChoice];
    if (urlString.includes("project=auto")) {
      kbContent = AutoKnowledgeBase[category].content[userChoice];
    }
    
    let sectionContent = sessionStorage.getItem("sparki_" + category);
    if (!sectionContent || sectionContent === "") sectionContent = "This section is empty.";

    if (userChoice === "feedback") {
      // have chatbot give feedback
      let gptResp = await GPT.getChattyGPTResponse(
        this.stateRef.messages,
        kbContent[0] + sectionContent,
      );
      this.say(gptResp);
    } else {
      // remove option from menu
      this.removeMenuOption(userChoice);

      // have chatbot say the content
      for (let i = 0; i < kbContent.length - 1; i++) {
        this.say(kbContent[i]);
      }
      this.sayAndShowWidget(kbContent[kbContent.length - 1], {
        widget: "dynamicOptionsMenu",
      });
    }
  };

  /**  Chatbot utility funcions **/
  addMenuOptions = (newOptions) => {
    // add new options to existing options
    let menuOptions = this.stateRef.menuOptions.concat(newOptions);
    this.setMenuOptions(menuOptions);
  };
  removeMenuOption = (option) => {
    // remove options
    let menuOptions = this.stateRef.menuOptions.filter((e) => {
      return e.content !== option;
    });
    this.setMenuOptions(menuOptions);
  };
  setMenuOptions = (options) => {
    // update menu options to tell widget what option buttons to display
    this.setState((prev) => ({
      ...prev,
      menuOptions: options,
    }));
  };

  setScratchCode = (code = "say [Hello world!]") => {
    // update scratchCode in state to tell widget what code to display
    this.setState((prev) => ({
      ...prev,
      scratchCode: code,
    }));
  };

  say = (botMsg = "hello world") => {
    this.sendBotMessage(this.createChatBotMessage(botMsg));
  };
  sayAndShowWidget = (botMsg = "hello world", widget) => {
    this.sendBotMessage(this.createChatBotMessage(botMsg, widget));
  };
  saveUserMessage = (messageText) => {
    let id = this.stateRef.context.description;
    let userMsg = this.createClientMessage(messageText);
    // Store timestamp, user message, and context
    // TODO decide what to do about widgets
    Storage.storeMessage(Date.now(), "User", id, messageText);
    
    let prevLog = JSON.parse(sessionStorage.getItem("sparki_msglog_" + id));
    if (!prevLog) prevLog = [];
    sessionStorage.setItem(
      "sparki_msglog_" + id,
      JSON.stringify([...prevLog, userMsg])
    );

  };
  sendUserMessage = (messageText) => {
    let userMsg = this.createClientMessage(messageText);
    this.saveUserMessage(messageText);

    // post to chat log
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, userMsg],
    }));
  };
  sendBotMessage = (botMsg) => {
    let id = this.stateRef.context.description;
    // Store timestamp, bot message, and context
    // TODO decide what to do about widgets
    Storage.storeMessage(Date.now(), "Sparki", id, botMsg.message);

    let prevLog = JSON.parse(sessionStorage.getItem("sparki_msglog_" + id));
    if (!prevLog) prevLog = [];
    sessionStorage.setItem(
      "sparki_msglog_" + id,
      JSON.stringify([...prevLog, botMsg])
    );
    //console.log(this.stateRef); // debug message

    // post response to chat interface
    this.setState((prev) => ({
      ...prev,
      messages: [...prev.messages, botMsg],
    }));
  };
}

export default ActionProvider;
