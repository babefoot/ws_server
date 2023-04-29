import {initServer} from "./utils/ws.init";
import {initState} from "./utils/initState";
import * as dotenv from 'dotenv';


dotenv.config();

initServer();
initState();




