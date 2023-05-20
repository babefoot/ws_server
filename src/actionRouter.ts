
import goalAction from './actions/rpi/goal.action';
import endGameAction from './actions/rpi/endGame.action';
import scanCardAction from './actions/rpi/scanCard.action';
import tournamentAction from './actions/rpi/tournament.action';
import startGameAction from './actions/front/startGame.action';



const actionRouter = (payload: any) => {
  console.log(payload);
  switch(payload.action){
    case 'goal':
      console.log('goal action', payload.payload);
      goalAction(payload.payload);
      break;
    case 'scan_card':
      scanCardAction(payload.payload);
      break;
    case 'start_game':
      startGameAction();
      break;
    case 'tournament':
      tournamentAction(payload.payload);
    default:
      break;
  }
}

export default actionRouter;