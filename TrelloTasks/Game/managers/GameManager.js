import { Observable } from "../Observable.js";
import UIController from "../UIController.js";
import EffectManager from "./EffectManager.js";

export default class GameManager extends Observable {
  constructor(player, monster) {
    super();
    (this.player = player),
      (this.monster = monster),
      (this.turnQueue = [this.player, this.monster]);
    this.currentTurn = 0;

    this.subscribe("turnEnd", this.handleTurnEnd.bind(this));
    this.subscribe("playerAction", this.handlePlayerAction.bind(this));
  }

  startGame() {
    this.notify("turnStart", this.turnQueue[this.currentTurn]);
  }

  handleTurnEnd() {
    if (!this.player.isAlive() || !this.monster.isAlive()) {
      this.declareWinner();
      return;
    }

    this.currentTurn = (this.currentTurn + 1) % 2;
    this.notify("turnStart", this.turnQueue[this.currentTurn]);
  }

  handlePlayerAction(action) {
    if (this.turnQueue[this.currentTurn] !== this.player) {
      UIController.toggleButtons(false);
    }

    if (action === "attack") {
      this.player.attack(this.monster);
      this.notify("updateHealth", {
        creature: this.monster,
        statsId: "monsterStats",
      });
      EffectManager.applyHurtEffect("monsterImage");
    } else if (action === "heal") {
      this.player.heal();
      this.notify("updateHealth", {
        creature: this.player,
        statsId: "playerStats",
      });
    } else if (action === "bomb") {
      this.player.throwBomb(this.monster);
      EffectManager.applyHurtEffect("monsterImage");
      this.notify("updateHealth", {
        creature: this.monster,
        statsId: "monsterStats",
      });
    }

    this.notify("turnEnd");
  }

  declareWinner() {
    if (this.player.isAlive()) {
      GameManager.logger(`${this.player.name} wins!`);
    } else {
      GameManager.logger(`${this.monster.type} wins!`);
    }
  }

  static logger(message) {
    console.log(message);
    document.getElementById("logLine").innerHTML += `<p>${message}</p>`;
  }
}
