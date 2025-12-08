import { Request, Response } from "express";
import { bookingsServices } from "./booking.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBookings(req.body);
    res.status(201).json({
      success: true,
      message: "booking created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const user = req.user;
    let result;
    if (user!.role === "admin") {
      result = await bookingsServices.getAllBookings();
    }
    if (user!.role === "customer") {
      result = await bookingsServices.getCustomerBooking(user!.id);
    }

    res.status(201).json({
      success: true,
      message: "Booking here",
      data: result?.rows,
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
  getBookings,
};
