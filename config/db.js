const mongoose = require('mongoose');
const colors = require('colors');

// db connection
const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to mongoose db ${mongoose.connection.host}`.bgCyan.white,
    );
  } catch (error) {
    console.log('DB connection error', error);
  }
};

module.exports = connectionDB;
