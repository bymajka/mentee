import Item from "./Item.js";

export default class HealthPotion extends Item {
  constructor(amountOfHeal) {
    super("health potion", "potions", "healing effect");
    this.amountOfHeal = amountOfHeal;
  }
}
