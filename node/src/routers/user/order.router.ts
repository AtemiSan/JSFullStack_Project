import { Router } from "express";
import orderController from "../../controllers/order.controller";
import { UserMiddleware} from "../../middlewares/user.middleware";
import { AuthorOrAdminMiddleware } from "../../middlewares/author.or.admin.middleware";
import passport from "passport";

const router = Router();

router.use(passport.authenticate("jwt", { session: false }), UserMiddleware);

router.post('/new', postController.new);

router.use(passport.authenticate("jwt", { session: false }), AuthorOrAdminMiddleware);

router.delete('/delete', postController.delete);
router.post('/edit', postController.edit);

export default router;