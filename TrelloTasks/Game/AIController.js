import EffectManager from "./EffectManager.js";
import GameManager from "./GameManager.js";
import UIController from "./UIController.js";

export default class AIController {
  constructor(game) {
    this.game = game;
    this.game.subscribe("turnStart", this.enemyTurn.bind(this));
  }

  enemyTurn(creature) {
    if (creature === this.game.monster) {
      setTimeout(() => {
        let attackCount = 1;
        if (Math.random() < 0.2) {
          attackCount++;
          GameManager.logger(
            `${this.game.monster.type} does additional attack`
          );
        }
        for (let i = 0; i < attackCount; i++) {
          this.game.monster.attack(this.game.player);
          UIController.updateHitPoints(this.game.player, "playerStats");
        }
        EffectManager.applyHurtEffect("playerImage");
        this.game.notify("turnEnd");
      }, 1000);
    }
  }
}
