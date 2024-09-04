"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDbSchema = void 0;
const mongodb_1 = require("../db/mongodb");
const getDataTypesWithObject = (obj) => {
    const dataTypes = {};
    if (Array.isArray(obj) && obj.length > 0) {
        if (typeof obj[0] !== 'object') {
            const typeOfTheObjec = typeof obj[0];
            return `${typeOfTheObjec}[]`;
        }
        return [getDataTypesWithObject(obj[0])];
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
const getDbSchema = async ({ uri, dbName }) => {
    const db = await (0, mongodb_1.createMongoDbConnection)({
        uri,
        dbName,
    });
    const collections = await db.listCollections().toArray();
    const schemaOfCompleteTable = {};
    const ArrayOfIds = [];
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
exports.getDbSchema = getDbSchema;
