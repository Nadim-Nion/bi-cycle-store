import { createServer } from 'http';
// import { createServer, Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import initializeWebSocket from './socket/websocket';

// let server: Server;
const server = createServer(app);

async function main() {
  try {
    await mongoose.connect(config.database_url as string);

    initializeWebSocket(server);

    // server = app.listen(config.port, () => {
    //   console.log(`Bi-Cycle Store app listening on port ${config.port} 😊`);
    // });

    server.listen(config.port, () => {
      console.log(`Bi-Cycle Store app listening on port ${config.port} 😊`);
    });
  } catch (err) {
    console.log(err);
  }
}

main();

process.on('unhandledRejection', () => {
  console.log('Unhandled Rejection is detected. Server is Shutting down... 😈');

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log('Uncaught Exception is detected. Server is Shutting down... 😈');

  process.exit(1);
});

// Promise.reject();
// console.log(x);
