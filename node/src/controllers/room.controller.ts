import { Response, Request, NextFunction } from "express";
import roomService from "../services/room.service";
import { IUserToken } from "../dtos/data.dto";


class CRoomController {

  //================================================================================================================================================================================
  async getRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const room = await roomService.getRoom(req.body);
        if (room)
          res.json(room);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CRoomController.getRoom: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }
    
    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async registerRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const success = await roomService.registerRoom(req.body);
        if (success)
          return res.status(201).json({ message: "Переговорная зарегистрирована." });
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CRoomController.registerRoom: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async updateRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const room = await roomService.updateRoom(req.body);
        if (room)
          res.json(room);
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CRoomController.updateRoom: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async deleteRoom(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length) {
        const success = await roomService.deleteRoom(req.body);
        if (success)
          return res.status(200).json({ message: 'Заявка удалена.' })
        else
          res.status(400).json({ message: "В выполнении операции отказано." });
      } else {
        console.log('CRoomController.deleteRoom: Пустой request.body');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async getList(req: Request, res: Response, next: NextFunction) {
    try {
      if (Object.keys(req.body).length && req.user && Object.keys(req.user).length) {
        const rooms = await roomService.getList(req.user as IUserToken, req.body);
        res.json(rooms);
      } else {
        if (!Object.keys(req.body).length)
          console.log('CRoomController.getList: Пустой request.body');
        else
          console.log('CRoomController.getList: Пустой request.user');
        res.status(400).json({ message: "В выполнении операции отказано." });
      }

    } catch(e) {
      next(e);
    }
  }
}

export default new CRoomController();