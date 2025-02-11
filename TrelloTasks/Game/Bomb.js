import Item from "./Item.js";

export class Bomb extends Item {
  constructor(damageAmount) {
    super("bomb", "weapon", "blows target");
    this.damageAmount = damageAmount;
  }

  throwBomb = (target) => {
    target.hitpoints -= this.damageAmount;
  };
}
