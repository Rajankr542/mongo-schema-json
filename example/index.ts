import { getDbSchema } from 'mongo-schema-json';

(async () => {
  const { schema, collections } = await getDbSchema({
    uri: 'mongodb://localhost:27017',
    dbName: 'mflix',
  });

  for (const collection of collections) {
    console.log('--------------------------------------------');
    console.log('Schema for', collection);
    console.log(schema[collection]);
    console.log('--------------------------------------------');
  }
})();
