import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, DATABASE_DEV, DATABASE_PROD, PORT, SALT, JWT_SECRET } = process.env;

if (!DISCORD_TOKEN || !DATABASE_DEV || !DATABASE_PROD || !PORT || !SALT || !JWT_SECRET) {
  throw new Error('Missing environment variables');
}

export const config = {
  DISCORD_TOKEN,
  DATABASE_DEV,
  DATABASE_PROD,
  PORT,
  SALT,
  JWT_SECRET
};
