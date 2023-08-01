import { Router } from "express";
import { UserMiddleware} from "../../middlewares/user.middleware";
import authController from '../../controllers/auth.controller';
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }), UserMiddleware);

//router.post('/changePassw', authController.changePassw);
//router.post('/getProfile', authController.getProfile);

export default router;