import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";

const auth = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const bearerToken = req.headers.authorization;
      const token = bearerToken?.split(" ")[1];

      if (!token) {
        return res.status(504).json({
          message: "you are not allowed to access this api",
        });
      }

      const decoded = jwt.verify(token, `${config.jwtSecret}`) as JwtPayload;

      req.user = decoded;

      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({
          message: "you have no authority to access this url",
        });
      }

      next();
    } catch (err: any) {
      res.status(500).json({
        message: err.message,
      });
    }
  };
};

export default auth;
