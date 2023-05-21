
import axios from 'axios';
import Goal from '../models/goal.model';
import Game from '../models/game.model';
import Tournament from '../models/tournament.model';
import dotenv from "dotenv";
import Player from '../models/player.model';
dotenv.config();



const API_URL = process.env.API_URL;

const goalScoredRequest = async (goal: Goal): Promise<boolean> => {
  console.log(goal);
  const data = {
    "scorers": goal.scorers,
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



const createEmptyGame = (): Game => {
  const game = {} as Game;
  game.id = "";
  game.players = [];
  game.score_team_blue = 0;
  game.score_team_red = 0;
  game.state = "0";
  return game;
}
  

const getActiveGame = async (): Promise<Game> => {
  console.log(API_URL);
  try {
    const response = await axios.get(`${API_URL}games/doing`);
    console.log(response.data);
    
    if(!response.data){
      return createEmptyGame();
    }
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

const getUser = async (idCard: string): Promise<Player> => {
  console.log(idCard);
  
  try {
    const response = await axios.get(`${API_URL}players/card/${idCard}`);
    return response.data;
  } catch {
    return {} as any;
  }
}

const addGameWon = async (id_players: string[]): Promise<boolean> => {

  try {
    await axios.post(`${API_URL}games/win`, id_players);
    return true;
  } catch {
    return false;
  }
}

const createGame = async (players: Player[]): Promise<Game> => {
  try {
    let playersTeamBlue: string[] = [];
    let playersTeamRed: string[] = [];
    players.map((player, index) => {
      if(player.team === "B"){
        playersTeamBlue.push(player.id);
      } else {
        playersTeamRed.push(player.id);
      }
    });
    const data = {
      state: "2",
      players_team_blue: playersTeamBlue,
      players_team_red: playersTeamRed,
    }
    console.log(data);
    const response = await axios.post(`${API_URL}games`, data);
    return response.data;
  } catch {
    return {} as any;
  }
}

export { goalScoredRequest, getActiveTournament, getActiveGame, endGame, getUser, createGame, createEmptyGame, addGameWon }