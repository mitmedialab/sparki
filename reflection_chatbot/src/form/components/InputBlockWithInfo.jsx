import React, { useMemo } from "react";
import Accordion from "react-bootstrap/Accordion";

import debounce from "lodash.debounce";

import "./InputBlockWithInfo.css";

import KnowledgeBase from "../../chatbot/resources/KnowledgeBase";

const InputBlockWithInfo = ({
  inputType,
  label,
  id,
  placeholderText,
  onChange,
}) => {
  const [buttonStatus, setButtonStatus] = React.useState("visible"); // loading / visible
  const [infoboxStatus, setInfoboxStatus] = React.useState("hidden"); // hidden / visible

  if (!id in KnowledgeBase) {
    console.error("Got an invalid id on input block");
    console.error(id);
  }

  const onChangeHandler = () => {
    if (infoboxStatus === "hidden") setButtonStatus("loading");
  };
  const onInputValueEdited = (e) => {
    // make infobox and button visible
    setButtonStatus("visible");

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
                onChangeHandler();
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
                onChangeHandler();
                debouncedChangeHandler(e);
              }}
            />
          ),
        }[inputType]
      }
      {
        /* Info open button */
        {
          visible: (
            <button
              className="infobox-btn btn btn-primary"
              type="button"
              onClick={onInfoboxButtonClick}
            >
              <i class="bi bi-patch-question-fill" />
            </button>
          ),
          loading: (
            <button
              className="infobox-btn btn btn-primary"
              type="button"
              onClick={onInfoboxButtonClick}
            ></button>
          ),
        }[buttonStatus]
      }
      {
        /* Info component */
        infoboxStatus !== "hidden" && (
          <Accordion>
            <Accordion.Item
              eventKey={KnowledgeBase[id]["contentHeaders"].length}
            >
              <Accordion.Header>Progress checklist</Accordion.Header>
              <Accordion.Body>
                Complete all tasks for this section:
                <ul>
                  {KnowledgeBase[id]["progressContent"].map((x, i) => (
                    <li>{x}</li>
                  ))}
                </ul>
              </Accordion.Body>
            </Accordion.Item>
            {KnowledgeBase[id]["contentHeaders"].map((x, i) => (
              <Accordion.Item eventKey={i}>
                <Accordion.Header>{x.text}</Accordion.Header>
                <Accordion.Body>
                  {KnowledgeBase[id]["content"][x.content]}
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
