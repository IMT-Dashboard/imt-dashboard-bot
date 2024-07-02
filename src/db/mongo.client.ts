import { MongoClient } from 'mongodb';
import { config } from '../config';
import { Account } from '../model/account.model';

let database = config.DATABASE_DEV;
if (process.env.NODE_ENV === 'production') {
  database = config.DATABASE_PROD;
}

const client = new MongoClient(database);

client.connect();

export const accountsCollection = client.db().collection<Account>('accounts');
