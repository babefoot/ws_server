import * as WebSocket from 'ws';
import actionRouter from '../actionRouter';
import { state } from './initState';

let server: WebSocket.Server;

let rpiWs: WebSocket.WebSocket;

const initServer = () => {
  server = new WebSocket.Server({ port: 8080 })
  console.log("Websocket server is running... waiting for clients");

  setInterval(() => {
    server.clients.forEach((client: WebSocket.WebSocket) => {
      console.log(client.isFront);
    });
  }, 5000);
  
  server.on('connection', (socket: WebSocket.WebSocket) => {
    
    console.log("Client connected");
    
    socket.on('message', (message: Buffer) => {
  
      const messageJson = JSON.parse(message.toString());
      if(messageJson.action === 'auth'){        
        if(messageJson.me === 'rpi'){
          console.log("RPI connected");
          rpiWs = socket;

        }
        else
          socket.isFront = true;
        socket.send(JSON.stringify(state));
      }else{
        actionRouter(messageJson);
      }
    });

    socket.on('close', () => {
      console.log(`${socket.isFront ? "Front client" : "RPI" } disconnected`);
    });
  })
}

export {initServer, server, rpiWs};
