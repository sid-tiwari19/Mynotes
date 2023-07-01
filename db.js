const mongoose = require("mongoose");
require("dotenv").config();
const mongoURI =
  "mongodb+srv://siddharth19402:DL7qdrpvJGYdjko5@cluster0.metxtfh.mongodb.net/mynotes";

const connectToMongo = async () => {
  try {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Mongo connected");
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectToMongo;
