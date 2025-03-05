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
  if (innerText !== undefined) newElement.innerText = innerText;
  if (parent === undefined) return newElement;

  parent.appendChild(newElement);
  return newElement;
}
