import * as WebSocket from 'ws';
import actionRouter from '../actionRouter';
import { state } from './initState';

let server: WebSocket.Server;

let rpiWs: WebSocket.WebSocket;

const isEmpty = (obj: {}) => {
  return Object.keys(obj).length === 0;
}

const sendState = (action: string, payload: {}, socket: WebSocket.WebSocket) => {

  const payloadToSend = {
    token: process.env.TOKEN,
    action: action,
    payload: payload
  }

  socket.send(JSON.stringify(payloadToSend));
};

const initServer = () => {
  server = new WebSocket.Server({ port: 8080 })
  console.log("Websocket server is running... waiting for clients");
  
  server.on('connection', (socket: WebSocket.WebSocket) => {
    socket.on('message', (message: Buffer) => {

      console.log(`Received message => ${message.toString()}`);
      
      const messageJson = JSON.parse(message.toString());
      if(messageJson.action === 'auth'){        
        if(messageJson.me === 'rpi'){
          console.log("RPI connected");
          rpiWs = socket;
        }
        else if(messageJson.me === 'front'){
          console.log("Client connected");
          socket.isFront = true;
        }else{
          console.log("Unknown client connected");
          socket.close();
        }

        //test is state.game is not empty
        sendState("game", state.game, socket);
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
