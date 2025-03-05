import createDOMElement from "../createDOMElement";

export function createButton(parent, text, func, extraClass = "") {
  const button = createDOMElement(
    "button",
    parent,
    new Map([["class", `format-button ${extraClass}`.trim()]]),
    text
  );
  button.addEventListener("click", () => {
    func();
  });
}
