import { Router } from "express";
import { Request, Response, NextFunction } from "express";

const router = Router();

router.use("/test", test);

async function test(req: Request, res: Response, next: NextFunction) {
  console.log(req.body);
  res.json(req.body);
}

export default router;