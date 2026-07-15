/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { IncomingMessage } from 'http';
import { RawData, WebSocket } from 'ws';
import config from '../../app/config';
import { verifyToken } from '../../app/modules/user/user.utils';
import { socketManager } from '../socketManager';
import handleDisconnect from './disconnect.handler';
import handleMessage from './message.handler';

const handleConnection = (ws: WebSocket, req: IncomingMessage) => {
  console.log('Client connected from:', req.socket?.remoteAddress);

  if (!req.url) {
    ws.close(1008, 'Invalid request');
    return;
  }

  const url = new URL(req.url, 'http://localhost');
  const token = url.searchParams.get('token');

  if (!token) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  let decoded;

  try {
    decoded = verifyToken(token, config.jwt_access_secret as string);

    if (!decoded) {
      ws.close(1008, 'Unauthorized');
      return;
    }
  } catch (error) {
    ws.close(1008, 'Unauthorized');
    return;
  }

  const userId = decoded.id;

  socketManager.add(userId, ws);

  // ws.on('message', (data) => `echo: ${data}`);
  ws.on('message', (data: RawData) => {
    handleMessage(ws, data);
  });

  //   ws.on('close', () => console.log('Client disconnected'));
  ws.on('close', () => {
    handleDisconnect(userId);
  });

  ws.on('error', (err) => {
    console.error('WebSocket error:', err);

    if (ws.readyState === WebSocket.OPEN) {
      ws.close(1011, 'Internal server error');
    }
  });
};

export default handleConnection;
