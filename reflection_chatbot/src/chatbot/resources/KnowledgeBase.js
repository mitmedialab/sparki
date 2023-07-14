import Contexts from "./BotContext";

const KnowledgeBase = {
  description: {
    inputPlaceholder: `What does your project do?`,
    initialChatMessage: `The project description describes what problem your project solves and for whom.`,
    initialChatContext: Contexts.Description,
    initialChatMenu: [
      {text: `Explain with an example`, content: `example`},
      {text: `Give me some ideas`, content: `ideas`},
      {text: `Give me feedback`, content:`feedback`},
    ],
    content: {
      feedback: [
        `A good description should explain who is helped with what problem. Give me positive and negative feedback on my description: `,
      ],
      example: [
        `Let's say that you are making a chatbot that acts as a school counselor.`,
        `This project will help school counselors give their students access to advice and resources to better navigate issues in school and to plan their future careers.`
      ],
      ideas: [
        `Some problems that AI chatbots can address in schools are supporting teachers, school staff, or school counselors in working with students.`,
      ],
    },
  },
  stakeholders: {
    inputPlaceholder: `Which individuals, groups, or organizations might be impacted by your project?`,
    initialChatMessage: `Stakeholders are anyone that might be interested in your project and its outcomes. Try to list at least three.`,
    initialChatContext: Contexts.Stakeholders,
    initialChatMenu: [
      {text: `Explain with an example`, content: `example`},
      {text: `Who are vulnerable stakeholders?`, content: `vulnerable`},
      {text: `Give me feedback`, content: `feedback`},
    ],
    content: {
      feedback: [
        `I should list at least three stakeholders and identify the most vulnerable stakeholders. Give me positive and negative feedback on my stakeholders: `,
      ],
      example: [
        `Three key stakeholders for a school counselor chatbot are students, school counselors, and parents.`,
        `The most vulnerable stakeholders are students who have less power than adults in school settings.`
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
      {text: `Expain with an example`, content: `example`},
      {text: `Give me feedback`, content: `feedback`},
      {text: `What is a high impact project?`, content: `impact`},
      {text: `How do I use design justice?`, content: `stakeholders`},
    ],
    content: {
      feedback: [
        `I should list three ways my project might help people, who will benefit the most, and how big my project's impact is (high, medium, or low). Give me positive and negative feedback on my positive impacts: `,
      ],
      example: [
        `The benefits of a school counselor chatbot are that counselors will be able to help more students, students may feel more comfortable opening up to a non-judgemental chatbot, and counseling could be more pesonalized.`,
        `Students at schools where counselors are less available could benefit the most. This would have a high impact.`
      ],
      stakeholders: [
        `It is important to know which stakeholders get the most benefits.`,
        `Design justice means making sure that the benefits of tech are equitably shared.`,
      ],
      impact: [
        `High impact projects often have far reaching implications, influence a lot of people, or have long-lasting effects.`,
        `Low impact problems are less likely to effect important parts of people's lives.`
      ]
    },
  },
  negativeImpacts: {
    inputPlaceholder: `What are the potentially harmful consequences of your project?`,
    initialChatMessage: `Negative impacts are ways that your projects might (unintentionally!) harm your stakeholders or put them at risk.`,
    initialChatContext: Contexts.NegativeImpacts,
    initialChatMenu: [
      {text: `Explain with an example`, content: `example`},
      {text: `List common risks`, content: `common`},
      {text: `Give me feedback`, content: `feedback`},
      {text: `How do I use design justice?`, content: `stakeholders`},
      {text: `What is a high risk project?`, content: `risk`},
    ],
    content: {
      feedback: [
        `I should phrase three potential negative impacts of project, identify which stakeholders are most likely to be harmed, and say if this project is high or low risk. Give me positive and negative feedback on my negative impacts: `
      ],
      example: [
        `The potential harms of an AI counselor are that students could put too much trust in them, human counselors could have their jobs threatened, and this could lead to students who really need support not getting the resources they need.`,
        `Students who are typically thought of as special cases who need more support than others are most at risk. This would be a pretty high risk project which would need a lot of oversight.`
      ],
      common: [
        `Common negative impacts of chatbots in school settings are that people can rely too much on flawed systems, the chatbot might unfairly treat some students differently than others, or students could feel their privacy is compromised by data collection.`,
        `Also the existence of school counselors could threaten the jobs of humans in those roles, especially at schools that are already low-resourced.`
      ],
      stakeholders: [
        `It is important to know which stakeholders are most at risk of harm. The potential benefits should be balanced with the potential for harm.`,
        `Design justice means doing yor best to reduce harm, especially for the stakeholders that are most vulnerable.`
      ],
      risk: [
        `High risk projects are more likely to have negative consequences or to have negative consequences in sensitive areas like finances, safety, or well-being.`,
        `Low risk projects have potential consequences that are predicitable or easily resolved.`
      ],
    },

  },
};

export default KnowledgeBase;
