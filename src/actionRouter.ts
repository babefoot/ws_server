
import goalAction from './actions/rpi/goal.action';
import endGameAction from './actions/rpi/endGame.action';
import scanCardQuestionAction from './actions/rpi/scanCardQuestion.action';
import tournamentAction from './actions/rpi/tournament.action';



const actionRouter = (payload: any) => {
  console.log(payload);
  switch(payload.action){
    case 'goal':
      goalAction(payload.payload);
      break;
    case 'scan_card_question':
      scanCardQuestionAction(payload.payload);
      break;
    case 'end_game':
      endGameAction(payload.payload);
      break;
    case 'tournament':
      tournamentAction(payload.payload);
    default:
      break;
  }
}

export default actionRouter;