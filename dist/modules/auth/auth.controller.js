"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authControllers = void 0;
const auth_service_1 = require("./auth.service");
const createUser = async (req, res) => {
    const { name, email, password, phone, role } = req.body;
    try {
        const result = await auth_service_1.authServices.createUser(req.body);
        res.status(201).json({
            success: true,
            message: "user created successfully",
            data: result.rows[0],
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
const userLogIn = async (req, res) => {
    const { email, password } = req.body;
    try {
        const result = await auth_service_1.authServices.logInUser(email, password);
        res.status(201).json({
            success: true,
            message: "user logged in successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
exports.authControllers = {
    createUser,
    userLogIn,
};
