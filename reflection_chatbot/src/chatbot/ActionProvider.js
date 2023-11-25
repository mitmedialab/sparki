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
  getCategory = () => {
    switch (this.stateRef.context) {
      case Contexts.Description:
        return "description";
      case Contexts.Stakeholders:
        return "stakeholders";
      case Contexts.NegativeImpacts:
        return "negativeImpacts";
      case Contexts.PositiveImpacts:
        return "positiveImpacts";
      default:
        console.error("Ended up in an unknown state");
        console.error(this.stateRef.context);
        break;
    }
  };
  handleUserMessage = async (userMsg) => {
    // add user message to log
    this.saveUserMessage(userMsg);

    // Use knowledge base and project context to respond to user inquiry
    let category = this.getCategory();
    let projectDescription = sessionStorage.getItem("sparki_description");
    if (projectDescription) {
      projectDescription = `Here is my project description: ${projectDescription} `;
      if (category !== "description") {
        let sectionContent = sessionStorage.getItem("sparki_" + category);
        if (sectionContent) {
          projectDescription += `I am working on the ${category} section. Here is what I have so far: ${sectionContent}`;
        }
      }
      // give GPT context about project + info from the knowledge base
      userMsg = `${projectDescription}. Help me answer this question: "${userMsg}"`;
    }

    // get response from GPT
    let resp = await GPT.getChattyGPTResponse(this.stateRef.messages, userMsg);

    // display response in chatbot
    this.say(resp);
  };

  /**  AI Design Actions   **/
  handleMenuOption = async (userChoice) => {
    // handle button press appropriately
    this.displayFromKnowledgeBase(this.getCategory(), userChoice);
  };
  displayFromKnowledgeBase = async (category, userChoice) => {
    // Determine whether project is about chatbot or self-driving vehicle project
    //   to get relevant knowledge base content
    let urlString = window.location.search;
    // Get the information needed from the knowledge base
    let kbContent = KnowledgeBase[category].content[userChoice];
    if (urlString.includes("project=auto")) {
      kbContent = AutoKnowledgeBase[category].content[userChoice];
    }

    // If user is asking for feedback, launch progress checklist
    if (userChoice === "feedback") {
      this.sayAndShowWidget("Let's check out your progress so far", {
        widget: "checklistWidget",
      });
    } else if (userChoice === "example") {
      // If user asks for an example, use the KnowledgeBase example
      for (let i = 0; i < kbContent.length - 1; i++) {
        this.say(kbContent[i]);
      }
      this.sayAndShowWidget(kbContent[kbContent.length - 1], {
        widget: "dynamicOptionsMenu",
      });
    } else {
      // If the user asks for anything else, have GPT augment KnowledgeBase content
      // First get project context
      let projectDescription = sessionStorage.getItem("sparki_description");
      if (projectDescription) {
        projectDescription = `Here is my project description: ${projectDescription} `;
        if (category !== "description") {
          let sectionContent = sessionStorage.getItem("sparki_" + category);
          if (sectionContent) {
            projectDescription += `I am working on the ${category} section. Here is what I have so far: ${sectionContent}`;
          }
        }

        // give GPT context about project + info from the knowledge base
        let gptPrompt = `${projectDescription} Rephrase the following information in terms of my project: "${kbContent.join(
          " "
        )}".`;

        console.log(gptPrompt);
        // have GPT construct new response based on context
        let resp = await GPT.getChattyGPTResponse(
          this.stateRef.messages,
          gptPrompt
        );
        //console.log(resp);

        // have GPT use whatever is in the knoweldge base to construct response
        this.sayAndShowWidget(resp, {
          widget: "dynamicOptionsMenu",
        });
      } else {
        // have neither project description nor any section content
        // say what's in the knowledge base
        for (let i = 0; i < kbContent.length - 1; i++) {
          this.say(kbContent[i]);
        }
        this.sayAndShowWidget(kbContent[kbContent.length - 1], {
          widget: "dynamicOptionsMenu",
        });
      }
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
