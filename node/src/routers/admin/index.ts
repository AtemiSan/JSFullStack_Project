import { Router } from "express";
import userRouter from "./user.router";
import roomRouter from "./room.router";

const router = Router();

router.use('/user', userRouter);
router.use('/room', roomRouter);

export default router;