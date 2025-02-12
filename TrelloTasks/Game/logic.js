import Player from "./characters/Player.js";
import Monster from "./characters/Monster.js";
import HealthPotion from "./items/HealthPotion.js";
import { Bomb } from "./items/Bomb.js";
import GameManager from "./managers/GameManager.js";
import UIController from "./UIController.js";
import AIController from "./AIController.js";
const geraltImage = "./images/geralt-witcher.png";
const trissImage = "./images/triss-witcher.png";
const hydraImage = "./images/hydra.png";

let healthPotion = new HealthPotion(15);
let healthPotion2 = new HealthPotion(15);
let bomb = new Bomb(50);
let bomb2 = new Bomb(60);
let charachters = [
  { name: "Geralt", hp: 100, damage: 10, items: [], image: geraltImage },
  { name: "Triss", hp: 80, damage: 25, items: [], image: trissImage },
];
let player = new Player(
  "Geralt",
  100,
  10,
  [healthPotion, healthPotion2, bomb, bomb2],
  geraltImage
);
let player2 = new Player("Triss", 80, 25, [healthPotion, bomb], trissImage);
let monster = new Monster("Hydra", 130, 20, hydraImage);

const game = new GameManager(player2, monster);
new UIController(game);
new AIController(game);
game.startGame();
