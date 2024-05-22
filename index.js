import express from "express";
import connectToMongoDb from "./connectMongoDB.js";
import dotenv from "dotenv";
import userRouter from "./src/Routers/user.js";
import menuRouter from "./src/Routers/menu.js";

const app = express();
app.use(express.json());
dotenv.config();
const port = process.env.PORT;

app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToMongoDb();
