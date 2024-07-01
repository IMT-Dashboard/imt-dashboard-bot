import { Client, ClientUser } from 'discord.js';
import { config } from './config';

const client = new Client({
  intents: ["DirectMessages"],
});

client.once("ready", () => {
  console.log("Discord bot is ready 🚀");
  const user = client.user!;
  changeBotPresence(user);

  // TODO

});

function changeBotPresence(user: ClientUser) {
  user.setPresence({
    activities: [{
      name: "👀 imt-dashboard.vercel.app",
      type: 4
    }],
    status: "online"
  });
}

client.login(config.DISCORD_TOKEN);
