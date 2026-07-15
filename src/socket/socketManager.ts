import { WebSocket } from 'ws';

class SocketManager {
  private clients = new Map<string, WebSocket>();

  add(userId: string, ws: WebSocket) {
    this.clients.set(userId, ws);
  }

  remove(userId: string) {
    this.clients.delete(userId);
  }

  send(userId: string, payload: unknown) {
    const client = this.clients.get(userId);

    if (!client) return;

    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(payload));
    }
  }
}

export const socketManager = new SocketManager();
