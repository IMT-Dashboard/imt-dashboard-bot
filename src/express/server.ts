import express from 'express';
import { config } from '../config';
import { accountsCollection } from '../db/mongo.client';
import { Account } from '../model/account.model';
import { NotificationType } from '../model/notification.model';
import { getUsernameFromJWT } from '../util/utils';
import jwt from 'jsonwebtoken';
import { sendDiscordNotification } from '../discord/discord';

const port = config.PORT;
const app = express();

app.use(express.json());

app.post('/api/notification', async (req, res) => {
  const notificationType = req.body as NotificationType;

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

  if (username != notificationType.username) {
    res.status(401).send('Unauthorized');
    return;
  }

  let account: Account | null;
  try {
    account = await accountsCollection.findOne({ username }, { projection: { _id: 0 } });
  } catch (e) {
    console.error(e);
    res.status(500).send('Internal Server Error');
    return;
  }

  if (!account) {
    res.status(404).send('User not found in database');
    return;
  }

  if (!account.discordId) {
    res.status(400).send('No Discord ID found');
    return;
  }

  await sendDiscordNotification(account.discordId, notificationType);

  res.status(200).send();
});

export function startServer() {
  app.listen(port, () => {
    console.log(`Server started on port ${port}`);
  });
}
