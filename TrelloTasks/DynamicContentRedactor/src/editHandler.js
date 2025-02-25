import createDOMElement from "./createDOMElement";
import { reloadElements, saveAllElements } from "./localStorageHandler";

export function editElement(element, parent, index) {
  const currentText = element.innerText;
  const input = createDOMElement(
    "input",
    parent,
    new Map([
      ["type", "text"],
      ["class", "edit-input"],
    ]),
    null
  );
  input.value = currentText;
  element.replaceWith(input);
  input.focus();

  input.addEventListener("blur", () => saveEdit(input, parent, index));
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") saveEdit(input, parent, index);
  });
}

function saveEdit(input, parent, index) {
  const elements = JSON.parse(localStorage.getItem("elements")) || [];
  const newText = input.value.trim();

  if (newText && elements[index]) {
    elements[index].text = newText;
  }

  saveAllElements(elements);
  reloadElements(parent);
}
