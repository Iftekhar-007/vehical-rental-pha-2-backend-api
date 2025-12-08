import bcrypt from "bcryptjs";
import { pool } from "../../config/db";
import jwt from "jsonwebtoken";
import config from "../../config";

const createUser = async (payload: Record<string, unknown>) => {
  const hashPass = await bcrypt.hash(payload.password as string, 10);
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5) RETURNING name,email,phone,role`,
    [payload.name, payload.email, hashPass, payload.phone, payload.role]
  );
  return result;
};

const logInUser = async (email: string, password: string) => {
  const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
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

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    return false;
  }

  const token = jwt.sign(
    { name: user.name, email: user.email, role: user.role },
    `${config.jwtSecret}`,
    { expiresIn: "7d" }
  );

  return { token, userObj };
};

export const authServices = {
  createUser,
  logInUser,
};
