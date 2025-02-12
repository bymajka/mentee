import Creature from "./Creature.js";
import GameManager from "../managers/GameManager.js";

export default class Monster extends Creature {
  constructor(type, maxHitpoints, power, imgPath) {
    super(maxHitpoints, power, imgPath);
    this.type = type;
  }

  attack = (target) => {
    super.attack(target);
    GameManager.logger(
      `${this.type} attacks ${target.name} and deals ${this.power} damage`
    );
  };
}
