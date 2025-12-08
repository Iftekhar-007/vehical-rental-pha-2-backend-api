import express from "express";
import { vehiclesController } from "./vehicle.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/", auth("admin"), vehiclesController.createVehicle);

router.get("/", vehiclesController.getAllVehicles);

router.get("/:vehicleId", vehiclesController.getSingleVehicle);

router.put("/:vehicleId", auth("admin"), vehiclesController.updateVehicle);

router.delete("/:vehicleId", auth("admin"), vehiclesController.deleteVehicle);

const vehiclesRoutes = router;

export default vehiclesRoutes;
