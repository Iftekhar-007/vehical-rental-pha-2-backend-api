"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicle_controller_1 = require("./vehicle.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)("admin"), vehicle_controller_1.vehiclesController.createVehicle);
router.get("/", vehicle_controller_1.vehiclesController.getAllVehicles);
router.get("/:vehicleId", vehicle_controller_1.vehiclesController.getSingleVehicle);
router.put("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehiclesController.updateVehicle);
router.delete("/:vehicleId", (0, auth_1.default)("admin"), vehicle_controller_1.vehiclesController.deleteVehicle);
const vehiclesRoutes = router;
exports.default = vehiclesRoutes;
