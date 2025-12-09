import { Request, Response } from "express";
import { bookingsServices } from "./booking.service";

const createBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingsServices.createBookings(req.body);
    res.status(200).json({
      success: true,
      message: "Booking created successfully",
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

    res.status(200).json({
      success: true,
      message: "Bookings retrived here",
      data: result?.rows,
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const updateBooking = async (req: Request, res: Response) => {
  try {
    let result;

    if (req.user?.role === "customer") {
      result = await bookingsServices.cancelBooking(
        req.params.bookingId as string,
        req.user?.id
      );
    } else if (req.user?.role === "admin") {
      result = await bookingsServices.makeReturned(
        req.params.bookingId as string
      );
    }

    res.status(200).json({
      success: true,
      message: "Booking here",
      data: result,
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
  updateBooking,
};
