import { Router } from "express";
import adminRouter from "./admin";
import userRouter from "./user";
import publicRouter from "./public";

const router = Router();

router.use('/admin', adminRouter);
router.use('/user', userRouter);
router.use('/public', publicRouter);

export default router;