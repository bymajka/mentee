import CharacterSelector from "../CharacterSelector.js";
import { Observable } from "../Observable.js";
import UIController from "../UIController.js";
import EffectManager from "./EffectManager.js";
import Player from "../characters/Player.js";
import { Bomb } from "../items/Bomb.js";
import HealthPotion from "../items/HealthPotion.js";

export default class GameManager extends Observable {
  constructor(monster) {
    super();
    (this.player = null), (this.monster = monster), (this.turnQueue = []);
    this.uiController = new UIController(this);

    new CharacterSelector(this.startGame.bind(this));

    this.subscribe("turnEnd", this.handleTurnEnd.bind(this));
    this.subscribe("playerAction", this.handlePlayerAction.bind(this));
  }

  startGame(selectedCharacter) {
    this.player = new Player(
      selectedCharacter.name,
      selectedCharacter.hp,
      selectedCharacter.damage,
      selectedCharacter.items,
      selectedCharacter.image
    );

    this.turnQueue = [this.player, this.monster];
    this.currentTurn = 0;

    this.uiController.renderCreatures();

    this.giveItems();

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

  giveItems() {
    const items = [new HealthPotion(30), new HealthPotion(15), new Bomb(40)];

    items.forEach((item) => {
      this.player.items.push(item);
    });
  }

  static logger(message) {
    console.log(message);
    document.getElementById("logLine").innerHTML += `<p>${message}</p>`;
  }
}
