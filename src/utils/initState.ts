// the goal here is to initalize the state of the app with the data from the database
// get the potential tournament
// get the potential game

import { getActiveTournament, getActiveGame } from './serviceRequest';
import Tournament from '../models/tournament.model';
import Game from '../models/game.model';

let state = {
  tournament: {} as Tournament,
  game: {} as Game
}

const initState =  async () => {
  
  const tournament: Tournament = await getActiveTournament();
  const game: Game = await getActiveGame()  

  state = {
    tournament: tournament,
    game: game
  }
  console.log(state.game);
}

export {initState, state};