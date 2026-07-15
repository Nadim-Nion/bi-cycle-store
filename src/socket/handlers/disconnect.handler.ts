import { socketManager } from "../socketManager";

const handleDisconnect = (userId: string) => {
  socketManager.remove(userId);
};

export default handleDisconnect;