import { Request, Response, NextFunction } from "express";
import dataService from "../services/data.service";

class CDataController {

  //================================================================================================================================================================================
  async getDolgList(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await dataService.getDolgList();
      if (list)
        res.json(list);
      else
        res.status(400).json({ message: "В выполнении операции отказано." });

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async getDepartList(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await dataService.getDepartList();
      if (list)
        res.json(list);
      else
        res.status(400).json({ message: "В выполнении операции отказано." });

    } catch(e) {
      next(e);
    }
  }

  //================================================================================================================================================================================
  async getRoleList(req: Request, res: Response, next: NextFunction) {
    try {
      const list = await dataService.getRoleList();
      if (list)
        res.json(list);
      else
        res.status(400).json({ message: "В выполнении операции отказано." });

    } catch(e) {
      next(e);
    }
  }
}

export default new CDataController();