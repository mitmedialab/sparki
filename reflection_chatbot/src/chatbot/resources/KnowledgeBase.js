import Contexts from "./BotContext";

const KnowledgeBase = {
  description: {
    inputPlaceholder: `What does your project do?`,
    initialChatMessage: `The project description should describe what problem your project solves and for whom.`,
    initialChatContext: Contexts.Description,
    initialChatMenu: [
      {text: `Show me an example`, content: `example`},
      {text: `Give me some ideas`, content: `ideas`},
      {text: `Progress check`, content:`feedback`},
    ],
    progressContent: [
      `Describe a project that is relevant to AI`,
      `Clearly explain what the project does or what problem it solves`,
      `Clearly explain where the project will be used and/or who it helps`,
    ],
    content: {
      feedback: [
        `Grade my project description according to this rubric: Item1. If the project describes a project that is relevant to AI, give me 1 point, if not, give me 0. Item2. If the project clearly explains what the project does or what problem it solves, give me 1 point, if not, give me 0. Item3. If the project clearly explains where the project will be used and/or who it helps, give me 1 point, if not, give me 0. If it says the section is null, all scores should be 0. Give me positiveFeedback with one piece of positive feedback. Give me negativeFeedback with one piece of negative feedback. Place the entire response in json format like this {"Item1": #, "Item2": #, "Item3": #, "positiveFeedback":"", "negativeFeedback":""}. Here is my description: `,
      ],
      example: [
        `I can share an example. Let's say that I am making a chatbot that helps teenagers deal with stress.`,
        `This would be my description: This project helps teenagers deal with stress by guiding them through coping routines like breathing activities and exercise.`,
        `What are important points for your project description?`
      ],
      ideas: [
        `In general, AI chatbots can help promote mental health by offering health resources, guiding users through exercises, facilitating access to helplines, and giving users a safe space to express their emotions.`,
        `Would you like some more ideas?`,
      ],
    },
  },
  stakeholders: {
    inputPlaceholder: `Which individuals, groups, or organizations might be impacted by your project?`,
    initialChatMessage: `Stakeholders are anyone that might be interested in your project and its outcomes. Can you think of at least three people who might be impacted by your project?`,
    initialChatContext: Contexts.Stakeholders,
    initialChatMenu: [
      {text: `Show me an example`, content: `example`},
      {text: `Who are vulnerable stakeholders?`, content: `vulnerable`},
      {text: `Progress check`, content: `feedback`},
    ],
    progressContent: [
      `List at least three, specific stakeholders relevant to this project`,
      `Name at least one stakeholder that might be more vulnerable than others`,
    ],
    content: {
      feedback: [
        `Grade my ideas about stakeholders according to this rubric:  Item1. If I list at least three specific stakeholders relevant to my project, give me 1 point, if not, give me 0. Item2. If I name at least one stakeholder that might be more vulnerable than others, give me 1 point, if not, give me 0. If it says the section is null, all scores should be 0. Give me positiveFeedback with one piece of positive feedback. Give me negativeFeedback with one piece of negative feedback. Place the entire response in json format like this {"Item1": #, "Item2": #, "positiveFeedback":"", "negativeFeedback":""}. Here are my stakeholders: `,
      ],
      example: [
        `OK here's an example. Let's say that I am making a chatbot that helps teenagers deal with stress.`,
        `Here are three key stakeholders: the teenagers, their parents, school counselors, and mental health experts.`,
        `The most vulnerable stakeholders are teenagers who often have less power than their parents or healthcare professionals when it comes to mental health decisions.`,
        `Feel free to ask if you would like ideas for your project.`
      ],
      vulnerable: [
        `Vulnerable stakeholders are the people who are most at risk and have the least control over the algorithm's impact on themselves.`,
        `Who may be at risk because of bias or not knowing a lot about technology?`,
      ],
    },
  },
  positiveImpacts: {
    inputPlaceholder: `What are the potential benefits of your project?`,
    initialChatMessage: `Positive impacts are ways that your project helps your stakeholders.`,
    initialChatContext: Contexts.PositiveImpacts,
    initialChatMenu: [
      {text: `Show me an example`, content: `example`},
      {text: `Progress check`, content: `feedback`},
      {text: `Give me some ideas`, content: `ideas`},
      {text: `What is a high impact project?`, content: `impact`},
      {text: `How do I use design justice?`, content: `stakeholders`},
    ],
    progressContent: [
      `List at least three, specific positive impacts of your project`,
      `Mention who is most positively impacted (hint: it should be a vulnerable stakeholder)`,
      `State whether your project is low, medium, or high impact`,
    ],
    content: {
      feedback: [
        `Grade my ideas about positive impacts according to this rubric: Item1. If I list at least three, specific positive impacts of your project, give me 1 point, if not, give me 0. Item2. If I mention who is most positively impacted, give me 1 point, if not, give me 0. Item3. If I state whether your project is low, medium, or high impact, give me 1 point, if not, give me 0. If it says the section is null, all scores should be 0. Give me positiveFeedback with one piece of positive feedback. Give me negativeFeedback with one piece of negative feedback. Place the entire response in json format like this {"Item1": #, "Item2": #, "Item3": #, "positiveFeedback":"", "negativeFeedback":""}.  Here are my positive impacts: `,
      ],
      example: [
        `Here's an example. Let's say that I am making a chatbot that helps teenagers deal with stress.`,
        `One benefit of this chatbot is that they can be a low-barrier resource that makes it easier to get help.`,
        `Teenagers who have a hard time getting access to good health care could benefit the most. This would have a high impact.`,
        `Feel free to ask if you would like ideas for your project.`
      ],
      ideas: [
        `Some common benefits of chatbots for mental health are that they can be convenient to access, they are discreet since they can talk to people anonymously, and that they can be engaging and interactive.`,
        `Do some of these benefits apply to your project, or would you like more ideas?`
      ],
      stakeholders: [
        `It is important to use design justice to make sure that the benefits of tech are equitably shared.`,
        `How does your project benefit people who are most vulnerable?`
      ],
      impact: [
        `High impact projects often have far reaching implications, influence a lot of people, or have long-lasting effects.`,
        `Low impact problems are less likely to effect important parts of people's lives.`,
        `Do you think your project is high impact or low impact?`
      ]
    },
  },
  negativeImpacts: {
    inputPlaceholder: `What are the potentially harmful consequences of your project?`,
    initialChatMessage: `Negative impacts are ways that your projects might (unintentionally!) harm your stakeholders or put them at risk.`,
    initialChatContext: Contexts.NegativeImpacts,
    initialChatMenu: [
      {text: `Show me an example`, content: `example`},
      {text: `Give me some ideas`, content: `ideas`},
      {text: `Progress check`, content: `feedback`},
      {text: `How do I use design justice?`, content: `stakeholders`},
      {text: `What is a high risk project?`, content: `risk`},
    ],
    progressContent: [
      `List at least three, specific negative impacts of your project`,
      `Mention who is most negatively impacted (hint: try to protect vulnerable stakeholders)`,
      `State whether your project is low, medium, or high risk`,
    ],
    content: {
      feedback: [
        `Grade my ideas about negative impacts according to this rubric: Item1. If I list at least three, specific negative impacts of my project, give me 1 point, if not, give me 0. Item2. If I mention who is most negatively impacted, give me 1 point, if not, give me 0. Item3. If I state whether my project is low, medium, or high risk, give me 1 point, if not, give me 0. If it says the section is null, all scores should be 0. Give me positiveFeedback with one piece of positive feedback. Give me negativeFeedback with one piece of negative feedback. Place the entire response in json format like this {"Item1": #, "Item2": #, "Item3": #, "positiveFeedback":"", "negativeFeedback":""}. Here are my negative impacts: `,
      ],
      example: [
        `Check out this example. Let's say that I am making a chatbot that helps teenagers deal with stress.`,
        `The potential harms are: teenagers could put too much trust in it, human counselors could have their jobs threatened, and this could lead to students who need more support not getting the resources they need.`,
        `Teens who don't have a lot of people to talk to and need support are most at risk. This would be a pretty high risk project which would need a lot of oversight.`,
        `Does this seem similar to your project idea?`
      ],
      ideas: [
        `Common negative impacts of chatbots for mental health are that people can rely too much on flawed systems, the chatbot might unfairly treat some people differently than others, or people could have their privacy compromised by data collection.`,
        `Also the existence of chatbots for wellbeing could threaten the jobs of healthcare professionals.`,
        `Do any of these relate to your project?`,
      ],
      stakeholders: [
        `It is important to protect people who might be most at risk of harm.`,
        `Design justice means doing yor best to reduce harm. Do you have any ideas for reducing harm?`
      ],
      risk: [
        `High risk projects are more likely to have negative consequences or to have negative consequences in sensitive areas like finances, safety, or well-being.`,
        `Low risk projects have potential consequences that are predicitable or easily resolved.`,
        `Do you think your project is low risk or high risk?`
      ],
    },

  },
};

export default KnowledgeBase;
