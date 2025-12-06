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
        email TEXT UNIQUE NOT NULL CHECK (email = LOWER(email)),
        password VARCHAR(200) CHECK (LENGTH(password) >= 6),
        phone VARCHAR(15) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL CHECK(role IN ('admin','customer'))
        )`);

  await pool.query(`CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(350) NOT NULL, 
            type VARCHAR(50) NOT NULL CHECK(type IN('car','bike','van', 'SUV')),
            registration_number VARCHAR(500) UNIQUE NOT NULL,
            daily_rent_price NUMERIC(10, 2) NOT NULL CHECK(daily_rent_price>0),
            availability_status VARCHAR(30) NOT NULL CHECK (availability_status IN ('available', 'booked'))
            )`);
};

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello i am the boss!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
