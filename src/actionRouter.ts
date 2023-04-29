
import goalAction from './actions/rpi/goal.action';
import scanCardQuestionAction from './actions/rpi/scanCardQuestion.action';
import tournamentAction from './actions/rpi/tournament.action';



const actionRouter = (payload: any) => {
  console.log(payload);
  switch(payload.action){
    case 'goal':
      goalAction(payload);
      break;
    case 'scan_card_question':
      scanCardQuestionAction(payload);
      break;
    case 'tournament':
      tournamentAction(payload);
    default:
      break;
  }
}

export default actionRouter;