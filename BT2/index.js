import express from "express"
import authRouter from "./Routes/auth-route.js";
import mongoose from "mongoose";


const app = express();
app.use(express.json());
app.use('/', authRouter)
mongoose.connect("mongodb://127.0.0.1:27017/final")
app.listen(3000, () => {
  console.log("App is running at 3000");
});

