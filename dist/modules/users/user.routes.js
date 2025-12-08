"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const updateUserGuard_1 = require("../../middlewares/updateUserGuard");
const router = express_1.default.Router();
router.get("/", (0, auth_1.default)("admin"), user_controller_1.userControllers.getAllUser);
router.put("/:userId", (0, auth_1.default)("admin", "customer"), updateUserGuard_1.updateUserGuard, user_controller_1.userControllers.updateUser);
router.delete("/:userId", (0, auth_1.default)("admin"), user_controller_1.userControllers.deleteUser);
const userRoutes = router;
exports.default = userRoutes;
