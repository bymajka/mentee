import createDOMElement from "./createDOMElement.js";
import localStorageHandle from "./localStorageHandler.js";

const createParagrapghButton = createDOMElement("button", document.body, null);
createParagrapghButton.innerHTML = "Create paragraph";

createParagrapghButton.addEventListener("click", () => {
  if (!document.getElementById("input-for-paragraph")) {
    const inputForParagraph = createDOMElement(
      "input",
      document.body,
      new Map([
        ["type", "text"],
        ["id", "input-for-paragraph"],
      ])
    );
    inputForParagraph.addEventListener("change", () => {
      const generatedParagraph = createDOMElement(
        "p",
        document.body,
        new Map([["class", "generated-paragraph"]])
      );
      generatedParagraph.innerHTML = inputForParagraph.value;
      localStorage.setItem("p", generatedParagraph.innerHTML);
    });
  } else return;
});

window.addEventListener("storage", () => {
  const newElement = createDOMElement(
    Object.keys(localStorage)[0],
    document.body,
    null
  );

  console.log(Object.keys(localStorage)[0]);
  newElement.innerHTML = Object.values(localStorage)[0];
});
