"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authServices = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const db_1 = require("../../config/db");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const createUser = async (payload) => {
    const hashPass = await bcryptjs_1.default.hash(payload.password, 10);
    const result = await db_1.pool.query(`INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING name,email,phone,role`, [payload.name, payload.email, hashPass, payload.phone, payload.role]);
    return result;
};
const logInUser = async (email, password) => {
    const result = await db_1.pool.query(`SELECT * FROM users WHERE email=$1`, [
        email,
    ]);
    if (result.rows.length === 0) {
        return null;
    }
    const user = result.rows[0];
    const userObj = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
    };
    const match = await bcryptjs_1.default.compare(password, user.password);
    if (!match) {
        return false;
    }
    const token = jsonwebtoken_1.default.sign({ id: user.id, name: user.name, email: user.email, role: user.role }, `${config_1.default.jwtSecret}`, { expiresIn: "7d" });
    return { token, userObj };
};
exports.authServices = {
    createUser,
    logInUser,
};
