import express from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
import { client } from "./db.js";
import { userRouter } from "./routes/userRoutes.js";
import { isAuth } from "./authentication/auth.js";
import { bmiRouter } from "./routes/dietRouter.js";

let app = express();
app.use(cors())
let port = 9000;
app.use(express.json());
app.use("/", userRouter);
app.use("/", isAuth, bmiRouter);
app.listen(port, ()=>console.log("server connected"));