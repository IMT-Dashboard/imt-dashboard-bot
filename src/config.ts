import dotenv from 'dotenv';

dotenv.config();

const { DISCORD_TOKEN, PORT, NOTIFICATION_AUTHORIZATION_KEY } = process.env;

if (!DISCORD_TOKEN || !PORT || !NOTIFICATION_AUTHORIZATION_KEY) {
  throw new Error('Missing environment variables');
}

export const config = {
  DISCORD_TOKEN,
  PORT,
  NOTIFICATION_AUTHORIZATION_KEY
};
