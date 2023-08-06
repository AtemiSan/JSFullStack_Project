import { Response, Request, NextFunction } from "express";
import orderService from "../services/order.service";
import { IUserToken } from "../dtos/data.dto";

class COrderController {

  //================================================================================================================================================================================
  async getOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && req.user) {
        const order = await orderService.getOrder(req.user as IUserToken, req.body);
        if (order)
          res.json(order);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        if (!req.body)
          console.log('COrderController.getOrder: Пустой request.body');
        else
          console.log('COrderController.getOrder: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }
    
    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async registerOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && req.user) {
        const success = await orderService.registerOrder(req.user as IUserToken, req.body);
        if (success)
          return res.status(201).json({ message: "Заявка зарегистрирована." });
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        if (!req.body)
          console.log('COrderController.registerOrder: Пустой request.body');
        else
          console.log('COrderController.registerOrder: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async deleteOrder(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && req.user) {
        const success = await orderService.deleteOrder(req.user as IUserToken, req.body);
        if (success)
          return res.status(200).json({ message: 'Заявка удалена.' })
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        if (!req.body)
          console.log('COrderController.deleteOrder: Пустой request.body');
        else
          console.log('COrderController.deleteOrder: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && req.user) {
        const orders = await orderService.getList(req.user as IUserToken, req.body);
        res.json(orders);
      } else {
        if (!req.body)
          console.log('COrderController.getList: Пустой request.body');
        else
          console.log('COrderController.getList: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async changeStatus(req: Request, res: Response, next: NextFunction) {
    try {
      if (req.body && req.user) {
        const order = await orderService.changeStatus(req.user as IUserToken, req.body);
        if (order)
          res.json(order);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        if (!req.body)
          console.log('COrderController.changeStatus: Пустой request.body');
        else
          console.log('COrderController.changeStatus: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }
    
    } catch(e) {
      next(e);
    }
  }

}

export default new COrderController();