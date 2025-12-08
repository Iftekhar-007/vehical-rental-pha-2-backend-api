"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.vehiclesController = void 0;
const vehicle_service_1 = require("./vehicle.service");
const createVehicle = async (req, res) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = req.body;
    try {
        const result = await vehicle_service_1.vehicleServices.createVehicle(req.body);
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
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
const getAllVehicles = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.getAllVehicles();
        if (result.rows.length === 0) {
            return {
                success: true,
                message: "No vehicles found",
                data: [],
            };
        }
        res.status(201).json({
            success: true,
            message: "Vehicles retrieved successfully",
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
const getSingleVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.getSingleVehicle(req.params.vehicleId);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "no vehicle found with this id",
            });
        }
        else {
            res.status(201).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
const updateVehicle = async (req, res) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status, } = req.body;
    try {
        const result = await vehicle_service_1.vehicleServices.updateVehicle(req.params.vehicleId, req.body);
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "no vehicle found with this id",
            });
        }
        else {
            res.status(200).json({
                success: true,
                message: "Vehicle updated sucessfully",
                data: result.rows[0],
            });
        }
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
const deleteVehicle = async (req, res) => {
    try {
        const result = await vehicle_service_1.vehicleServices.deleteVehicle(req.params.vehicleId);
        res.status(200).json({
            success: true,
            message: "Vehicle deleted successfully",
        });
    }
    catch (err) {
        res.status(504).json({
            success: false,
            message: err.message,
        });
    }
};
exports.vehiclesController = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle,
};
