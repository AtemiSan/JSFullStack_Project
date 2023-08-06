import { Request, Response, NextFunction } from "express";
import { UserRoles } from "../models/user.model";
import { IUserToken } from "../dtos/data.dto";


export const AdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.user as IUserToken;
  if (user && user.role.idRole == UserRoles.ADMIN) {
    next();
  } else {
    res.status(400).json({ message: "Вы не обладаете достаточными правами." });
  }
}