"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userControllers = void 0;
const user_service_1 = require("./user.service");
const getAllUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.getAllUser();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            data: result.rows,
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
const updateUser = async (req, res) => {
    const id = req.params.userId;
    const { name, email, phone, role } = req.body;
    try {
        const result = await user_service_1.userServices.updateUser(id, name, email, phone, role);
        if (result.rowCount === 0) {
            res.status(400).json({
                success: true,
                message: "User Not Found",
                data: result.rows[0],
            });
        }
        res.status(200).json({
            success: true,
            message: "User update Successfully",
            data: result.rows[0],
        });
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: "User update Unsuccessfully",
            error: error.message,
        });
    }
};
const deleteUser = async (req, res) => {
    try {
        const result = await user_service_1.userServices.deleteUser(req.params.userId);
        res.status(200).json({
            success: true,
            message: "User Deleted successfully",
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
exports.userControllers = {
    getAllUser,
    updateUser,
    deleteUser,
};
