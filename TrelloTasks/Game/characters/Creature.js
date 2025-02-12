class Creature {
  constructor(maxHitpoints, power, imgPath) {
    this.maxHitpoints = maxHitpoints;
    this.power = power;
    this.hitpoints = maxHitpoints;
    this.imgPath = imgPath;
  }

  isAlive = () => {
    return this.hitpoints > 0;
  };

  attack(target) {
    target.hitpoints -= this.power;
  }
}

export default Creature;
