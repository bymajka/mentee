import GameManager from "./managers/GameManager.js";

export default class UIController {
  constructor(game) {
    this.game = game;
    // this.renderCreatures();
    this.buttons = {
      attack: document.getElementById("attackButton"),
      heal: document.getElementById("healButton"),
      bomb: document.getElementById("bombButton"),
    };
    this.images = {
      player: document.getElementById("playerImage"),
      monster: document.getElementById("monsterImage"),
    };
    this.hideCreatures();
    this.initEventListeners();
    this.game.subscribe("turnStart", this.updateUI.bind(this));
    this.game.subscribe("updateHealth", this.updateHealth.bind(this));
  }

  initEventListeners = () => {
    Object.keys(this.buttons).forEach((action) => {
      this.buttons[action].addEventListener("click", () => {
        if (this.game.player != null) {
          this.game.notify("playerAction", action);
        }
      });
    });
  };

  updateUI = (creature) => {
    if (!creature) return;

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
    this.images.player.src = this.game.player.imgPath;
    this.images.monster.src = this.game.monster.imgPath;

    this.showCreatures();
  };

  hideCreatures = () =>
    Object.values(this.images).forEach((img) => {
      img.style.display = "none";
    });

  showCreatures = () =>
    Object.values(this.images).forEach((img) => {
      img.style.display = "block";
    });
}
