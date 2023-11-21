import React, { useEffect, useMemo, useState } from "react";
import Accordion from "react-bootstrap/Accordion";

import debounce from "lodash.debounce";

import "./InputBlockWithInfo.css";

import { KnowledgeBase, AutoKnowledgeBase } from "../../chatbot/resources/KnowledgeBase";

const InputBlockWithInfo = ({
  inputType,
  label,
  id,
  placeholderText,
  onChange,
}) => {
  const [infoboxStatus, setInfoboxStatus] = useState("hidden"); // hidden / visible
  const [checked, setChecked] = useState([]);

  // Determine if knowledge is about chatbot or self-driving vehicle project
  let urlString = window.location.search;  

  // Get the information needed from the knowledge base
  let kbContent = KnowledgeBase;
  if (urlString.includes("project=auto")) {
    kbContent = AutoKnowledgeBase;
  }

  if (id in kbContent === false) {
    console.error("Got an invalid id on input block");
    console.error(id);
  }

  useEffect(() => {
    let initCheckedVar = [];

    for (let i=0; i<kbContent[id]["progressContent"].length; i++) {
      initCheckedVar.push(false);
    }
    setChecked(initCheckedVar);
  }, []);

  const onInputValueEdited = (e) => {
    // call parent on change
    onChange(e);
  };
  const debouncedChangeHandler = useMemo(
    () => debounce(onInputValueEdited, 300),
    [infoboxStatus]
  );

  const onInfoboxButtonClick = () => {
    // change visibillity of infobox
    if (infoboxStatus === "hidden") setInfoboxStatus("visible");
    else setInfoboxStatus("hidden");
  };
  const elementLostFocus = (e) => {
    // From https://muffinman.io/blog/catching-the-blur-event-on-an-element-and-its-children/
    const currentTarget = e.currentTarget;

    // Give browser time to focus the next element
    requestAnimationFrame(() => {
      // Check if the new focused element is a child of the original container
      if (!currentTarget.contains(document.activeElement))
        setInfoboxStatus("hidden");
    });
  };

  const toggleCheckbox = (e) => {
    let itemNum = parseInt(e.target.value.slice(-1));
    let newCheckedVar = [...checked];
    newCheckedVar[itemNum] = !newCheckedVar[itemNum];

    //console.log(newCheckedVar); // debug message
    setChecked(newCheckedVar);
  };

  return (
    <div className="description-block" onBlur={elementLostFocus}>
      {label && (
        <label className="project-textlabel" htmlFor="project-description">
          {label}
        </label>
      )}
      {
        /* Text area or input box */
        {
          textarea: (
            <textarea
              className="project-description-edit inplace-textarea"
              placeholder={placeholderText}
              id={id}
              onChange={(e) => {
                debouncedChangeHandler(e);
              }}
            />
          ),
          input: (
            <input
              className="project-description-edit inplace-input"
              placeholder={placeholderText}
              id={id}
              onChange={(e) => {
                debouncedChangeHandler(e);
              }}
            />
          ),
        }[inputType]
      }
      {/* Info open button */}
      <button
        className="infobox-btn btn btn-primary"
        type="button"
        onClick={onInfoboxButtonClick}
      >
        <i class="bi bi-patch-question-fill" />
      </button>
      {
        /* Info component */
        infoboxStatus !== "hidden" && (
          <Accordion>
            <Accordion.Item
              eventKey={kbContent[id]["contentHeaders"].length}
            >
              <Accordion.Header>Progress checklist</Accordion.Header>
              <Accordion.Body>
                Check off these goals as you complete them:
                <ul class="progress-list">
                  {kbContent[id]["progressContent"].map((x, i) => (
                    <li class="progress-list-item">
                      <label htmlFor={"item" + (i + 1)}>
                        <input
                          type="checkbox"
                          id={"item" + (i + 1)}
                          key={"item" + (i + 1)}
                          value={"item" + i}
                          onChange={toggleCheckbox}
                          checked={checked[i]}
                        />
                        {x}{" "}
                      </label>
                    </li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            {kbContent[id]["contentHeaders"].map((x, i) => (
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{x.text}</Accordion.Header>
                <Accordion.Body>
                  {kbContent[id]["content"][x.content]}
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        )
      }
    </div>
  );
};
export default InputBlockWithInfo;
