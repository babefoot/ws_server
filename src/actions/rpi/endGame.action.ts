import { endGame, createEmptyGame } from "../../utils/serviceRequest";
import { state } from "../../utils/initState";
import {broadCastToFront, sendToRpi} from "../../utils/broadCastToFront";


const endGameAction = async (id_game: string) => {
    console.log("ENDING GAME ACTION");
    await endGame(id_game);
    state.game = createEmptyGame();
    broadCastToFront(id_game, "end_game")
    sendToRpi(state.game, "game")
}

export default endGameAction; 