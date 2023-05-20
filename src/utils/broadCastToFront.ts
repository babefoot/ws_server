import {server} from './ws.init';
import { rpiWs } from './ws.init';



const sendToRpi = (message: any, action: string) => {
  rpiWs.send(JSON.stringify({
    action: action,
    payload: message
  }));
}




const broadCastToFront = (message: any, action: string) => {
  server.clients.forEach((client: any) => {
    if(client.isFront){
      client.send(JSON.stringify({
        action: action,
        payload: message
      }));
    }
  });
}

export {broadCastToFront, sendToRpi};