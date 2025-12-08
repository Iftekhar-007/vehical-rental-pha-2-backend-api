"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserGuard = void 0;
const updateUserGuard = (req, res, next) => {
    const targetId = req.params.userId;
    const user = req.user;
    if (user?.role === "customer") {
        if (user.id != targetId) {
            return res.status(403).json({
                message: "Customers can update only their own profile",
            });
        }
        if (req.body.role) {
            return res.status(403).json({
                message: "You are not allowed to change role",
            });
        }
    }
    next();
};
exports.updateUserGuard = updateUserGuard;
