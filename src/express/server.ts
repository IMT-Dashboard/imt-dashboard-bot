import express from 'express';
import { config } from '../config';
import { Notification } from '../model/notification.model';
import { getUsernameFromJWT } from '../util/utils';
import jwt from 'jsonwebtoken';
import { sendDiscordNotification } from '../discord/discord';

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/api/notification', async (req, res) => {
  const notification = req.body as Notification;

  const authorization = req.headers.authorization;
  if (!authorization) {
    res.status(401).send('Missing Authorization header');
    return;
  }

  const token = authorization.split(' ')[1];

  const payload = jwt.verify(token, config.JWT_SECRET) as { username: string } | null;

  if (!payload) {
    res.status(401).send('Unauthorized');
    return;
  }

  const username = getUsernameFromJWT(token);

  if (username != notification.username) {
    res.status(401).send('Unauthorized');
    return;
  }

  if (!notification.discordId) {
    res.status(400).send('Missing discordId');
    return;
  }

  await sendDiscordNotification(notification);

  res.status(200).send();
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
