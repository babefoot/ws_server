import Goal from "../../models/goal.model";
import { goalScoredRequest } from "../../utils/serviceRequest";
import { server } from "../../utils/ws.init";
import { state } from "../../utils/initState";
import broadCastToFront from "../../utils/broadCastToFront";

const goalAction = async (payload: Goal) => {
  const goalScored = await goalScoredRequest(payload);
  if(goalScored){
    console.log('goal scored mama');
    payload.team == 'r' ? state.game.score_team_red++ : state.game.score_team_blue++;
    broadCastToFront(payload, "goal")
  }
}

export default goalAction; 