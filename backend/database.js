const mongoose = require("mongoose");

const databaseConnection = async () => {
  try {
    await mongoose
      .connect(
        process.env.MONGODB_URI
      )
      .then(() => {
        console.log("database connected successfully");
      });
  } catch (error) {
    throw new Error("ERROR:" + error);
  }
};

module.exports = databaseConnection;
