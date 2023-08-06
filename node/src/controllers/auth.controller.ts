import { Response, Request, NextFunction } from "express";
import authService from "../services/auth.service";
import { IUserToken } from "../dtos/data.dto";


class CAuthController {

  //================================================================================================================================================================================
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const token = await authService.login(req.body);
      if (token) {
        res.set("Authorization", `Bearer ${token}`);
        res.status(200).json({ message: 'Пользователь авторизован.' });
      } else
        res.status(403).json({ message: "Доступ запрещён." });

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async changePassw(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && req.user) {
        const success = await authService.changePassw(req.user as IUserToken, req.body);
        if (success)
          res.status(200).json({ message: 'Пароль изменён.' });
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        if (!req.body)
          console.log('CAuthController.changePassw: Пустой request.body');
        else
          console.log('CAuthController.changePassw: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async getProfile(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && req.user) {
        const user = await authService.getProfile(req.user as IUserToken);
        if (user)
          res.json(user);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
        } else {
        if (!req.body)
          console.log('CAuthController.getProfile: Пустой request.body');
        else
          console.log('CAuthController.getProfile: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }
}

export default new CAuthController();