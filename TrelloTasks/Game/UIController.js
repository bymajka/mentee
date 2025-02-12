import GameManager from "./managers/GameManager.js";

export default class UIController {
  constructor(game) {
    this.game = game;
    this.renderCreatures();
    this.buttons = {
      attack: document.getElementById("attackButton"),
      heal: document.getElementById("healButton"),
      bomb: document.getElementById("bombButton"),
    };
    this.initEventListeners();
    this.game.subscribe("turnStart", this.updateUI.bind(this));
    this.game.subscribe("updateHealth", this.updateHealth.bind(this));
  }

  initEventListeners = () => {
    Object.keys(this.buttons).forEach((action) => {
      this.buttons[action].addEventListener("click", () =>
        this.game.notify("playerAction", action)
      );
    });
  };

  updateUI = (creature) => {
    const isPlayerTurn = creature === this.game.player;
    this.toggleButtons(isPlayerTurn);
    GameManager.logger(
      `It's ${
        isPlayerTurn ? this.game.player.name : this.game.monster.type
      }'s turn`
    );
  };

  updateHealth = ({ creature, statsId }) => {
    document.getElementById(statsId).innerText = `HP: ${creature.hitpoints}`;
  };

  toggleButtons(enable) {
    Object.values(this.buttons).forEach(
      (button) => (button.disabled = !enable)
    );
  }

  renderCreatures = () => {
    const playerImg = document.getElementById("playerImage");
    const monsterImg = document.getElementById("monsterImage");
    playerImg.src = this.game.player.imgPath;
    monsterImg.src = this.game.monster.imgPath;
  };
}
