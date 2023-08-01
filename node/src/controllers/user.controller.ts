import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";

class UserController {
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        const users = await userService.getAllUsers();
        res.json(users);
    }
}

export default new UserController();