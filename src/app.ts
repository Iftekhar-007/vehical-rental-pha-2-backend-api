import express, { Request, Response } from "express";
import userRoutes from "./modules/users/user.routes";
import vehiclesRoutes from "./modules/vehicles/vehicle.routes";
import bookingsRoutes from "./modules/bookings/booking.routes";
import authRoutes from "./modules/auth/auth.routes";
import initDB from "./config/db";
const app = express();

// parser
app.use(express.json());
app.use(express.urlencoded());

initDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello i am the boss!");
});

// !users crud

app.use("/api/v1/users", userRoutes);

// ! vehicles api crud

app.use("/api/v1/vehicles", vehiclesRoutes);

// ! bookings api crud

app.use("/api/v1/bookings", bookingsRoutes);

// !auth api
app.use("/api/v1/auth", authRoutes);

export default app;
