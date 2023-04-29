import Player from "./player.model";

interface Game {
  id: string;
  team1: Player[];
  team2: Player[];
};

export default Game;