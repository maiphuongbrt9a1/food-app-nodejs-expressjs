const mongoose = require('mongoose');

// db connection
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to mongoose db ${mongoose.connection.host}`);
  } catch (error) {
    console.log('DB connection error', error);
  }
};

module.exports = connectionDB;
