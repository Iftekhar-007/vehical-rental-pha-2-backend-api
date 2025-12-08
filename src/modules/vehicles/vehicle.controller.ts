import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const createVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await vehicleServices.createVehicle(req.body);

    res.status(201).json({
      success: true,
      message: "vehicles registered successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const getAllVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getAllVehicles();

    res.status(201).json({
      success: true,
      message: "vehicles",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "no vehicle found with this id",
      });
    } else {
      res.send(result.rows[0]);
    }
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const updateVehicle = async (req: Request, res: Response) => {
  const {
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
  } = req.body;

  try {
    const result = await vehicleServices.updateVehicle(
      req.params.vehicleId as string,
      req.body
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "no vehicle found with this id",
      });
    } else {
      res.send(result.rows[0]);
    }
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

export const vehiclesController = {
  createVehicle,
  getAllVehicles,
  getSingleVehicle,
  updateVehicle,
};
