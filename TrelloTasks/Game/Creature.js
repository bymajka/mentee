import { logger } from "./logger.js";
import { Observable } from "./Observable.js";

class Creature {
  constructor(maxHitpoints, power) {
    this.maxHitpoints = maxHitpoints;
    this.power = power;
    this.hitpoints = maxHitpoints;
  }

  isAlive = () => {
    return this.hitpoints > 0;
  };

  attack(target) {
    target.hitpoints -= this.power;
  }

  dead = () => {
    logger("This creature is dead.");
  };
}

export default Creature;
