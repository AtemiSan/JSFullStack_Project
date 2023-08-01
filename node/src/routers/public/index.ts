import { Router } from "express";
import authRouter from "./auth.router";
import dataRouter from "./data.router"

const router = Router();

router.use('/auth', authRouter);
router.use('/data', dataRouter);

export default router;