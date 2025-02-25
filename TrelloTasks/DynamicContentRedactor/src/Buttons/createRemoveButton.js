import createDOMElement from "../createDOMElement";
import { removeElement } from "../localStorageHandler";

export function createRemoveButton(
  parent,
  text,
  tagToRemove,
  elementText,
  elementClasses
) {
  const removeButton = createDOMElement(
    "button",
    parent,
    new Map([["class", "remove-button format-button"]]),
    text
  );
  removeButton.addEventListener("click", () => {
    parent.remove();
    removeElement(tagToRemove, elementText, elementClasses);
  });
}
