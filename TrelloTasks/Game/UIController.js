import EffectManager from "./EffectManager.js";
import GameManager from "./GameManager.js";

export default class UIController {
  constructor(game) {
    this.game = game;
    this.game.subscribe("turnStart", this.updateUI.bind(this));
    document.getElementById("attackButton").addEventListener("click", () => {
      this.handleAction("attack");
    });
    document.getElementById("healButton").addEventListener("click", () => {
      this.handleAction("heal");
    });
    document.getElementById("bombButton").addEventListener("click", () => {
      this.handleAction("bomb");
    });
  }

  updateUI = (creature) => {
    if (creature === this.game.player) {
      document.getElementById("attackButton").disabled = false;
      document.getElementById("healButton").disabled = false;
      GameManager.logger(`It's ${this.game.player.name}'s turn`);
    } else {
      document.getElementById("attackButton").disabled = true;
      document.getElementById("healButton").disabled = true;
      GameManager.logger(`It's ${this.game.monster.type}'s turn`);
    }
  };

  static updateHitPoints = (creature, statsId) => {
    document.getElementById(statsId).innerText = `HP: ${creature.hitpoints}`;
  };

  handleAction(action) {
    document.getElementById("attackButton").disabled = true;
    document.getElementById("healButton").disabled = true;

    if (action === "attack") {
      this.game.player.attack(this.game.monster);
      EffectManager.applyHurtEffect("monsterImage");
    } else if (action === "heal") {
      this.game.player.heal();
    } else if (action === "bomb") {
      this.game.player.throwBomb(this.game.monster);
      EffectManager.applyHurtEffect("monsterImage");
    }

    this.game.notify("turnEnd");
  }
}
