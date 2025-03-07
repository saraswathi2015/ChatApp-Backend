import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";
import router from "./routes/userRouter.js";
import cookiesParser from "cookie-parser";
import { app, server } from "./socket/socket.js";
// import bodyParser from "body-parser";

dotenv.config();

// const app = express();

//Middleware to parse JSON bodies
// app.use(bodyParser.json());

app.use(express.json());
app.use(cookiesParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

//api end point
app.use("/api", router);

const PORT = process.env.PORT || 8000;

//database connection
// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log("server started" + PORT);
//     });
//   })
//   .catch((error) => {
//     console.log(error);
//   });

//socket connection
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log("server started" + PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// app.get("/", (req, res) => {
//   res.json({ success: true, message: "Server started " + PORT });
// });
