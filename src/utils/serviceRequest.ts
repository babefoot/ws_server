
import axios from 'axios';
import Goal from '../models/goal.model';
import Game from '../models/game.model';
import Tournament from '../models/tournament.model';
import dotenv from "dotenv";
dotenv.config();



const API_URL = process.env.API_URL;

const goalScoredRequest = (goal: Goal): boolean => {
  const data = {
    "id_scorer": goal.id_scorer,
    "team": goal.team,
  }
  axios.post(`${API_URL}/${goal.id_game}/scoregoal`, data).then((response) => { 
    console.log(response);
    return true;
  }).catch((error) => {
    console.log(error);
    return false
  });
  return false;
}

const getActiveTournament = (): Promise<Tournament> => {
  return axios.get(`${API_URL}/tournament/doing`).then((response) => 
    response.data
  ).catch((error) => {
    return {} as Tournament;
  });
}


const getActiveGame = (): Promise<Game> => {
  console.log(API_URL);
  return axios.get(`${API_URL}games/doing`).then((response) => 
    response.data
  ).catch(() => {
    return {} as Game
  });
}



export { goalScoredRequest, getActiveTournament, getActiveGame }