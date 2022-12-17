const mongoose = require("mongoose");
require("dotenv").config();

mongoose.set("strictQuery", false);
const connect = async () => {
  try {
    const response = await mongoose.connect(process.env.URI);
    console.log(`connected to database`);
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
