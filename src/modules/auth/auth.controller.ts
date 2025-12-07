import { Request, Response } from "express";
import { authServices } from "./auth.service";

const createUser = async (req: Request, res: Response) => {
  const { name, email, password, phone, role } = req.body;

  try {
    const result = await authServices.createUser(req.body);
    res.status(201).json({
      success: true,
      message: "user created successfully",
      data: result.rows[0],
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const userLogIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const result = await authServices.logInUser(email, password);

    res.status(201).json({
      success: true,
      message: "user logged in successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

export const authControllers = {
  createUser,
  userLogIn,
};
