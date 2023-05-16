import Goal from "../../models/goal.model";
import { endGame } from "../../utils/serviceRequest";
import { server } from "../../utils/ws.init";
import { state } from "../../utils/initState";
import Game from "../../models/game.model";
import broadCastToFront from "../../utils/broadCastToFront";

const endGameAction = async (payload: {
    id_game: string
}) => {
    console.log("ENDING GAME ACTION");
    
    endGame(payload.id_game);
    state.game = {} as Game;

    broadCastToFront(payload, "end_game")

}

export default endGameAction; 