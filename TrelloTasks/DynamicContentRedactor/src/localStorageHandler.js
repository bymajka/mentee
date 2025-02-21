import createDOMElement from "./createDOMElement.js";
import { editElement } from "./editHandler.js";

export function saveAllElements(elements) {
  localStorage.setItem("elements", JSON.stringify(elements));
}

export function saveElement(tag, text, classes = []) {
  const elements = JSON.parse(localStorage.getItem("elements")) || [];
  elements.push({ tag, text, classes });
  saveAllElements(elements);
}

export function loadElements(parent) {
  const storedElements = JSON.parse(localStorage.getItem("elements")) || [];
  storedElements.forEach(({ tag, text, classes }, index) => {
    const newElement = createDOMElement(tag, parent);
    newElement.innerText = text;

    if (Array.isArray(classes)) {
      newElement.classList.add(...classes);
    } else {
      newElement.className = classes;
    }

    newElement.addEventListener("click", () => editElement(newElement, index));
  });
}

export function reloadElements(container) {
  container.innerHTML = "";
  loadElements(container);
}
