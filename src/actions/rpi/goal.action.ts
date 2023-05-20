import Goal from "../../models/goal.model";
import { goalScoredRequest } from "../../utils/serviceRequest";
import { server } from "../../utils/ws.init";
import { state } from "../../utils/initState";
import {broadCastToFront} from "../../utils/broadCastToFront";
import endGameAction from "./endGame.action";

const goalAction = async (payload: Goal) => {
  const goalScored = await goalScoredRequest(payload);
  if(goalScored){
    broadCastToFront(payload, "goal");
    payload.team == 'R' ? state.game.score_team_red++ : state.game.score_team_blue++;
    if(state.game.score_team_red >= 3 || state.game.score_team_blue >= 3){
      endGameAction(state.game.id);
    }
  }
}

export default goalAction; 