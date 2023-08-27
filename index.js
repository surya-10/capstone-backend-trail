import express from "express";
import dotenv from "dotenv";

dotenv.config();
import { client } from "./db.js";
import { userRouter } from "./routes/userRoutes.js";

let app = express();
let port = 9000;
app.use(express.json());
app.use("/", userRouter);
app.listen(port, ()=>console.log("server connected"));