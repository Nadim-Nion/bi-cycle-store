import { socketManager } from '../socketManager';

const handleDisconnect = (userId: string) => {
  socketManager.remove(userId);

  // console.log(`${userId} disconnected`);
};

export default handleDisconnect;
