import { Request, Response } from "express";
import { bookingsServices } from "./booking.service";

const createBookings = async (req: Request, res: Response) => {
  const {
    customer_id,
    vehicle_id,
    rent_start_date,
    rent_end_date,
    total_price,
    status,
  } = req.body;

  try {
    const result = await bookingsServices.createBookings(req.body);
    res.status(201).json({
      success: true,
      message: "booking created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

export const bookingsController = {
  createBookings,
};
