import {server} from './ws.init';



const broadCastToFront = (message: any) => {
  server.clients.forEach((client) => {
    if(client.isFront)
      client.send(JSON.stringify(message));
  });
}

export default broadCastToFront;