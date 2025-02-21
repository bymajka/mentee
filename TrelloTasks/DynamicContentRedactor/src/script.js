import createDOMElement from "./createDOMElement.js";
import "./styles/main.css";
import {
  loadElements,
  reloadElements,
  saveElement,
} from "./localStorageHandler.js";
import { editElement } from "./editHandler.js";
const possibleElements = [
  { element: "p", inner: "create paragraph" },
  { element: "h1", inner: "create the biggest header" },
  { element: "h2", inner: "create second level header" },
];
const postContainer = createDOMElement(
  "div",
  document.body,
  new Map([["class", "post__container"]]),
  null
);
const selectList = createDOMElement("select", document.body, null);
possibleElements.forEach((element) => {
  createDOMElement("option", selectList, null, element.element);
});
const inputFieldButton = createDOMElement(
  "button",
  document.body,
  null,
  "Create element"
);

window.addEventListener("storage", (event) => {
  if (event.key === "elements") reloadElements(postContainer);
});

window.addEventListener("DOMContentLoaded", () => loadElements(postContainer));

inputFieldButton.addEventListener("click", () => {
  if (!document.getElementById("input-for-element")) {
    const inputForElement = createDOMElement(
      "input",
      document.body,
      new Map([
        ["type", "text"],
        ["id", "input-for-element"],
        ["class", "element-input"],
      ])
    );
    inputForElement.addEventListener("change", () => {
      if (inputForElement.value === "") return;
      const generatedElement = createDOMElement(
        selectList.value,
        postContainer,
        new Map([["class", "generated-element"]]),
        inputForElement.value
      );
      saveElement(
        selectList.value,
        inputForElement.value,
        generatedElement.className
      );
      generatedElement.addEventListener("click", () =>
        editElement(generatedElement)
      );
    });
  } else return;
});
