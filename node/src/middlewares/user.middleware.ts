import { Request, Response, NextFunction } from "express";
import { IUserToken } from "../dtos/data.dto";


export const UserMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUserToken;
  if (user && user.role) {
    next();
  } else {
    res.status(400).json({ message: "Вы не обладаете достаточными правами!" });
  }
}