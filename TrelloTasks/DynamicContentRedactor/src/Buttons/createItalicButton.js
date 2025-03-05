import { createButton } from "./createButton";
import { saveElement } from "../localStorageHandler";

export function createItalicButton(parent, text, tag, element) {
  const italicButton = createButton(parent, text, function () {
    element.classList.toggle("italic-text");
    saveElement(tag, element.innerText, element.className);
  });
  return italicButton;
}
