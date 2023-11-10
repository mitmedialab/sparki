import React, { useEffect, useState } from "react";

import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import DynamicMenu from "./OptionsMenus/DynamicMenu";

import GPT from "../../gpt/GPTController";
import Contexts from "../resources/BotContext";
import KnowledgeBase from "../resources/KnowledgeBase";

import "./ChecklistWidget.css";

const ChecklistWidget = (props) => {
  console.log(props);
  const [sectionContent, setSectionContent] = useState("null");
  const [progressChecklist, setProgressChecklist] = useState({
    Items: [],
    positiveFeedback: "",
    negativeFeedback: "",
  });

  // if section is updated, rerun the progress checker
  useEffect(() => {
    let category = getCategory(props.context);
    let rubric = updateSectionContent(category);
    updateProgressChecker(category, rubric, sectionContent);
  }, [sectionContent]);

  // turn context Symbol into category name
  const getCategory = (context) => {
    switch (context) {
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
        console.error(context);
        break;
    }
  };

  const updateSectionContent = (category) => {
    console.log(category);
    let rubric = KnowledgeBase[category]["progressContent"];
    let newSectionContent = sessionStorage.getItem("sparki_" + category);
    if (!newSectionContent || newSectionContent === "")
      newSectionContent = "null";

    // console.log(`rubric: ${rubric}); // debug message
    // console.log(`section content: ${newSectionContent}`); // debug message
    setSectionContent(newSectionContent);
    return rubric;
  };

  const updateProgressChecker = async (category, rubric, sectionContent) => {
    // get input from GPT
    let gptResp = await GPT.getChattyGPTResponse(
      [], // don't send anything in message log
      KnowledgeBase[category].content["feedback"][0] + sectionContent
    );
    console.log(`"${sectionContent}"`);
    //console.log(gptResp); // debug message

    if (gptResp) {
      let newChecklist = parseGptResp(gptResp, rubric);
      console.log(gptResp);
      console.log(newChecklist);

      // update progress checklist
      setProgressChecklist(newChecklist);
    } else console.error(`Did not get a response from GPT`);
  };

  const parseGptResp = (gptResp, rubric) => {
    const newChecklist = {
      Items: [],
      positiveFeedback: "",
      negativeFeedback: "",
    };

    // parse the GPT's response into JSON
    let parsedChecklist;
    try {
      parsedChecklist = JSON.parse(gptResp);
    } catch (e) {
      // TODO if this is messy, display textbox without formatting
      console.error(`Error parsing GPT response's JSON: ${e}`);
    }

    // if parsing worked, move the result into a progress obj
    // Items: [], positiveFeedback: "", negativeFeedback: ""
    if (parsedChecklist) {
      // start with checklist items
      let checklistItems = Object.keys(parsedChecklist).filter((key) =>
        key.startsWith("Item")
      );
      // console.log(checklistItems); // debug message

      // make sure there is a match between the received checklist and our rubric
      if (checklistItems.length === rubric.length) {
        let itemsWithScores = [];
        for (let i = 0; i < rubric.length; i++) {
          let keyName = "Item" + (i + 1);
          // console.log(keyName); // debug message

          if (keyName in parsedChecklist) {
            itemsWithScores.push({
              criteria: rubric[i],
              score: parsedChecklist[keyName],
            });
          } else console.error(`Missing expected keyname: ${keyName}`);
        }
        newChecklist["Items"] = itemsWithScores;
      }

      // now do positive and negative feedback
      // (beware of occassional values: "null" or ""
      checkPositiveNegativeFeedback(
        "positiveFeedback",
        parsedChecklist,
        newChecklist
      );
      checkPositiveNegativeFeedback(
        "negativeFeedback",
        parsedChecklist,
        newChecklist
      );
    }

    return newChecklist;
  };

  const checkPositiveNegativeFeedback = (
    feedback,
    oldChecklist,
    newChecklist
  ) => {
    if (
      feedback in oldChecklist === false ||
      oldChecklist[feedback] === "null" ||
      oldChecklist[feedback] === ""
    )
      newChecklist[feedback] = null;
    else newChecklist[feedback] = oldChecklist[feedback];
  };

  return (
    <>
      <Card key="progress-checker" text="dark" style={{ fontSize: "14px" }}>
        <Card.Header>
          Progress Guesstimate
        </Card.Header>
        <Card.Body>
          {/* Create checklist with corresponding icons for rubric items*/}
          {progressChecklist["Items"].map((item) => {
            return item.score === 0 ? (
              <Card.Text>
                <i className="bi bi-dash-square-dotted"></i>
                &nbsp;{item.criteria}
              </Card.Text>
            ) : (
              <Card.Text>
                <i className="bi bi-check-square-fill"></i>
                &nbsp;{item.criteria}
              </Card.Text>
            );
          })}
        </Card.Body>

        {/* Display positive and negative feedback */}
        <ListGroup variant="flush">
          {progressChecklist["positiveFeedback"] && (
            <ListGroup.Item>
              <i className="bi bi-hand-thumbs-up-fill"></i>
              &nbsp;{progressChecklist["positiveFeedback"]}
            </ListGroup.Item>
          )}
          {progressChecklist["negativeFeedback"] && (
            <ListGroup.Item>
              <i className="bi bi-lightbulb"></i>
              &nbsp;{progressChecklist["negativeFeedback"]}
            </ListGroup.Item>
          )}
        </ListGroup>
      </Card>

      <DynamicMenu key="options-menu" {...props} />
    </>
  );
};

export default ChecklistWidget;
