import { RawData, WebSocket } from 'ws';

const handleMessage = (ws: WebSocket, data: RawData) => {
  const message = data.toString();

  console.log('message in the message handler:', message);

  ws.send(
    JSON.stringify({
      type: 'echo',
      payload: message,
    }),
  );
};

export default handleMessage;
