# reflection_chatbot

Uses a LLM to help programmers manage their project direction, set goals, and iterate on their work.

## Setting up project

The easiest way to setup and begin tinkering with this project is to load this repository on Gitpod

Alternatively, you can setup the project on your own computer by following the directions below.

1.  **Install required dependencies**
    We have successfully run this project on npm version of 8.19.3 and higher.

2.  **Clone repository**
    `git clone https://github.com/mitmedialab/sparki.git`

3.  **Setup and build repository**

    ```
    cd reflection_chatbot

    # Install dependencies
    npm install

    # start development server at localhost:3000
    npm start
    ```

4.  **Deploy project**
    _Warning: running this code from any branch will replace the contents of the [live site](https://mitmedialab.github.io/sparki/) of this repository._
    This was setup by following [Github's react-gh-pages](https://github.com/gitname/react-gh-pages) instructions.

        ```
        cd reflection_chatbot

        # Build and publish latest version of site
        npm run deploy
        ```

# Quick Tutorial

## Configuring the chatbot

The initial configuration for the chatbot is done in _chatbot/config.js_. Here, you can specify the chatbot's name, initial message, and included widgets.

## Accessing GPT

Functions for interfacing with GPT are contained in _gpt/GPTController.js_. If you are doing developing and testing and don't want to make repetitive GPT calls, in _GPTController.js_ set `static devMode = true;` This will bypass requests to the GPT endpoint.

You can see examples of its use in _ActionProvider.js_ and _MessageParser.js_.

```
	// import GPTController.js
	import GPT from "../gpt/GPTController.js"

	// write instructions to give GPT
	let prompt = "Respond to the users' question as a social robot named Jibo: How are you today?";
	// send the message to GPT
	let resp = await GPT.getGPTResponse(prompt);

	// the response comes as a string
	console.log(resp); // "Hi there! I'm doing great, thanks for asking!"
```

## Parsing user messages

Functions for handling the messages a user sends to the chatbot are found in _chatbot/MessageParser.js_. Most of the action happens in the `parse(userMsg)` function.

Add an else-if statement with conditions that capture what kind of message you are looking for. For example, if the user message contains a specific word. In the body of the else-if statement, call an actionProvider function.

```
else if (userMsg.includes("Jibo")) {
	this.actionProvider.exampleHandler(userMsg);
}
```

## Responding as the chatbot

Functions for having the chatbot respond to the user are found in _chatbot/ActionProvider.js_. Create a new function to respond to what the user says and show any applicable widgets. The utility functions `say` and `sayAndShowWidget` are wrappers for posting messages and widgets to the chatbot interface. You can update the chatbot's [context or state](https://www.chatbot.com/help/stories/what-is-context/) using the `updateContext` function.

```
exampleHandler = async (message) => {
	// Use prompts to give instructions to GPT
	let  prompt = `Answer this question about Jibo, an awesome social robot with the 		personality of a 10-year-old who loves penguins and the color blue: ${message}`;

	// Call GPT.getGPTResponse to get response from GPT
	let  resp = await  GPT.getGPTResponse(prompt);

	// Use "say" or "sayAndShowWidget" functions to make the robot actually do things
	this.sayAndShowWidget(resp, { widget:  "JiboWidget" });
}
```

## Creating a Widget

Widgets that appear in chatbots, like the buttons, are contained in _chatbot/components_. You can create new _.jsx_ files to hold definitions for the widgets. An example widget is provided in the source code.

After creating a new widget, you must initialize it in _chatbot/config.js_

```
/* import additional widgets like so */
import ExampleWidget from "./components/JiboWidget.jsx"
...
const config = {
	...
	widgets: [
		...,
		{
			widgetName: "ExampleWidget",
			widgetFunc: (props) => <ExampleWidget {...props} />,
		}
	],
};
```

You can call the widget by name in the _chatbot/ActionProvider.js_ function.

```
this.sayAndShowWidget(resp, { widget:  "ExampleWidget" });
```
