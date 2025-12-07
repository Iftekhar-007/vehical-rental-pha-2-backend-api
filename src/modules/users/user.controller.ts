import { Request, Response } from "express";
import { userServices } from "./user.service";

// const createUser = async (req: Request, res: Response) => {
//   const { name, email, password, phone, role } = req.body;

//   try {
//     const result = await userServices.createUser(req.body);
//     res.status(201).json({
//       success: true,
//       message: "user created successfully",
//       data: result.rows[0],
//     });
//   } catch (err: any) {
//     res.status(504).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

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

// const updateUser = async (req: Request, res: Response) => {
//   const { name, email, phone, role } = req.body;

//   try {
//     if(role==="customer" && id !== Number(req.params.id))
//   } catch (err: any) {
//     res.status(504).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };

export const userControllers = {
  getAllUser,
  // getSingleUser,
};
