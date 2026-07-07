import { IncomingMessage } from 'http';
import { RawData, WebSocket } from 'ws';
import handleMessage from './message.handler';
import handleDisconnect from './disconnect.handler';

const handleConnection = (ws: WebSocket, req: IncomingMessage) => {
  console.log('Client connected from:', req.socket?.remoteAddress);

  ws.on('message', (data) => `echo: ${data}`);
    ws.on('message', (data: RawData) => {
      handleMessage(ws, data);
    });

//   ws.on('close', () => console.log('Client disconnected'));
    ws.on("close", () => {
      handleDisconnect();
    })

  ws.on('error', (err) => console.error('WebSocket error:', err));
};

export default handleConnection;
