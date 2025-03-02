import { removeElement } from "../localStorageHandler";
import { createButton } from "./createButton";

export function createRemoveButton(parent, text, tagToRemove, element) {
  const removeButton = createButton(
    parent,
    text,
    function () {
      parent.remove();
      removeElement(tagToRemove, element.innerText, element.className);
    },
    "remove-button"
  );

  return removeButton;
}
