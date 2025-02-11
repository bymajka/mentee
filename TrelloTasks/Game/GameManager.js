import { Observable } from "./Observable.js";

export default class GameManager extends Observable {
  constructor(player, monster) {
    super();
    (this.player = player),
      (this.monster = monster),
      (this.turnQueue = [this.player, this.monster]);
    this.currentTurn = 0;

    this.subscribe("turnEnd", this.handleTurnEnd.bind(this));
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
