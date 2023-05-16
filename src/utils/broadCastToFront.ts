import {server} from './ws.init';



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

export default broadCastToFront;