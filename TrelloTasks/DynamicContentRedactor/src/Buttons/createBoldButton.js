import { createButton } from "./createButton";
import { saveElement } from "../localStorageHandler";

export function createBoldButton(parent, text, tag, element) {
  const boldButton = createButton(parent, text, function () {
    element.classList.toggle("bold-text");
    saveElement(tag, element.innerText, element.className);
  });
  return boldButton;
}
