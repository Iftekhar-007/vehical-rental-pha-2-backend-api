import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

// const createUser = async (payload: Record<string, unknown>) => {
//   const hashPass = await bcrypt.hash(payload.password as string, 10);
//   const result = await pool.query(
//     `INSERT INTO users(name,email,password,phone,role) VALUES($1,$2,$3,$4,$5)`,
//     [payload.name, payload.email, hashPass, payload.phone, payload.role]
//   );
//   return result;
// };

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

// const getSingleuser = async (id: string) => {
//   const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
//   return result;
// };

const updateUser = async (payload: Record<string, unknown>) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,
    [payload.name, payload.email, payload.phone, payload.role]
  );

  return result;
};

export const userServices = {
  getAllUser,
  // getSingleuser,
  updateUser,
};
