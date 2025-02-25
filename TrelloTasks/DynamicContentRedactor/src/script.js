import createDOMElement from "./createDOMElement.js";
import "./styles/main.css";
import {
  loadElements,
  reloadElements,
  saveElement,
  removeElement,
} from "./localStorageHandler.js";
import { editElement } from "./editHandler.js";
import { createRemoveButton } from "./Buttons/createRemoveButton.js";
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

window.addEventListener("DOMContentLoaded", () =>
  reloadElements(postContainer)
);

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
      const post = createDOMElement(
        "div",
        postContainer,
        new Map([["class", "post__container-post"]]),
        undefined
      );
      const generatedElement = createDOMElement(
        selectList.value,
        post,
        new Map([["class", "generated-element"]]),
        inputForElement.value
      );
      saveElement(
        selectList.value,
        inputForElement.value,
        generatedElement.className
      );
      generatedElement.addEventListener("click", () =>
        editElement(generatedElement, post)
      );

      const boldButton = createDOMElement(
        "button",
        post,
        new Map([["class", "format-button"]]),
        "Bold"
      );
      boldButton.addEventListener("click", () => {
        generatedElement.classList.toggle("bold-text");
        saveElement(
          selectList.value,
          generatedElement.innerText,
          generatedElement.className
        );
      });

      const italicButton = createDOMElement(
        "button",
        post,
        new Map([["class", "format-button"]]),
        "Italic"
      );
      italicButton.addEventListener("click", () => {
        generatedElement.classList.toggle("italic-text");
        saveElement(
          selectList.value,
          generatedElement.innerText,
          generatedElement.className
        );
      });
      createRemoveButton(
        post,
        "Remove",
        selectList.value,
        generatedElement.innerText,
        generatedElement.className
      );
      // const removeButton = createDOMElement(
      //   "button",
      //   post,
      //   new Map([["class", "remove-button format-button"]]),
      //   "Remove"
      // );
      // removeButton.addEventListener("click", () => {
      //   post.remove();
      //   removeElement(
      //     selectList.value,
      //     generatedElement.innerText,
      //     generatedElement.className
      //   );
      // });
    });
  } else return;
});
