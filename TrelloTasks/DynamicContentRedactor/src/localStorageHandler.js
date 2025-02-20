import createDOMElement from "./createDOMElement.js";

export function saveElement(tag, text, classes) {
  const elements = JSON.parse(localStorage.getItem("elements")) || [];
  elements.push({ tag, text, classes });
  localStorage.setItem("elements", JSON.stringify(elements));
}

export function loadElements(parent) {
  const storedElements = JSON.parse(localStorage.getItem("elements")) || [];
  storedElements.forEach(({ tag, text, classes }) => {
    const newElement = createDOMElement(tag, parent);
    newElement.innerText = text;

    if (Array.isArray(classes)) {
      newElement.classList.add(...classes);
    } else {
      newElement.className = classes;
    }
  });
}

export function reloadElements(container) {
  container.innerHTML = "";
  loadElements(container);
}
