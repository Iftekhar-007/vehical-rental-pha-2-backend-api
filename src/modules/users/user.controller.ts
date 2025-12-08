import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(200).json({
      success: true,
      message: "Users retrieved successfully",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

const updateUser = async (req: Request, res: Response) => {
  const id = req.params.userId;
  const { name, email, phone, role } = req.body;
  try {
    const result = await userServices.updateUser(
      id as string,
      name,
      email,
      phone,
      role
    );
    if (result.rowCount === 0) {
      res.status(400).json({
        success: true,
        message: "User Not Found",
        data: result.rows[0],
      });
    }
    res.status(200).json({
      success: true,
      message: "User update Successfully",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "User update Unsuccessfully",
      error: (error as Error).message,
    });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.deleteUser(req.params.userId as string);

    res.status(200).json({
      success: true,
      message: "User Deleted successfully",
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

export const userControllers = {
  getAllUser,
  updateUser,
  deleteUser,
};
