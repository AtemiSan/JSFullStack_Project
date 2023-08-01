import { Request, Response, NextFunction } from "express";
import User, { UserRoles } from "../models/user.model";

interface IUser {
    userId: number;
}

export const AdminMiddleware = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = req.user as IUser;
    const userFromDB = await User.findAll({
        where: {
            id: user.userId
        }
    });

    if (userFromDB[0].role == UserRoles.ADMIN) {
        next();
    } else {
        res.status(400).json({ message: "Вы не обладаете достаточными правами!" });
    }
}