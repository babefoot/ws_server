import Goal from "../../models/goal.model";
import { goalScoredRequest } from "../../utils/serviceRequest";
import { server } from "../../utils/ws.init";

const goalAction = (payload: Goal) => {
  const goalScored = goalScoredRequest(payload);
  if(goalScored){
    server.clients.forEach((client: any) => {
      if(client.isFront){
        client.send(JSON.stringify({
          action: 'goal',
          data: payload
        }));
      }
    });
  }
}


export default goalAction;
  