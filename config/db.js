const mongoose = require("mongoose");
const mongodbConnect = async () => {
  const URL = process.env.MONGO_URL;
  let res = await mongoose.connect(URL);
  console.log(`Data base connect ${res.connection.db.databaseName}`);
};

module.exports = mongodbConnect;
