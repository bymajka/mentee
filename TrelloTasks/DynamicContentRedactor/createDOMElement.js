export default function createDOMElement(element, parent, attributes) {
  const newElement = document.createElement(element);
  if (attributes) {
    attributes.forEach((value, key) => {
      newElement.setAttribute(key, value);
    });
  }
  parent.appendChild(newElement);
  return newElement;
}
