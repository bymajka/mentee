import Monster from "./characters/Monster.js";
import GameManager from "./managers/GameManager.js";
import AIController from "./AIController.js";
const hydraImage = "./images/hydra.png";

let monster = new Monster("Hydra", 130, 20, hydraImage);

const game = new GameManager(monster);
new AIController(game);
