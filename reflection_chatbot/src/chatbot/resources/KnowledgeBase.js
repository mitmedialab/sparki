import Contexts from "./BotContext";

const KnowledgeBase = {
  description: {
    inputPlaceholder: `What does your project do?`,
    contentHeaders: [
      {text: `What is the project description?`, content: `description`},
      {text: `Example project description`, content: `example`},
      {text: `Uses of AI for mental health`, content: `ideas`},
    ],
    progressContent: [

    ],
    content: {
      description: `The project description describes what problem your project solves and for whom.`,
      example:
        `Let's say that you are making a chatbot that helps teenagers deal with stress. This project helps teenagers deal with stress by guiding them through coping routines like breathing activities and exercise.`,
      ideas:
        `Some problems that AI chatbots can address for mental health are offering health resources, guiding users through exercises, facilitating access to helplines, and giving users a safe space to express their emotions.`,
    },
  },
  stakeholders: {
    inputPlaceholder: `Which individuals, groups, or organizations might be impacted by your project?`,
    contentHeaders: [
      {text: `What are stakeholders?`, content: `stakeholders`},
      {text: `Example project stakeholders`, content: `example`},
      {text: `Who are vulnerable stakeholders?`, content: `vulnerable`},
    ],
    progressContent: [
      `My goal is to list at least three stakeholders and identify the most vulnerable stakeholders. Give me one piece of positive feedback and one piece of negative feedback on my stakeholders: `,
    ],
    content: {
      stakeholders: `Stakeholders are anyone that might be interested in your project and its outcomes. Try to list at least three.`,
      example:
        `Three key stakeholders for a destress chatbot for teenagers are the teenagers, their parents, school counselors, and mental health experts. The most vulnerable stakeholders are teenagers who often have less power than their parents or healthcare professionals when it comes to mental health decisions.`,
      vulnerable:
        `Vulnerable stakeholders are the people who are most at risk and have the least control over the algorithm's impact on themselves. Think, who may be at risk because of bias or not knowing a lot about technology?`,
    },
  },
  positiveImpacts: {
    inputPlaceholder: `What are the potential benefits of your project?`,
    contentHeaders: [
      {text: `What are positive impacts?`, content: `positiveImpacts`},
      {text: `Show me an example`, content: `example`},
      {text: `What are common benefits AI chatbots?`, content: `common`},
      {text: `What is a high impact project?`, content: `impact`},
      {text: `How do I use design justice?`, content: `designJustice`},
    ],
    progressContent: [
      `My goal is to list three ways my project might help people, identify who will benefit the most, and say how big my project's impact is (high, medium, or low). Give me one piece of positive feedback and one piece of negative feedback on my positive impacts: `,
    ],
    content: {
      positiveImpacts: `Positive impacts are ways that your project helps your stakeholders.`,
      example: `The benefits of a destress chatbot are that they can be a low-barrier resource which makes it easier for teenagers to get help. Teenagers who have a hard time getting access to good health care could benefit the most. This would have a high impact.`,
      impact: `High impact projects often have far reaching implications, influence a lot of people, or have long-lasting effects. Low impact problems are less likely to effect important parts of people's lives. Do you think your project is low risk or high risk?`,
      designJustice: `It is important to use design justice to make sure that the benefits of tech are equitably shared. How does your project benefit people who are most vulnerable?`,
    },
  },
  negativeImpacts: {
    inputPlaceholder: `What are the potentially harmful consequences of your project?`,
    contentHeaders: [
      {text: `What are negative impacts?`, content: `negativeImpacts`},
      {text: `Show me an example`, content: `example`},
      {text: `What are common risks of AI chatbots?`, content: `common`},
      {text: `What is a high risk project?`, content: `risk`},
      {text: `How do I use design justice?`, content: `designJustice`},
    ],
    progressContent: [
      `My goal is to identify three potential negative impacts of project, identify which stakeholders are most likely to be harmed, and say if this project is high or low risk. Give me one piece of positive feedback and one piece of negative feedback on my negative impacts: `
    ],
    content: {
      negativeImpacts: `Negative impacts are ways that your projects might (unintentionally!) harm your stakeholders or put them at risk.`,
      example: `The potential harms of an AI counselor are that teenagers could put too much trust in them, human counselors could have their jobs threatened, and this could lead to students who need more support not getting the resources they need. Teens who don't have a lot of people to talk to and need support are most at risk. This would be a pretty high risk project which would need a lot of oversight.`,
      common: `Common negative impacts of chatbots for mental health are that people can rely too much on flawed systems, the chatbot might unfairly treat some students differently than others, or people could feel their privacy is compromised by data collection. Also the existence of chatbots for wellbeing could threaten the jobs of healthcare professionals. Do you think any of these relate to your project?`,
      designJustice: `It is important to protect people who might be most at risk of harm. Design justice means doing yor best to reduce harm. Do you have any ideas for reducing harm?`,
      risk: `High risk projects are more likely to have negative consequences or to have negative consequences in sensitive areas like finances, safety, or well-being. Low risk projects have potential consequences that are predicitable or easily resolved. Do you think your project is low risk or high risk?`,
    },

  },
};

export default KnowledgeBase;
