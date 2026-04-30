import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  node_env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUND,
  access_expires_in: process.env.ACCESS_EXPIRES_IN,
  refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
};
