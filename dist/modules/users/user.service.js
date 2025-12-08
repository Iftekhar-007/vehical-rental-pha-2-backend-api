"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userServices = void 0;
const db_1 = require("../../config/db");
const getAllUser = async () => {
    const result = await db_1.pool.query(`SELECT id,name,email,phone,role FROM users`);
    return result;
};
const updateUser = async (id, name, email, phone, role) => {
    const roleValid = role || "customer";
    const result = await db_1.pool.query(`UPDATE users
   SET
     name = COALESCE($1, name),
     email = COALESCE($2, email),
     phone = COALESCE($3, phone),
     role = COALESCE($4, role)
   WHERE id = $5
   RETURNING id,name,email,phone,role`, [name || null, email || null, phone || null, role || null, id]);
    if (result.rowCount === 0) {
        throw new Error("User Update Unsuccessfully");
    }
    return result;
};
const deleteUser = async (userId) => {
    const active = await db_1.pool.query(`SELECT * FROM bookings WHERE customer_id=$1 AND status='active'`, [userId]);
    if (active.rows.length > 0) {
        return "user can't be deleted. Active bookings exists";
    }
    const result = await db_1.pool.query(`DELETE FROM users WHERE id=$1 RETURNING *`, [
        userId,
    ]);
    return result;
};
exports.userServices = {
    getAllUser,
    deleteUser,
    updateUser,
};
