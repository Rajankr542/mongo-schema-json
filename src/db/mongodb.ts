import { Db, MongoClient } from 'mongodb';

import { IMongoDbConnectionProps } from '../types';

let connectionString: Db | undefined = undefined;

export const createMongoDbConnection = async ({
  uri,
  dbName,
}: IMongoDbConnectionProps) => {
  if (connectionString) {
    return connectionString;
  }
  const mongoClient = new MongoClient(uri);
  await mongoClient.connect();
  connectionString = mongoClient.db(dbName);
  return mongoClient.db(dbName);
};
