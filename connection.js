// import mongoose from "mongoose";

// dotenvConfigOptions.config();

// const mongoString = process.env.DATABASE_URL;
// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on("error", (error) => {
//   console.log(error);
// });

// database.once("connected", () => {
//   console.log("Database Connected");
// });

// dotenvConfigOptions.config();

import mysql from "mysql2";
import dotenvConfigOptions from "dotenv";

dotenvConfigOptions.config();

const databaseConnection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

databaseConnection.connect((error, result) => {
  if (error) console.log(error);
  else console.log("connected to DB");
});

export default databaseConnection;
