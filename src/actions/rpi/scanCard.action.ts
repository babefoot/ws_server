import { getUser } from "../../utils/serviceRequest";
import { state } from "../../utils/initState";
import Player from "../../models/player.model";
import {broadCastToFront} from "../../utils/broadCastToFront";




interface card {
  id_card: string;
}


const addUserToState = (user: Player) => {
  if(state.game.players.length % 2 === 0) {
    user.team = "B";
    state.game.players.push(user);
  }else {
    user.team = "R";
    state.game.players.push(user);
  }
}

const scanCardAction = async (payload: card) => {
  console.log("SCAN CARD ACTION");
  state.game.state = "0";
  const user: Player = await getUser(payload.id_card);
  addUserToState(user);
  broadCastToFront(state.game, "game")
  console.log(state.game);
}


export default scanCardAction;
  