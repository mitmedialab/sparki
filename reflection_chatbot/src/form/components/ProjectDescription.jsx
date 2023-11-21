import React, { useMemo, useState } from "react";
import debounce from "lodash.debounce";

import { KnowledgeBase, AutoKnowledgeBase } from "../../chatbot/resources/KnowledgeBase";
import Storage from "../../user_util/StorageLog";

import "./ProjectDescription.css";
import InputWithInfo from "./InputBlockWithInfo";

const ProjectDescription = () => {
  // Determine if knowledge is about chatbot or self-driving vehicle project
  let urlString = window.location.search;  

  // Get the information needed from the knowledge base
  let kbContent = KnowledgeBase;
  if (urlString.includes("project=auto")) {
    kbContent = AutoKnowledgeBase;
  }

  const [formStatus, setFormStatus] = useState("Saved");

  const onSave = (e) => {
    setFormStatus("Saving...");

    let proposal = {};
    const sections = [
      "title",
      "description",
      "stakeholders",
      "positiveImpacts",
      "negativeImpacts",
    ];
    for (const section of sections) {
      let sectionContent = sessionStorage.getItem("sparki_" + section);
      if (sectionContent !== null) {
        proposal[section] = sectionContent;
      }
    }
    //console.log(proposal); // debug message
    Storage.storeProposal(proposal);

    window.alert("Your work has been saved. It is OK to close the page now.");
    setFormStatus("Saved");
  };

  const handleFormChange = (e) => {
    let section = e.target.id;
    let content = e.target.value;

    // save updated text in session storage
    sessionStorage.setItem("sparki_" + section, content);

    // save updated text in session log
    let updatedItem = `Updated project ${section}: ${content}`;
    Storage.storeMessage(Date.now(), "User", section, updatedItem);
    //console.log(`Updated section ${section} to ${newValue}`); // debug message

    // TODO prevent closing page without saving
    setFormStatus("Save");
  };

  const debouncedChangeHandler = useMemo(
    () => debounce(handleFormChange, 300),
    []
  );

  return (
    <div className="container-sm mt-5">
      <h3 className="mb-3">AI Project Plan</h3>
      <div className="project-description">
        <input
          className="project-description-edit inplace-input"
          placeholder="Project Title"
          id="title"
          onChange={(e) => {
            debouncedChangeHandler(e);
          }}
        />
        <InputWithInfo
          inputType="textarea"
          label="Description"
          id="description"
          placeholderText={kbContent[`description`].inputPlaceholder}
          onChange={(e) => {
            handleFormChange(e);
          }}
        />
        <InputWithInfo
          inputType="textarea"
          label="Stakeholders"
          id="stakeholders"
          placeholderText={kbContent[`stakeholders`].inputPlaceholder}
          onChange={(e) => {
            handleFormChange(e);
          }}
        />
        <div className="description-block">
          <p className="mb-3 col-sm-12 project-sublabel">Potential Impacts</p>

          <div className="description-subblock col-lg-6">
            <InputWithInfo
              inputType="textarea"
              label="Positive"
              id="positiveImpacts"
              placeholderText={
                kbContent[`positiveImpacts`].inputPlaceholder
              }
              onChange={(e) => {
                handleFormChange(e);
              }}
            />
          </div>
          <div className="description-subblock col-lg-6">
            <InputWithInfo
              inputType="textarea"
              label="Negative"
              id="negativeImpacts"
              placeholderText={
                kbContent[`negativeImpacts`].inputPlaceholder
              }
              onChange={(e) => {
                handleFormChange(e);
              }}
            />
          </div>
        </div>
        <button
          className="btn btn-primary btn-large"
          size="lg"
          disabled={formStatus !== "Save"}
          type="submit"
          onClick={onSave}
        >
          {formStatus}
        </button>
      </div>
    </div>
  );
};
export default ProjectDescription;
