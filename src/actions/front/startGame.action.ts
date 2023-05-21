import {broadCastToFront, sendToRpi} from "../../utils/broadCastToFront";
import { state } from "../../utils/initState";
import { createGame } from "../../utils/serviceRequest";
import { getActiveGame } from "../../utils/serviceRequest";

const startGameAction = async () => {
    state.game = await createGame(state.game.players);
    console.log(state.game);
    broadCastToFront(state.game, "game");
    sendToRpi(state.game, "game");
}

export default startGameAction;