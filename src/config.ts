import dotenv from "dotenv";

dotenv.config();

const { DISCORD_TOKEN, DATABASE_DEV, DATABASE_PROD } = process.env;

if (!DISCORD_TOKEN) {
  throw new Error("Missing environment variables");
}

export const config = {
  DISCORD_TOKEN,
};
