import { Router } from "express";
import userController from "../../controllers/user.controller";
import { AdminMiddleware} from "../../middlewares/admin.middleware";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }), AdminMiddleware);

router.get('/exec', userController.getUser);
router.post('/exec', userController.registerUser);
router.put('/exec', userController.updateUser);
router.delete('/exec', userController.deleteUser);
router.post('/getList', userController.getList);

export default router;