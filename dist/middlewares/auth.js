"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const auth = (...roles) => {
    return (req, res, next) => {
        try {
            const bearerToken = req.headers.authorization;
            const token = bearerToken?.split(" ")[1];
            if (!token) {
                return res.status(504).json({
                    message: "you are not allowed to access this api",
                });
            }
            const decoded = jsonwebtoken_1.default.verify(token, `${config_1.default.jwtSecret}`);
            req.user = decoded;
            if (roles.length && !roles.includes(decoded.role)) {
                return res.status(403).json({
                    message: "you have no authority to access this url",
                });
            }
            next();
        }
        catch (err) {
            res.status(500).json({
                message: err.message,
            });
        }
    };
};
exports.default = auth;
