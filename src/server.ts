import express, { Request, Response } from "express";
import { Pool } from "pg";
import dotenv from "dotenv";
import path from "path";
const app = express();
const port = 5000;

// env config

dotenv.config({ path: path.join(process.cwd(), ".env") });

// parser
app.use(express.json());
app.use(express.urlencoded());

const pool = new Pool({
  connectionString: `${process.env.CONNECTION_STR}`,
});

const initDB = async () => {
  await pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        age INT,
        email TEXT UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL CHECK(role IN ('admin','customer'))
        )`);
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello i am the boss!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
