
import axios from 'axios';
import Goal from '../models/goal.model';
import Game from '../models/game.model';
import Tournament from '../models/tournament.model';
import dotenv from "dotenv";
dotenv.config();



const API_URL = process.env.API_URL;

const goalScoredRequest = async (goal: Goal): Promise<boolean> => {
  console.log(goal);
  const data = {
    "id_scorer1": goal.scorer1,
    "id_scorer2": goal.scorer2,
    "team": goal.team,
  }
  const response = await axios.post(`${API_URL}games/${goal.id_game}/scoregoal`, data);
  return response.status === 200;
}

const getActiveTournament = async (): Promise<Tournament> => {
  try {
    const response = await axios.get(`${API_URL}tournament/doing`);
    return response.data;
  } catch (error) {
    return {} as Tournament;
  }
}


const getActiveGame = async (): Promise<Game> => {
  console.log(API_URL);
  try {
    const response = await axios.get(`${API_URL}games/doing`);
    return response.data;
  } catch {
    return {} as Game;
  }
}

const endGame = async (id_game: string): Promise<boolean> =>{
  try {
    await axios.post(`${API_URL}games/${id_game}/endgame`);
    return true;
  } catch {
    return false;
  }
}



export { goalScoredRequest, getActiveTournament, getActiveGame, endGame }