const mongoose = require("mongoose");

const connectToDB = async () => {
  // can change to diff db in future if needed
  // can put uri in .env file. for simplicity, edit uri here directly
  const uri =
    "mongodb+srv://mingliang:securepassword@mingtestcluster.9hew0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

  try {
    const connection = await mongoose.connect(uri);
    console.log(`Connected to MongoDb: ${connection.connection.host}`);
  } catch (err) {
    console.error(err);
  }
};

module.exports = connectToDB;
