import { createRemoveButton } from "./Buttons/createRemoveButton.js";
import createDOMElement from "./createDOMElement.js";
import { editElement } from "./editHandler.js";

export function saveAllElements(elements) {
  localStorage.setItem("elements", JSON.stringify(elements));
}

export function saveElement(tag, text, classes = []) {
  const elements = JSON.parse(localStorage.getItem("elements")) || [];
  const elementIndex = elements.findIndex(
    (element) => element.tag === tag && element.text === text
  );
  if (elementIndex !== -1) {
    elements[elementIndex] = {
      tag,
      text,
      classes,
    };
  } else {
    const newElement = {
      tag,
      text,
      classes,
    };
    elements.push(newElement);
  }
  saveAllElements(elements);
}

export function loadElements(parent) {
  const storedElements = JSON.parse(localStorage.getItem("elements")) || [];

  storedElements.forEach(({ tag, text, classes }, index) => {
    const post = createDOMElement(
      "div",
      parent,
      new Map([["class", "post__container-post"]]),
      undefined
    );
    const newElement = createDOMElement(tag, post);
    newElement.innerText = text;

    if (Array.isArray(classes)) {
      newElement.classList.add(...classes);
    } else {
      newElement.className = classes;
    }

    const boldButton = createDOMElement(
      "button",
      post,
      new Map([["class", "format-button"]]),
      "Bold"
    );
    boldButton.addEventListener("click", () => {
      newElement.classList.toggle("bold-text");
      saveElement(tag, newElement.innerText, newElement.className);
    });

    const italicButton = createDOMElement(
      "button",
      post,
      new Map([["class", "format-button"]]),
      "Italic"
    );
    italicButton.addEventListener("click", () => {
      newElement.classList.toggle("italic-text");
      saveElement(tag, newElement.innerText, newElement.className);
    });
    createRemoveButton(
      post,
      "Remove",
      tag,
      newElement.innerText,
      newElement.className
    );
    // const removeButton = createDOMElement(
    //   "button",
    //   post,
    //   new Map([["class", "remove-button format-button"]]),
    //   "Remove"
    // );
    // removeButton.addEventListener("click", () => {
    //   post.remove();
    //   removeElement(tag, newElement.innerText, newElement.className);
    // });

    newElement.addEventListener("click", () =>
      editElement(newElement, parent, index)
    );
  });
}

export function reloadElements(container) {
  container.innerHTML = "";
  loadElements(container);
}

export function removeElement(tag, text, classes = []) {
  const elements = JSON.parse(localStorage.getItem("elements")) || [];
  const elementIndex = elements.findIndex(
    (element) => element.tag === tag && element.text === text
  );
  if (elementIndex !== -1) {
    elements.splice(elementIndex, 1);
  }
  saveAllElements(elements);
}
