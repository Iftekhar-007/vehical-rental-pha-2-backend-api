"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.pool = void 0;
const pg_1 = require("pg");
const _1 = __importDefault(require("."));
exports.pool = new pg_1.Pool({
    connectionString: `${_1.default.connectionStr}`,
});
const initDB = async () => {
    await exports.pool.query(`CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY,
        name VARCHAR(250) NOT NULL,
        email TEXT UNIQUE NOT NULL CHECK (email = LOWER(email)),
        password VARCHAR(200) CHECK (LENGTH(password) >= 6),
        phone VARCHAR(15) UNIQUE NOT NULL,
        role VARCHAR(50) NOT NULL CHECK(role IN ('admin','customer'))
        )`);
    await exports.pool.query(`CREATE TABLE IF NOT EXISTS vehicles(
            id SERIAL PRIMARY KEY,
            vehicle_name VARCHAR(350) NOT NULL, 
            type VARCHAR(50) NOT NULL CHECK(type IN('car','bike','van', 'SUV')),
            registration_number VARCHAR(500) UNIQUE NOT NULL,
            daily_rent_price NUMERIC(10, 2) NOT NULL CHECK(daily_rent_price>0),
            availability_status VARCHAR(30) NOT NULL CHECK (availability_status IN ('available', 'booked'))
            )`);
    await exports.pool.query(`CREATE TABLE IF NOT EXISTS bookings(
                id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
                vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE NOT NULL,
                rent_start_date DATE NOT NULL,
                rent_end_date DATE NOT NULL CHECK(rent_end_date>rent_start_date),
                total_price NUMERIC(10,2) NOT NULL CHECK(total_price>0),
                status VARCHAR(30) NOT NULL CHECK(status IN('active','cancelled','returned'))
                )`);
};
exports.default = initDB;
