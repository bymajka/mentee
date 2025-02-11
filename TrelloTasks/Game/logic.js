import Player from "./Player.js";
import Monster from "./Monster.js";
import HealthPotion from "./HealthPotion.js";
import { Bomb } from "./Bomb.js";
import GameManager from "./GameManager.js";
import UIController from "./UIController.js";
import AIController from "./AIController.js";

let healthPotion = new HealthPotion(15);
let healthPotion2 = new HealthPotion(15);
let bomb = new Bomb(50);
let bomb2 = new Bomb(60);
let player = new Player("Geralt", 100, 10, [
  healthPotion,
  healthPotion2,
  bomb,
  bomb2,
]);
let monster = new Monster("Hydra", 130, 20);

const game = new GameManager(player, monster);
new UIController(game);
new AIController(game);
game.startGame();
