import { Request, Response } from "express";
import { userServices } from "./user.service";

const getAllUser = async (req: Request, res: Response) => {
  try {
    const result = await userServices.getAllUser();
    res.status(201).json({
      success: true,
      message: "all users here",
      data: result.rows,
    });
  } catch (err: any) {
    res.status(504).json({
      success: false,
      message: err.message,
    });
  }
};

// const getSingleUser = async (req: Request, res: Response) => {
//

//   try {
//     const result = await userServices.getSingleuser(req.params.id);

//     res.status(201).json({
//       success: true,
//       message: "user here",
//       data: result.rows,
//     });
//   } catch (err: any) {
//     res.status(504).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

const updateUser = async (req: Request, res: Response) => {
  const { name, email, phone, role } = req.body;

  try {
    if (req.user!.role === "customer" && req.user!.id !== req.params.id) {
      return res.status(403).json({
        success: false,
        message: "Customers can update only their own profile.",
      });
    }

    if (req.user!.role === "customer" && role) {
      return res.status(403).json({
        success: false,
        message: "Customers cannot change their role.",
      });
    }

    const result = await userServices.updateUser(
      name,
      email,
      phone,
      role,
      req.params.id as string
    );

    return res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result.rows[0],
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
  // getSingleUser,
  updateUser,
};
