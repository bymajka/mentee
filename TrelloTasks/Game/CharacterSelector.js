import { characters } from "./characters.js";

export default class CharacterSelector {
  constructor(onCharacterSelected) {
    this.onCharacterSelected = onCharacterSelected;
    this.selectElement = document.getElementById("playerSelection");

    this.populateCharacterOptions();
    this.selectElement.addEventListener("change", this.selectCharacter);
  }

  populateCharacterOptions = () => {
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.innerText = "Select your character";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    this.selectElement.appendChild(defaultOption);

    characters.forEach((character, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.innerText = character.name;
      this.selectElement.appendChild(option);
    });
  };

  selectCharacter = () => {
    const selectIndex = this.selectElement.value;
    if (selectIndex === "") return;

    const selectedCharacter = characters[selectIndex];
    this.onCharacterSelected(selectedCharacter);
    this.removeSelector();
  };

  removeSelector = () => {
    this.selectElement.remove();
  };
}
