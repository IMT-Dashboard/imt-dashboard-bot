import { Client, ClientUser, EmbedBuilder } from 'discord.js';
import { config } from '../config';
import { Notification } from '../model/notification.model';

const client = new Client({
  intents: ['DirectMessages', 'Guilds', 'GuildMessages']
});

client.once('ready', () => {
  console.log('Discord bot is ready 🚀');
  const user = client.user!;
  changeBotPresence(user);
});

function changeBotPresence(user: ClientUser) {
  user.setPresence({
    activities: [
      {
        name: '👀 imt-dashboard.vercel.app',
        type: 4
      }
    ],
    status: 'online'
  });
}

export async function sendDiscordNotification(notification: Notification) {
  const user = await client.users.fetch(notification.discordId);
  if (!user) return;

  const length = notification.subjects.length;
  const s = length > 1 ? 's' : '';
  const s2 = length > 1 ? 'sont' : 'est';
  const s3 = length > 1 ? 'les matières suivantes' : 'la matière suivante';
  const message = `**${length}** nouvelle${s} note${s} ${s2} disponible${s} au semestre **${notification.semester}** pour ${s3} :\n* ${notification.subjects.join('\n* ')}`;
  const titleMessage = length > 1 ? 'Consulter les nouvelles notes !' : 'Consulter la nouvelle note !';

  const embed = new EmbedBuilder()
    .setTitle('📬 ' + titleMessage)
    .setDescription(message)
    .setURL('https://imt-dashboard.vercel.app')
    .setAuthor({ name: 'IMT Dashboard', iconURL: 'https://imt-dashboard.vercel.app/logo.png' })
    .setColor(0x4f3de1);

  user
    .send({ embeds: [embed] })
    .then(() => console.log('Notification sent to Discord'))
    .catch(console.error);
}

export function startDiscordBot() {
  client.login(config.DISCORD_TOKEN);
}
