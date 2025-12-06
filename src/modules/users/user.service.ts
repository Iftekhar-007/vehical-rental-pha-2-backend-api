import { pool } from "../../config/db";

const createUser = async (payload: Record<string, unknown>) => {
  const result = await pool.query(
    `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5)`,
    [payload.name, payload.email, payload.password, payload.phone, payload.role]
  );
  return result;
};

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

export const userServices = {
  createUser,
  getAllUser,
};
