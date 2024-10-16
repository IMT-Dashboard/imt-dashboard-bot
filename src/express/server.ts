import express from 'express';
import { config } from '../config';
import { Notification } from '../model/notification.model';
import { sendDiscordNotification } from '../discord/discord';

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/api/notification', async (req, res) => {
  const notification = req.body as Notification;

  console.log('Received notification', notification);

  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send('Missing Authorization header');
    console.log('Received notification without Authorization header');
    return;
  }

  if (authorization !== config.NOTIFICATION_AUTHORIZATION_KEY) {
    res.status(401).send('Unauthorized');
    console.log('Received notification with invalid authorization key');
    return;
  }

  if (!notification.discordId) {
    res.status(400).send('Missing discordId');
    console.log('Received notification without discordId');
    return;
  }

  await sendDiscordNotification(notification);

  res.status(200).send();
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port} 🚀`);
  });
}
