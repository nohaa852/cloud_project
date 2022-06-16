const { MongoClient } = require("mongodb");
const util = require("util");

util.promisify(MongoClient.connect);

let dbConnection;

const connect = async () => {
  try {
    const client = await MongoClient.connect(
      "mongodb+srv://user:user@cluster0.xg3q0.mongodb.net/?retryWrites=true&w=majority"
    );
    dbConnection = client.db("mydatabase");
  } catch (e) {
    throw new Error(`Could not establish database connection: ${e}`);
  }
};

const mongoClient = async () => {
  if (!dbConnection) {
    await connect();
  }
  return dbConnection;
};

module.exports = {
  mongoClient,
};
