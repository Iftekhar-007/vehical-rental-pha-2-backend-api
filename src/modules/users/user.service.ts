import { pool } from "../../config/db";
import bcrypt from "bcryptjs";

const getAllUser = async () => {
  const result = await pool.query(`SELECT * FROM users`);

  return result;
};

// const getSingleuser = async (id: string) => {
//   const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);
//   return result;
// };

const updateUser = async (
  name: string,
  email: string,
  phone: string,
  role: string,
  id: string
) => {
  const result = await pool.query(
    `UPDATE users SET name=$1, email=$2, phone=$3, role=$4 WHERE id=$5 RETURNING *`,
    [name, email, phone, role, id]
  );

  return result;
};

export const userServices = {
  getAllUser,
  // getSingleuser,
  updateUser,
};
