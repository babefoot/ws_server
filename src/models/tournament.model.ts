import Game from "./game.model";

interface Tournament {
  id: string;
  round: number;
  rule: string;
  value: number;
  games: Game[];
};

export default Tournament;