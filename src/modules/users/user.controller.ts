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

// const updateUser = async (req: Request, res: Response) => {
//   const { name, email, phone, role } = req.body;

//   try {
//     if (req.user!.role === "customer" && req.user!.id !== req.params.id) {
//       return res.status(403).json({
//         success: false,
//         message: "Customers can update only their own profile.",
//       });
//     }

//     if (req.user!.role === "customer" && role && role !== req.user!.role) {
//       return res.status(403).json({
//         success: false,
//         message: "Customers cannot change their own role.",
//       });
//     }

//     const result = await userServices.updateUser(
//       name,
//       email,
//       phone,
//       role,
//       req.params.id as string
//     );

//     res.status(200).json({
//       success: true,
//       message: "User updated successfully",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     res.status(504).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid userId" });
    }

    const loggedUser = req.user!;
    const payload = req.body;

    // ❌ Customer cannot update others
    if (loggedUser.role === "customer" && loggedUser.id !== userId) {
      return res.status(403).json({
        success: false,
        message: "Customers can update only their own profile",
      });
    }

    // ❌ Customer cannot change role
    if (loggedUser.role === "customer" && payload.role) {
      return res.status(403).json({
        success: false,
        message: "Customers cannot change their role",
      });
    }

    // 🌟 admin → updateAdmin
    // 🌟 customer → updateCustomer
    const result =
      loggedUser.role === "admin"
        ? await userServices.updateAdmin(userId, payload)
        : await userServices.updateCustomer(userId, payload);

    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
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
