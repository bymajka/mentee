import { saveElement } from "./localStorageHandler.js";

export default function createDOMElement(
  element,
  parent,
  attributes,
  innerText
) {
  const newElement = document.createElement(element);
  if (attributes) {
    attributes.forEach((value, key) => {
      newElement.setAttribute(key, value);
    });
  }
  newElement.innerText = innerText;
  if (parent === null) return newElement;
  parent.appendChild(newElement);
  return newElement;
}
