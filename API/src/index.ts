import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import express, { Express, NextFunction, Request, Response } from "express";

import userRouter from "./routes/user.router";
import postRouter from "./routes/post.router";
import { dbConnection } from "./utils/Connection";
import { ErrorHandler } from "./utils/ErrorHandler";

dbConnection
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.use("/users", ErrorHandler.handleErrors(userRouter));
app.use("/posts", ErrorHandler.handleErrors(postRouter));

app.all("*", (req: Request, res: Response) => {
  return res.status(404).send({
    success: false,
    message: "Invalid route",
  });
});

// Define a middleware function to handle errors
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(500).send({
    success: false,
    message: "Internal server error",
  });
});

const port = 8000;
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`);
});
