import express from "express";
import cors from "cors";
import connectToMongoDb from "./connectMongoDB.js";
import dotenv from "dotenv";
import userRouter from "./src/Routers/user.js";
import menuRouter from "./src/Routers/menu.js";
import tableRouter from "./src/Routers/table.js";
import orderRouter from "./src/Routers/order.js";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
dotenv.config();
const port = process.env.PORT;

app.use("/user", userRouter);
app.use("/menu", menuRouter);
app.use("/table", tableRouter);
app.use("/order", orderRouter);
app.use(express.static("./public"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

connectToMongoDb();
