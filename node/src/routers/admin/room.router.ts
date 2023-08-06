import { Router } from "express";
import roomController from "../../controllers/room.controller";
import { AdminMiddleware} from "../../middlewares/admin.middleware";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }), AdminMiddleware);

router.get('/exec', roomController.getRoom);
router.post('/exec', roomController.registerRoom);
router.put('/exec', roomController.updateRoom);
router.delete('/exec', roomController.deleteRoom);

export default router;