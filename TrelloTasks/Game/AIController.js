import EffectManager from "./managers/EffectManager.js";
import GameManager from "./managers/GameManager.js";

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
          this.game.notify("updateHealth", {
            creature: this.game.player,
            statsId: "playerStats",
          });
          EffectManager.applyHurtEffect("playerImage");
        }
        this.game.notify("turnEnd");
      }, 1000);
    }
  }
}
