const express = require("express");
const connect = require("./config/db");
const errorHandler = require("./middleware/error");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use("/auth", require("./routes/auth"));
app.use("/private", require("./routes/private"));
app.use(errorHandler);

connect();

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

process.on("unhandledRejection", (error, promise) => {
  console.log(`Error logged is: ${error}`);
  server.close(() => process.exit(1));
});
