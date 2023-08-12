import { Request, Response, NextFunction } from "express";
import userService from "../services/user.service";


class CUserController {

  //================================================================================================================================================================================
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const user = await userService.getUser(req.body);
        if (user)
          res.json(user);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CUserController.getUser: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }
    
    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async registerUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const success = await userService.registerUser(req.body);
        if (success)
          return res.status(201).json({ message: "Пользователь зарегистрирован." });
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CUserController.registerUser: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async updateUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const user = await userService.updateUser(req.body);
        if (user)
          res.json(user);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CUserController.updateUser: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async deleteUser(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const success = await userService.deleteUser(req.body);
        if (success)
          return res.status(200).json({ message: 'Пользователь удалён.' })
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CUserController.deleteUser: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const users = await userService.getList(req.body);
        if (users)
          res.json(users);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CUserController.getList: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }
}

export default new CUserController();