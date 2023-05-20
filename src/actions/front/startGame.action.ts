import {broadCastToFront, sendToRpi} from "../../utils/broadCastToFront";
import { state } from "../../utils/initState";
import { createGame } from "../../utils/serviceRequest";
import { getActiveGame } from "../../utils/serviceRequest";

const startGameAction = async () => {
    const result = await createGame(state.game.players);
    state.game = await getActiveGame();
    broadCastToFront(state.game, "game");
    sendToRpi(state.game, "game");
}

export default startGameAction;