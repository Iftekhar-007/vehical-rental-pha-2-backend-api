import express, { Request, Response } from "express";
import config from "./config";
import initDB, { pool } from "./config/db";
import userRoutes from "./modules/users/user.routes";
const app = express();
const port = config.port;

// parser
app.use(express.json());
app.use(express.urlencoded());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello i am the boss!");
});

// !users crud

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
