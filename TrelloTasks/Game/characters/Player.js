import { Bomb } from "../items/Bomb.js";
import Creature from "./Creature.js";
import GameManager from "../managers/GameManager.js";
import HealthPotion from "../items/HealthPotion.js";

export default class Player extends Creature {
  constructor(name, maxHitpoints, power, items, imgPath) {
    super(maxHitpoints, power, imgPath);
    this.name = name;
    this.items = items;
  }

  heal = () => {
    let healthPotionIndex = this.items.findIndex(
      (item) => item instanceof HealthPotion
    );

    if (healthPotionIndex === -1) {
      GameManager.logger(`${this.name} doesn't have a health potion`);
      return;
    }

    if (this.hitpoints === this.maxHitpoints) {
      GameManager.logger(`${this.name} already have full hp`);
      return;
    }

    this.hitpoints =
      this.hitpoints >= this.maxHitpoints
        ? this.maxHitpoints
        : this.hitpoints + this.items[healthPotionIndex].amountOfHeal;
    GameManager.logger(
      `${this.name} uses health potion and recovers ${this.items[healthPotionIndex].amountOfHeal}`
    );
    this.items.splice(healthPotionIndex, 1);
  };

  attack = (target) => {
    super.attack(target);
    GameManager.logger(
      `${this.name} attacks ${target.type} for ${this.power} damage`
    );
  };

  throwBomb = (target) => {
    const bombIndex = this.items.findIndex((item) => item instanceof Bomb);

    if (bombIndex === -1) {
      GameManager.logger(`${this.name} has no bombs left`);
      return;
    }

    const bomb = this.items[bombIndex];
    bomb.throwBomb(target);
    GameManager.logger(
      `${this.name} throws a bomb and deals ${this.items[bombIndex].damageAmount} damage`
    );
    this.items.splice(bombIndex, 1);
  };
}
