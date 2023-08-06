import { Router } from "express";
import orderController from "../../controllers/order.controller";
import { UserMiddleware} from "../../middlewares/user.middleware";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }), UserMiddleware);

router.get('/exec', orderController.getOrder);
router.post('/exec', orderController.registerOrder);
router.delete('/exec', orderController.deleteOrder);
router.post('/getList', orderController.getList);
router.post('/changeStatus', orderController.changeStatus);

export default router;