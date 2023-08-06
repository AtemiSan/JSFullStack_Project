import { Router } from "express";
import roomController from "../../controllers/room.controller";
import { UserMiddleware} from "../../middlewares/user.middleware";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }), UserMiddleware);

router.post('/getList', roomController.getList);

export default router;