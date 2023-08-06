import { Router } from "express";
import authRouter from "./auth.router";
import orderRouter from "./order.router";
import roomRouter from "./room.router";

const router = Router();

router.use('/auth', authRouter);
router.use('/order', orderRouter);
router.use('/room', roomRouter);

export default router;