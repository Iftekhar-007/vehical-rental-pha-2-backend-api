import { pool } from "../../config/db";

const getAllUser = async () => {
  const result = await pool.query(`SELECT id,name,email,phone,role FROM users`);

  return result;
};

const updateUser = async (
  id: string,
  name: string,
  email: string,
  phone: string,
  role: string
) => {
  const roleValid = role || "customer";
  const result = await pool.query(
    `UPDATE users
   SET
     name = COALESCE($1, name),
     email = COALESCE($2, email),
     phone = COALESCE($3, phone),
     role = COALESCE($4, role)
   WHERE id = $5
   RETURNING id,name,email,phone,role`,
    [name || null, email || null, phone || null, role || null, id]
  );
  if (result.rowCount === 0) {
    throw new Error("User Update Unsuccessfully");
  }
  return result;
};

// export const updateCustomer = async (
//   id: number,
//   payload: { name?: string; email?: string; phone?: string }
// ) => {
//   const allowed = ["name", "email", "phone"] as const;
//   console.log(id);
//   const fields: string[] = [];
//   const values: any[] = [];
//   let i = 1;

//   for (const key of allowed) {
//     const value = payload[key as keyof typeof payload];

//     if (value !== undefined && value !== null && value !== "") {
//       fields.push(`${key} = $${i}`);
//       values.push(value);
//       i++;
//     }
//   }

//   if (fields.length === 0) return null;

//   values.push(id);

//   const query = `
//     UPDATE users
//     SET ${fields.join(", ")}
//     WHERE id=$${i}
//     RETURNING id, name, email, phone, role
//   `;

//   const result = await pool.query(query, values);
//   return result.rows[0] || null;
// };

// export const updateAdmin = async (
//   id: number,
//   payload: { name?: string; email?: string; phone?: string; role?: string }
// ) => {
//   const allowed = ["name", "email", "phone", "role"] as const;

//   const fields: string[] = [];
//   const values: any[] = [];
//   let i = 1;

//   for (const key of allowed) {
//     if (payload[key as keyof typeof payload]) {
//       fields.push(`${key} = $${i}`);
//       values.push(payload[key as keyof typeof payload]);
//       i++;
//     }
//   }

//   if (fields.length === 0) return null;

//   values.push(id);

//   const query = `
//     UPDATE users
//     SET ${fields.join(", ")}
//     WHERE id=$${i}
//     RETURNING id, name, email, phone, role
//   `;

//   const result = await pool.query(query, values);
//   return result.rows[0] || null;
// };

const deleteUser = async (userId: string) => {
  const active = await pool.query(
    `SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`,
    [userId]
  );

  if (active.rows.length > 0) {
    return "user can't be deleted. Active bookings exists";
  }

  const result = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
    userId,
  ]);

  return result;
};

export const userServices = {
  getAllUser,
  deleteUser,
  updateUser,
};
