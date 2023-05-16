import Player from "./player.model";

interface Game {
  id: string;
  players: Player[];
  score_team_red: number;
  score_team_blue: number;
  state: string;
  order: number;  
};

export default Game;