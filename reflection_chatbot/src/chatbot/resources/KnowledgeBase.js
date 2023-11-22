export const KnowledgeBase = {
  description: {
    inputPlaceholder: `What does your project do?`,
    contentHeaders: [
      {text: `What is the project description?`, content: `description`},
      {text: `Example project description`, content: `example`},
      {text: `Uses of AI for mental health`, content: `ideas`},
    ],
    progressContent: [
      `Describe a project that is relevant to AI`,
      `Clearly explain what the project does or what problem it solves`,
      `Clearly explain where the project will be used and/or who it helps`,
    ],
    content: {
      description: `The project description describes what problem your project solves and for whom.`,
      example:
        `Let's say you are making a chatbot that helps teenagers deal with stress. This project helps teenagers deal with stress by guiding them through coping routines like breathing activities and exercise.`,
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
      `List at least three, specific stakeholders relevant to this project`,
      `Name at least one stakeholder that might be more vulnerable than others`,
    ],
    content: {
      stakeholders: `Stakeholders are anyone that might be interested in your project and its outcomes. Try to list at least three.`,
      example:
        `Three key stakeholders for a destress chatbot for teenagers are the teenagers, their parents, school counselors, and mental health experts. The most vulnerable stakeholders are teenagers who often have less power than their parents or healthcare professionals when it comes to mental health decisions.`,
      vulnerable:
        `Vulnerable stakeholders are most at risk and have the least control over the algorithm's impact on themselves. Think, who may be at risk because of bias or not knowing a lot about technology?`,
    },
  },
  positiveImpacts: {
    inputPlaceholder: `What are the potential benefits of your project?`,
    contentHeaders: [
      {text: `What are positive impacts?`, content: `positiveImpacts`},
      {text: `Show me an example`, content: `example`},
      {text: `What are common benefits of AI chatbots?`, content: `common`},
      {text: `What is a high impact project?`, content: `impact`},
      {text: `How do I use design justice?`, content: `designJustice`},
    ],
    progressContent: [
      `List at least three, specific positive impacts of your project`,
      `Mention who is most positively impacted (hint: it should be a vulnerable stakeholder)`,
      `State whether your project is low, medium, or high impact`,
    ],
    content: {
      positiveImpacts: `Positive impacts are ways your project helps your stakeholders.`,
      example: `The benefits of a destress chatbot are that they can be a low-barrier resource, making it easier for teenagers to get help. Teenagers who have a hard time getting access to good health care could benefit the most. This would have a high impact.`,
      common: `Common positive impacts of chatbots are 24/7 availability, ease of access, and that they can be easier to talk to since they seem non-judgemental.`,
      impact: `High impact projects often have far reaching implications, influence a lot of people, or have long-lasting effects. Low impact problems are less likely to affect important parts of people's lives. Do you think your project is low risk or high risk?`,
      designJustice: `It is important to use design justice to ensure that technology's benefits are equitably shared. How does your project benefit the most vulnerable people?`,
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
      `List at least three, specific negative impacts of your project`,
      `Mention who is most negatively impacted (hint: try to protect vulnerable stakeholders)`,
      `State whether your project is low, medium, or high risk`,
    ],
    content: {
      negativeImpacts: `Negative impacts are ways your projects might (even unintentionally!) harm your stakeholders or put them at risk.`,
      example: `The potential harms of an AI counselor are that teenagers could put too much trust in them, human counselors could have their jobs threatened, and this could lead to students who need more support not getting the resources they need. Teens who don't have a lot of people to talk to and need support are most at risk. This would be a pretty high risk project which would need a lot of oversight.`,
      common: `Common negative impacts of chatbots for mental health are that people can rely too much on flawed systems, the chatbot might unfairly treat some students differently than others, or people could feel their privacy is compromised by data collection. Also the existence of chatbots for wellbeing could threaten the jobs of healthcare professionals. Do you think any of these relate to your project?`,
      designJustice: `It is important to protect people who might be most at risk of harm. Design justice means doing yor best to reduce harm. Do you have any ideas for reducing harm?`,
      risk: `High risk projects are more likely to have negative consequences or to have negative consequences in sensitive areas like finances, safety, or well-being. Low risk projects have potential consequences that are predicitable or easily resolved. Do you think your project is low risk or high risk?`,
    },

  },
};

export const AutoKnowledgeBase = {
  description: {
    inputPlaceholder: `What does your project do?`,
    contentHeaders: [
      {text: `What is the project description?`, content: `description`},
      {text: `Example project description`, content: `example`},
      {text: `Uses of self-driving vehicles`, content: `ideas`},
    ],
    progressContent: [
      `Describe a project that is relevant to AI`,
      `Clearly explain what the project does or what problem it solves`,
      `Clearly explain where the project will be used and/or who it helps`,
    ],
    content: {
      description: `The project description describes what problem your project solves and for whom.`,
      example:
        `Let's say you are making a self-driving vehicle that benefits low-income communities. This project helps enhance affordability transportation in these communities by offering rides from people's homes to transport hubs, hospitals, and grocery stores.`,
      ideas:
        `Some problems that self-driving vehicles can address are on-demand transportation for individuals or communities, offering more accessible transportation for people with disabilities, delivering materials and goods, and automating tasks in industries like agriculture.`,
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
      `List at least three, specific stakeholders relevant to this project`,
      `Name at least one stakeholder that might be more vulnerable than others`,
    ],
    content: {
      stakeholders: `Stakeholders are anyone that might be interested in your project and its outcomes. Try to list at least three.`,
      example:
        `Three key stakeholders for my self-driving vehicles for low-income individuals are people who in the community who use the roads the vehicles will drive on, people without access to cars, and people with less knowledge about and access to technology. The most vulnerable stakeholders are people without a lot of knowledge and access to technology because they might be left out of a new, high-tech transportation system.`,
      vulnerable:
        `Vulnerable stakeholders are the people who are most at risk and have the least control over the algorithm's impact on themselves. Think, who may be left out of new technology creation or harmed if there are problems with the technology?`,
    },
  },
  positiveImpacts: {
    inputPlaceholder: `What are the potential benefits of your project?`,
    contentHeaders: [
      {text: `What are positive impacts?`, content: `positiveImpacts`},
      {text: `Show me an example`, content: `example`},
      {text: `What are common benefits of self-driving vehicles?`, content: `common`},
      {text: `What is a high impact project?`, content: `impact`},
      {text: `How do I use design justice?`, content: `designJustice`},
    ],
    progressContent: [
      `List at least three, specific positive impacts of your project`,
      `Mention who is most positively impacted (hint: it should be a vulnerable stakeholder)`,
      `State whether your project is low, medium, or high impact`,
    ],
    content: {
      positiveImpacts: `Positive impacts are ways your project helps your stakeholders.`,
      example: `The benefits of my self-driving vehicle project is that it can improve mobilty and access to transportation. People who cannot drive or do not have access to cars would get the most benefit from this work. This would have a high impact.`,
      common: `Common benefits of self-driving vehicles are that they can improve safety and traffic flow in some situations, they can improve mobility, save people time, reduce emissions from vehicles, and create new jobs. If the system is designed well.`,
      impact: `High impact projects often have far reaching implications, influence a lot of people, or have long-lasting effects. Low impact problems are less likely to effect important parts of people's lives. Do you think your project is low risk or high risk?`,
      designJustice: `It is important to use design justice to make sure that the benefits of tech are equitably shared. How does your project benefit people who are most vulnerable?`,
    },
  },
  negativeImpacts: {
    inputPlaceholder: `What are the potentially harmful consequences of your project?`,
    contentHeaders: [
      {text: `What are negative impacts?`, content: `negativeImpacts`},
      {text: `Show me an example`, content: `example`},
      {text: `What are common risks of self-driving vehicles?`, content: `common`},
      {text: `What is a high risk project?`, content: `risk`},
      {text: `How do I use design justice?`, content: `designJustice`},
    ],
    progressContent: [
      `List at least three, specific negative impacts of your project`,
      `Mention who is most negatively impacted (hint: try to protect vulnerable stakeholders)`,
      `State whether your project is low, medium, or high risk`,
    ],
    content: {
      negativeImpacts: `Negative impacts are ways your projects might (even unintentionally!) harm your stakeholders or put them at risk.`,
      example: `The potential harms of my self-driving vehicle project is that we have to test to make sure they can be used safely in the neighborhoods we want to use them. We also have to be careful to make sure that other people who work in transportation do not have their jobs threatened and that people who are not as comfortable with technology or don't have a lot of access to it are included. This would be a pretty high risk project which would need a lot of testing and oversight.`,
      common: `Common negative impacts of self-driving vehicles are that people can rely too much on flawed systems, the vehicle might help people who are already wealthy more while making transportation harder for people with less, and people's jobs could be threatened. Also the beginning stages of creating a new self-driving vehicle system could be very dangerous and expensive. Do you think any of these relate to your project?`,
      designJustice: `It is important to protect people who might be most at risk of harm. Design justice means doing yor best to reduce harm. Do you have any ideas for reducing harm?`,
      risk: `High risk projects are more likely to have negative consequences or to have negative consequences in sensitive areas like finances, safety, or well-being. Low risk projects have potential consequences that are predicitable or easily resolved. Remember that starting with a simple, lower risk project is okay. Do you think your project is low risk or high risk?`,
    },

  },
};