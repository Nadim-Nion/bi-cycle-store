import { Server } from 'http';
import { WebSocketServer } from 'ws';
import handleConnection from './handlers/connection.handler';

const initializeWebSocket = (server: Server) => {
  const wss = new WebSocketServer({ server });

  wss.on('connection', handleConnection);

  return wss;
};

export default initializeWebSocket;
