import { IDataType, IMongoDbConnectionProps } from '../types';

import { createMongoDbConnection } from '../db/mongodb';

const getDataTypesWithObject = (obj: any): IDataType | IDataType[] | string => {
  const dataTypes: IDataType | IDataType[] = {};
  if (Array.isArray(obj) && obj.length > 0) {
    if (typeof obj[0] !== 'object') {
      const typeOfTheObjec = typeof obj[0];
      return `${typeOfTheObjec}[]`;
    }
    return [getDataTypesWithObject(obj[0]) as IDataType];
  }

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      dataTypes[key] =
        typeof value === 'object' && value._bsontype === 'ObjectId'
          ? 'string'
          : typeof value === 'object' &&
            Object.prototype.toString.call(value) === '[object Date]'
          ? 'Date'
          : typeof value === 'object'
          ? getDataTypesWithObject(value)
          : typeof value;
    }
  }
  return dataTypes;
};

export const getDbSchema = async ({ uri, dbName }: IMongoDbConnectionProps) => {
  const db = await createMongoDbConnection({
    uri,
    dbName,
  });
  const collections = await db.listCollections().toArray();
  const schemaOfCompleteTable: IDataType = {};
  const ArrayOfIds: string[] = [];
  for (const collection of collections) {
    const collectionName = collection.name;
    ArrayOfIds.push(collectionName);
    const metadata = await db.collection(collectionName).findOne();

    if (metadata) {
      const schema = getDataTypesWithObject(metadata);
      schemaOfCompleteTable[collectionName] = schema;
    }
  }
  return { schema: schemaOfCompleteTable, collections: ArrayOfIds };
};
