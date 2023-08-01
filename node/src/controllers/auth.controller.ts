import { Response, Request, NextFunction } from "express";
import authService from "../services/auth.service";

class AuthController {
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            console.log('reg controller body: ', req.body)
            await authService.register(req.body);
            return res.status(201).json({ message: "Пользователь зарегистрирован" })
        } catch(e) {
            next(e);
        }
    }

    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const token = await authService.login(req.body);
            console.log('login')
            res.set("Authorization", `Bearer ${token}`);
            res.send("Success!");
        } catch(e) {
            next(e);
        }
    }
}

export default new AuthController();