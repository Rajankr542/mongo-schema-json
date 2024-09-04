"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMongoDbConnection = void 0;
const mongodb_1 = require("mongodb");
let connectionString = undefined;
const createMongoDbConnection = async ({ uri, dbName, }) => {
    if (connectionString) {
        return connectionString;
    }
    const mongoClient = new mongodb_1.MongoClient(uri);
    await mongoClient.connect();
    connectionString = mongoClient.db(dbName);
    return mongoClient.db(dbName);
};
exports.createMongoDbConnection = createMongoDbConnection;
