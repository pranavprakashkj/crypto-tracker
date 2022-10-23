import dotenvConfigOptions from "dotenv";
import express from "express";
import coinRoute from "./routes/coinRoute.js";

// Configuring Express App
const app = express();

// Setting Middleware to accept JSON type object(s)
app.use(express.json());

// API routes
app.use("/api", coinRoute);

// Running the server using environment variables
dotenvConfigOptions.config();
app.listen(process.env.PORT_NUMBER, () => {});
