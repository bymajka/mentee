import Creature from "./Creature.js";
import GameManager from "./GameManager.js";

export default class Monster extends Creature {
  constructor(type, maxHitpoints, power) {
    super(maxHitpoints, power);
    this.type = type;
  }

  attack = (target) => {
    super.attack(target);
    GameManager.logger(
      `${this.type} attacks ${target.name} and deals ${this.power} damage`
    );
  };
}
